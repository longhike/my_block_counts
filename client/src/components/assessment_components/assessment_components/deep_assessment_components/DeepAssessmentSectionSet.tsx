import { MouseEvent, FormEvent, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import FadeIn from "react-fade-in";
import {
  Button,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import Loading from "../../../../utils/Loading";
import { deepAssessmentQuestionsRenderer } from "../../../../utils/_functions";
import { Question } from "../../../../utils/typings/_classes";
import { TDeepAssessmentSectionSetProps } from "../../../../utils/typings/_types";
import { ICurrentAssessment, IState } from "../../../../utils/typings/_interfaces";

const DeepAssessmentSectionSet = ({
  set,
  table,
}: TDeepAssessmentSectionSetProps) => {
  const currentAssessment: ICurrentAssessment = useSelector(
    (state: IState) => state.currentAssessment
  );
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [stringVal, setStringVal] = useState<string>("");
  const [counterVal, setCounterVal] = useState<number>(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false);
  const [nextButtonText, setNextButtonText] = useState<string>("next");
  const [backButtonDisabled, setBackButtonDisabled] = useState<boolean>(true);
  const [backButtonText, setBackButtonText] = useState<string>("back");
  const [inProgress, setInProgress] = useState<boolean>(true);

  const parseAndRenderByAnswerType = (q: Question) => {
    if (q["answerType"] === "counter") {
      return deepAssessmentQuestionsRenderer(
        q.name,
        q.question,
        q.answerType,
        q.possibleAnswers,
        counterVal,
        setCounterVal
      );
    } else {
      return deepAssessmentQuestionsRenderer(
        q.name,
        q.question,
        q.answerType,
        q.possibleAnswers,
        stringVal,
        setStringVal
      );
    }
  };

  const getDeepAssessmentRowAndSetIfNotExists = async (
    table: string,
    assessment_id: string
  ): Promise<AxiosResponse> => {
    const obj = { table, assessment_id };
    const response: AxiosResponse = await axios.post(
      "/assessments/deep-q/find-or-create-deep-q-row",
      obj
    );
    return response;
  };

  const getDeepAssessmentAnswerIfExists = async (
    assessment_id: string,
    table: string,
    col: string
  ): Promise<AxiosResponse> => {
    const paramObj = {
      assessment_id,
      table,
      col,
    };
    const response: AxiosResponse = await axios.get(
      "/assessments/deep-q/get-deep-q-entry",
      {
        params: paramObj,
      }
    );
    return response;
  };

  const setOrUpdateResponse = async (
    col: string,
    value: string,
    assessment_id: string,
    table: string
  ): Promise<AxiosResponse> => {
    const obj = {
      col: col,
      data: value,
      assessment_id: assessment_id,
      table: table,
    };
    const response = await axios.post(
      "/assessments/deep-q/update-deep-q-entry",
      obj
    );
    return response;
  };

  const setStateFromResponse = (response: string | null): void => {
    if (response !== null) {
      if (response.split("").some((el) => isNaN(parseInt(el)))) {
        setStringVal((cur) => response);
      } else {
        setCounterVal((cur) => parseInt(response));
      }
    } else {
      if (set[currentIdx]["possibleAnswers"]) {
        setStringVal((cur) => set[currentIdx].possibleAnswers![0]);
      } else {
        setStringVal((cur) => "");
        setCounterVal((cur) => cur - cur);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      getDeepAssessmentAnswerIfExists(
        currentAssessment._id!,
        table,
        set[currentIdx].name
      )
        .then((response: AxiosResponse) => {
          const answer = response.data;
          if (answer) setStateFromResponse(answer[set[currentIdx].name]);
        })
        .catch((err: AxiosError) => console.log(err.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, loading]);

  useEffect(() => {
    if (currentIdx >= set.length) {
      setInProgress(false);
    } else {
      setInProgress(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  useEffect(() => {
    getDeepAssessmentRowAndSetIfNotExists(table, currentAssessment._id!)
      .then((res) => {
        setLoading((cur) => !cur);
      })
      .catch((err) => {
        console.error("whoops");
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form
          className={"deep-assessment-form"}
          onSubmit={(e: FormEvent) => e.preventDefault()}
        >
          <Container className={"question-container"}>
            <FadeIn>
              {inProgress ? (
                <>
                  {/* QUESTION TEXT ROW */}
                  <h3>{currentAssessment.st_address}</h3>
                  <Row>
                    <Col className={"question-text"}>
                      <Form.Group>
                        <h5>{set[currentIdx].question}</h5>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* CURRENT ANSWER AND SELECTOR ROW */}
                  <Row>
                    <Col md={4} className={"current-answer-text"}>
                      <div>
                        <h5>current answer: </h5>
                        {set[currentIdx].answerType === "counter" ? (
                          <h4>{counterVal}</h4>
                        ) : (
                          <p>{stringVal}</p>
                        )}
                      </div>
                    </Col>
                    <Col className={"d-flex justify-content-center"}>
                      <Form.Group className={"question-holder"}>
                        {set[currentIdx] !== undefined
                          ? parseAndRenderByAnswerType(set[currentIdx])
                          : ""}
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              ) : (
                <div>
                  <h4>All done with the this section!</h4>
                </div>
              )}

              {/* PROGRESS BAR AND FORWARD/BACK */}
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>{`Question ${currentIdx + 1} of ${
                      set.length
                    }`}</Form.Label>
                    <ProgressBar
                      variant={"success"}
                      now={Math.floor((currentIdx / (set.length - 1)) * 100)}
                    />
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Row className={"deep-assessment-nav-button-row"}>
                    <Col>
                      <Button
                        className={"deep-assessment-button"}
                        variant={"warning"}
                        disabled={backButtonDisabled}
                        onClick={(e: MouseEvent<HTMLElement>) => {
                          e.preventDefault();
                          setBackButtonDisabled(true);
                          setBackButtonText((cur) => "...");
                          let dataVal;
                          if (set[currentIdx].answerType === "counter") {
                            dataVal = counterVal.toString();
                          } else {
                            dataVal = stringVal;
                          }
                          setOrUpdateResponse(
                            set[currentIdx].name,
                            dataVal,
                            currentAssessment._id!,
                            table
                          ).then((response) => {
                            if (currentIdx > 0) {
                              if (currentIdx > 1) {
                                setBackButtonDisabled(false);
                              }
                              setCurrentIdx((cur) => cur - 1);
                              if (nextButtonDisabled) {
                                setNextButtonDisabled(false);
                              }
                              setStringVal((cur) => "");
                              setCounterVal((cur) => 0);
                              setBackButtonText((cur) => "back");
                            }
                          });
                        }}
                      >
                        {backButtonText}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className={"deep-assessment-button"}
                        variant={"warning"}
                        disabled={nextButtonDisabled}
                        onClick={(e: MouseEvent<HTMLElement>) => {
                          e.preventDefault();
                          if (!inProgress) {
                            setInProgress((cur) => !cur);
                          }
                          setNextButtonDisabled(true);
                          setNextButtonText((cur) => "...");
                          let dataVal;
                          if (set[currentIdx].answerType === "counter") {
                            dataVal = counterVal.toString();
                          } else {
                            dataVal = stringVal;
                          }
                          setOrUpdateResponse(
                            set[currentIdx].name,
                            dataVal,
                            currentAssessment._id!,
                            table
                          ).then((response) => {
                            if (currentIdx < set.length - 1) {
                              if (currentIdx <= set.length - 2) {
                                setNextButtonDisabled(false);
                              }
                              setCurrentIdx((cur) => cur + 1);
                              if (backButtonDisabled) {
                                setBackButtonDisabled(false);
                              }
                              setStringVal((cur) => "");
                              setCounterVal((cur) => 0);
                              setNextButtonText((cur) => "next");
                            } else {
                              setNextButtonDisabled(true);
                              setNextButtonText((cur) => "next");
                              setInProgress((cur) => !cur);
                            }
                            setStringVal((cur) => "");
                            setCounterVal((cur) => 0);
                          });
                        }}
                      >
                        {nextButtonText}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </FadeIn>
          </Container>
        </Form>
      )}
    </>
  );
};

export default DeepAssessmentSectionSet;
