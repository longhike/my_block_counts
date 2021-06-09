import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import FadeIn from "react-fade-in";
import { ErrorFlag } from "../../utils/ErrorFlag";
import Loading from "../../utils/Loading";
import { TSignupObj } from "../../utils/typings/_types";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [usernameTry, setUsernameTry] = useState<string>("");
  const [emailTry, setEmailTry] = useState<string>("");
  const [passwordTry, setPasswordTry] = useState<string>("");
  const [confirmPasswordTry, setConfirmPasswordTry] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const showError = (message: string): void => {
    setErrorMessage(message);
    setError(true);
  };

  const destroyError = (): void => {
    setErrorMessage("");
    setError(false);
  };

  const validateSignupInputs = (kind: string, value: string) => {
    const checkEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkUsername = /^[a-zA-Z0-9]*$/;
    switch (kind) {
      case "username":
        return checkUsername.test(value) && !(value.length < 4) && !(value.length > 20);
      case "email":
        return checkEmail.test(value);
      case "password": 
        return !(value.length < 8) && !(value.length > 50);
      default:
        return false;
    }
  };

  const doLoginInSignupContext = (loginObj: TSignupObj): void => {
    axios
      .post("/auth/login", loginObj)
      .then((response: AxiosResponse) => {
        const user = response.data;
        if (user.username) {
          dispatch(setUser(user));
        } else {
          showError(
            "Your account was created, but something went wrong in the login. Please try logging in."
          );
          setLoading((cur) => false);
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
        showError(
          "Your account was created, but something went wrong in the login. Please try logging in."
        );
        setLoading((cur) => false);
      });
  };

  const doSignup = (): void => {
    destroyError();
    setLoading((cur) => true);
    if (
      usernameTry.length <= 0 ||
      emailTry.length <= 0 ||
      passwordTry.length <= 0 ||
      confirmPasswordTry.length <= 0
    ) {
      showError("Please make sure you complete all fields!");
      setLoading((cur) => false);
    } else if (passwordTry !== confirmPasswordTry) {
      showError("Please make sure your passwords match!");
      setLoading((cur) => false);
    } else if (!validateSignupInputs("email", emailTry)) {
      showError("Please enter a properly formatted email");
      setLoading((cur) => false);
    } else if (!validateSignupInputs("username", usernameTry)) {
      showError(
        "Your username must be at least 4 and no more than 20 characters long, and can only contain letters and numbers."
      );
      setLoading((cur) => false);
    } else if (!validateSignupInputs("password", passwordTry)) {
      showError(
        "Your password must be at least 8 and no more than 50 characters long."
      );
      setLoading((cur) => false);
    } else {
      const signupObj: TSignupObj = {
        username: usernameTry.toLowerCase().trim(),
        email: emailTry.toLowerCase().trim(),
        password: passwordTry,
      };
      axios
        .post("/auth/signup", signupObj)
        .then((response: AxiosResponse) => {
          if (response.data === "success") {
            doLoginInSignupContext(signupObj);
          } else {
            showError(
              "Oh dear. Something went wrong. Please refresh and try again."
            );
            setLoading((cur) => false);
          }
        })
        .catch((err: AxiosError) => {
          const error = err.response!;
          switch (error.status) {
            case 400:
              showError(
                error.data === "email"
                  ? "That e-mail's already in use. If you already have an account, please sign in."
                  : "That username's already taken. Please choose another, or sign in if you already have an account."
              );
              break;
            default:
              console.log("oy vey,");
              showError(
                "Oh dear. Something went wrong. Please reload the page and try again."
              );
              break;
          }
          setLoading((cur) => false);
        });
    }
  };

  return (
    <>
      <Jumbotron>
        <Form
          className={"auth-form"}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            doSignup();
          }}
        >
          <FadeIn>
            <Row>
              <Col md={5}>
                <div style={{ textAlign: "left" }}>
                  <h3>
                    <strong>Sign Up</strong>
                  </h3>
                  <br></br>
                  <p>
                    Sign up using the form on this page. If you already have an
                    account, please{" "}
                    <span
                      className={"auth-route-link"}
                      onClick={(e: MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        history.push("/login");
                      }}
                    >
                      log in
                    </span>
                    .
                  </p>
                </div>
              </Col>
              {loading ? (
                <Loading />
              ) : (
                <Col md={7} className={"justify-content-center"}>
                  <Form.Group>
                    <Form.Control
                      as="input"
                      placeholder="username"
                      value={usernameTry}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUsernameTry(e.currentTarget.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      as="input"
                      placeholder="email"
                      value={emailTry}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmailTry(e.currentTarget.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      value={passwordTry}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPasswordTry(e.currentTarget.value)
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      placeholder="confirm password"
                      value={confirmPasswordTry}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setConfirmPasswordTry(e.currentTarget.value)
                      }
                    />
                  </Form.Group>
                  {error ? <ErrorFlag message={errorMessage} /> : ""}
                  <Form.Group id="login-or-signup" className="auth-buttons">
                    <Button variant="info" type="submit">
                      Sign Up
                    </Button>
                  </Form.Group>
                </Col>
              )}
            </Row>
          </FadeIn>
        </Form>
      </Jumbotron>
    </>
  );
};

export default Signup;
