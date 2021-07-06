import { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentAssessment } from "../../../redux/actions";
import { TInitialAssessmentSectionProps } from "../../../utils/typings/_types";
import FadeIn from "react-fade-in";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import { ErrorFlag } from "../../../utils/ErrorFlag";
import { PlacesInput } from "../../../utils/PlacesInput";
import { ICurrentAssessment, IState } from "../../../utils/typings/_interfaces";
import { TInitialAssessmentSectionResponse } from "../../../utils/typings/_types";
import { useHistory } from "react-router";

const InitialAssessmentSection = ({
  setSessionInitiated,
}: TInitialAssessmentSectionProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const currentAssessment: ICurrentAssessment = useSelector(
    (state: IState) => state.currentAssessment
  );
  const userID = useSelector((state: IState) => state.user._id);
  const [responses, setResponses] = useState<TInitialAssessmentSectionResponse>(
    {
      _id: currentAssessment._id || "",
      user_id: userID || "",
      st_address: "",
      weather: "nice",
      loc_intersection: "peepee and poopoo",
    }
  );

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

  const getInitialDataAndHandleState = (): void => {
    axios
      .get("/assessments/get-user-assessment", {
        params: {
          _id: currentAssessment._id,
        },
      })
      .then((response: AxiosResponse) => {
        setMessage("Let's confirm the initial info you submitted.");
        const res = response.data;
        setResponses({
          ...responses,
          st_address: res.st_address,
          weather: res.weather,
          loc_intersection: res.loc_intersection,
        });
      });
  };

  const createOrUpdateSessionAndInitiate = async (): Promise<AxiosResponse> => {
    if (!currentAssessment._id) {
      const response: AxiosResponse = await axios.post(
        "/assessments/new-assessment",
        responses
      );
      return response;
    } else {
      const response: AxiosResponse = await axios.put(
        "/assessments/update-user-assessment",
        responses
      );
      return response;
    }
  };

  useEffect(() => {
    if (responses.st_address.length <= 0) {
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
    if (currentAssessment._id !== null) {
      getInitialDataAndHandleState();
    } else {
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
              {currentAssessment._id ? (
                ""
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
                  <Form.Label>
                    Enter the address closest to your vantage point
                  </Form.Label>
                  {/* <PlacesInput
                    
                  /> */}
                  <Form.Control
                    name={"st_address"}
                    value={responses.st_address}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setResponses({
                        ...responses,
                        [e.currentTarget.name]: e.currentTarget.value,
                      });
                    }}
                  />
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
            {error ? (
              <ErrorFlag message="please enter a street address in order to proceed" />
            ) : (
              ""
            )}
            <Form.Group className={"dive-in-button-holder"}>
              <Button
                disabled={buttonDisabled}
                variant={"info"}
                onClick={(e: MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  setError((cur) => false);
                  if (responses.st_address.length <= 0) {
                    setError((cur) => true);
                  } else {
                    createOrUpdateSessionAndInitiate().then(
                      (response: AxiosResponse) => {
                        dispatch(setCurrentAssessment(response.data));
                        setSessionInitiated((cur) => true);
                      }
                    );
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
