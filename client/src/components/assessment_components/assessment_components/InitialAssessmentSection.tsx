import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentAssessment,
  unsetCurrentAssessment,
} from "../../../redux/actions";
import { TInitialAssessmentSectionProps } from "../../../utils/typings/_types";
import {
  getCurrentAssessmentIfExists,
  createNewAssessment,
  updateInitialAssessmentInfo,
} from "../../../api/AssessmentRoutes";
import FadeIn from "react-fade-in";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import { ErrorFlag } from "../../../utils/ErrorFlag";
import { PlacesInput } from "../../../utils/PlacesInput";
import {
  IAssessmentIdAddress,
  IState,
} from "../../../utils/typings/_interfaces";
import {
  TInitialAssessmentInfoShape,
  TAssessmentIdParams,
} from "../../../utils/typings/_types";
import { useHistory } from "react-router";

const InitialAssessmentSection = ({
  setSessionInitiated,
}: TInitialAssessmentSectionProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const currentAssessment: IAssessmentIdAddress = useSelector(
    (state: IState) => state.currentAssessment
  );
  const { assessment_id }: TAssessmentIdParams = useParams();
  const userID = useSelector((state: IState) => state.user._id);
  const initialResponseState: TInitialAssessmentInfoShape = {
    _id: assessment_id || "",
    user_id: userID || "",
    st_address: "",
    number: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    coordinates: "",
    weather: "nice",
  };
  const [responses, setResponses] =
    useState<TInitialAssessmentInfoShape>(initialResponseState);

  const weatherIcons = [
    {
      tag: "wi wi-day-sunny-overcast",
      name: "nice",
    },
    {
      tag: "wi wi-hot",
      name: "hot",
    },
    {
      tag: "wi wi-snowflake-cold",
      name: "cold",
    },
    {
      tag: "wi wi-cloudy",
      name: "cloudy",
    },
    {
      tag: "wi wi-rain",
      name: "rainy",
    },
  ];

  const getInitialDataAndHandleState = async () => {
    try {
      const {
        st_address,
        number,
        street,
        neighborhood,
        city,
        state,
        country,
        zip,
        coordinates,
        weather,
      } = await getCurrentAssessmentIfExists(assessment_id);
      dispatch(setCurrentAssessment({ _id: assessment_id, st_address }));
      setMessage("Let's confirm the initial info you submitted.");
      setResponses({
        ...responses,
        st_address,
        number,
        street,
        neighborhood,
        city,
        state,
        country,
        zip,
        coordinates,
        weather,
      });
    } catch (error) {}
  };

  const createOrUpdateSessionAndInitiate = async (): Promise<any> => {
    if (!currentAssessment._id) {
      const response: any = await createNewAssessment(responses);
      return response;
    } else {
      const response: any = await updateInitialAssessmentInfo(responses);
      return response;
    }
  };

  useEffect(() => {
    if (responses.st_address.length <= 0) {
      setErrorMessage(
        "please enter a valid street address in order to proceed"
      );
      setError((cur) => true);
      setButtonDisabled((cur) => true);
    } else {
      if (error) {
        setError((cur) => false);
      }
      if (buttonDisabled) {
        setButtonDisabled((cur) => false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responses.st_address]);

  useEffect(() => {
    if (assessment_id) {
      getInitialDataAndHandleState();
    } else {
      dispatch(unsetCurrentAssessment());
      setResponses({ ...responses, ...initialResponseState });
      setMessage("OK! First, let's get some general info out of the way.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Jumbotron className={"jumbotron-initial-section"}>
        <Form
          className={"initial-section-form"}
          onSubmit={(e: FormEvent) => e.preventDefault()}
        >
          <FadeIn>
            <div className={"initial-section-text-holder"}>
              <h4>{message}</h4>
              {assessment_id ? (
                <p>
                  (or you can{" "}
                  <span
                    className={"navigation-link"}
                    onClick={(e: MouseEvent<HTMLElement>) => {
                      e.preventDefault();
                      dispatch(unsetCurrentAssessment());
                      setResponses({ ...responses, ...initialResponseState });
                      history.push("/assessment");
                    }}
                  >
                    start a new assessment
                  </span>
                  )
                </p>
              ) : (
                <p>
                  (or you can{" "}
                  <span
                    className={"navigation-link"}
                    onClick={(e: MouseEvent<HTMLElement>) => {
                      e.preventDefault();
                      history.push("/user-assessments");
                    }}
                  >
                    update an assessment
                  </span>{" "}
                  you've already started).
                </p>
              )}
            </div>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <PlacesInput
                    responses={responses}
                    setResponses={setResponses}
                  />
                  <h5>
                    {responses.st_address.length > 0
                      ? responses.st_address
                      : "no address selected"}
                  </h5>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    Select the option that best describes the weather
                  </Form.Label>
                  <div className={"weather-items-holder"}>
                    {weatherIcons.map((el) => {
                      return (
                        <div
                          className={
                            el.name === responses.weather
                              ? "weather-item selected"
                              : "weather-item"
                          }
                          key={el.name}
                          data-value={`${el.name}`}
                          onClick={(e: MouseEvent<HTMLElement>) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setResponses({
                              ...responses,
                              weather:
                                e.currentTarget.getAttribute("data-value"),
                            });
                          }}
                        >
                          <i className={el["tag"]} />
                          <p>{el.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            {error ? <ErrorFlag message={errorMessage} /> : ""}
            <Form.Group className={"dive-in-button-holder"}>
              <Button
                disabled={buttonDisabled}
                variant={"info"}
                onClick={async (e: MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  setError((cur) => false);
                  if (responses.st_address.length <= 0) {
                    setErrorMessage(
                      "please enter a valid street address in order to proceed"
                    );
                    setError((cur) => true);
                  } else {
                    try {
                      const data: IAssessmentIdAddress | any =
                        await createOrUpdateSessionAndInitiate();
                      if (!data._id || !data.st_address) {
                        if (data.response.status === 403)
                          throw new Error("not_unique");
                        else throw new Error("create_error");
                      }
                      dispatch(setCurrentAssessment(data));
                      setSessionInitiated((cur) => true);
                    } catch (error: any) {
                      switch (error.message) {
                        case "not_unique":
                          setErrorMessage(
                            "There's already an assessment for this specific address on the block. If you are the one who created it, please update it by going to the update an assessment section. If not, please enter an address as close to the one you've attempted to enter as possible."
                          );
                          break;
                        case "create_error":
                          setErrorMessage(
                            "Sorry, something went wrong - please refresh the page and try again"
                          );
                          break;
                        default:
                          setErrorMessage(
                            "Oh dear, something went wrong - please refresh the page and try again"
                          );
                          break;
                      }
                      setError((cur) => true);
                      setButtonDisabled((cur) => true);
                    }
                  }
                }}
              >
                Dive in
              </Button>
            </Form.Group>
          </FadeIn>
        </Form>
      </Jumbotron>
    </>
  );
};
export default InitialAssessmentSection;
