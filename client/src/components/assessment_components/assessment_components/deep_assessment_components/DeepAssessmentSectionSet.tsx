import { MouseEvent, FormEvent, useEffect, useState } from "react";
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
import {
  TDeepAssessmentSectionSetProps,
  TDeepAssessmentQueryShape,
} from "../../../../utils/typings/_types";
import {
  IAssessmentIdAddress,
  IState,
} from "../../../../utils/typings/_interfaces";
import {
  findOrCreateDeepQRow,
  getDeepAssessmentAnswerIfExists,
  updateDeepAssessmentAnswer,
} from "../../../../api/DeepAssessmentRoutes";

const DeepAssessmentSectionSet = ({
  set,
  table,
}: TDeepAssessmentSectionSetProps) => {
  const currentAssessment: IAssessmentIdAddress = useSelector(
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

  const setDeepAssessmentEnvironment = async (): Promise<void> => {
    try {
      await findOrCreateDeepQRow({
        table,
        assessment_id: currentAssessment._id!,
      });
      setLoading((cur) => !cur);
    } catch (error) {
      console.error("whoops");
      setLoading((cur) => !cur);
    }
  };

  const handleResponseAndIteration = async (backOrNext: number) => {
    try {
      if (!inProgress) setInProgress((cur) => !cur);
      if (backOrNext === 1) {
        setNextButtonDisabled(true);
        setNextButtonText((cur) => "...");
      } else {
        setBackButtonDisabled(true);
        setBackButtonText((cur) => "...");
      }
      const dataVal: string =
        set[currentIdx].answerType === "counter"
          ? counterVal.toString()
          : stringVal;
      const query: TDeepAssessmentQueryShape = {
        assessment_id: currentAssessment._id!,
        table,
        col: set[currentIdx].name,
        value: dataVal,
      };
      await updateDeepAssessmentAnswer(query);
      if (backOrNext === 1) {
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
      } else {
        if (currentIdx > 0) {
          if (currentIdx > 1) {
            setBackButtonDisabled(false);
          }
          setCurrentIdx((cur) => cur - 1);
          if (nextButtonDisabled) {
            setNextButtonDisabled(false);
          }

          setBackButtonText((cur) => "back");
        }
      }
      setStringVal((cur) => "");
      setCounterVal((cur) => 0);
    } catch (error) {
      console.log(error)
      setNextButtonDisabled(true);
      setBackButtonDisabled(true);
    }
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

  const setAnswer = async () => {
    try {
      const query: TDeepAssessmentQueryShape = {
        assessment_id: currentAssessment._id!,
        table,
        col: set[currentIdx].name,
      };
      const answer = await getDeepAssessmentAnswerIfExists(query);
      if (answer) setStateFromResponse(answer[set[currentIdx].name]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      setAnswer();
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
    setDeepAssessmentEnvironment();
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
                        onClick={async (e: MouseEvent<HTMLElement>) => {
                          e.preventDefault();
                          await handleResponseAndIteration(0)
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
                        onClick={async (e: MouseEvent<HTMLElement>) => {
                          e.preventDefault();
                          await handleResponseAndIteration(1)
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
