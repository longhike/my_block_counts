import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Button, Col, Form, Jumbotron, Row } from "react-bootstrap";
import FadeIn from "react-fade-in";
import { ErrorFlag } from "../../utils/ErrorFlag";
import Loading from "../../utils/Loading";
import { TLoginObj } from "../../utils/typings/_types";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [usernameTry, setUsernameTry] = useState<string>("");
  const [passwordTry, setPasswordTry] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const showError = (message: string): void => {
    setErrorMessage((cur) => message);
    setError((cur) => true);
  };

  const destroyError = (): void => {
    setErrorMessage((cur) => "");
    setError((cur) => false);
  };

  const doLogin = (): void => {
    destroyError();
    setLoading((cur) => true);
    if (usernameTry.length <= 0 || passwordTry.length <= 0) {
      showError("Make sure you enter both a username and password!");
      setLoading((cur) => false);
      return;
    }
    const loginObj: TLoginObj = {
      username: usernameTry.toLowerCase().trim(),
      password: passwordTry,
    };
    axios
      .post("/auth/login", loginObj)
      .then(({ data }: AxiosResponse) => {
        dispatch(setUser(data));
        history.push("/");
      })
      .catch((error: AxiosError) => {
        switch (error.response!.status) {
          case 401:
            showError(
              "Sorry, that credential combination wasn't recognized. Please make sure your inputs are correct and try again."
            );
            break;
          default:
            showError("Oy vey, something went wrong... please try again.");
            break;
        }
        setLoading((cur) => false);
      });
  };

  return (
    <>
      <Jumbotron>
        <Form
          className={"auth-form"}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            doLogin();
          }}
        >
          <FadeIn>
            <Row>
              <Col md={5}>
                <div className={"auth-text"}>
                  <h3>
                    <strong>Login</strong>
                  </h3>
                  <br></br>
                  <p>
                    Please log in with your email or username and your password.
                    If you don't have an account yet, please{" "}
                    <span
                      className={"auth-route-link"}
                      onClick={(e: MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        history.push("/signup");
                      }}
                    >
                      sign up
                    </span>
                    .
                  </p>
                  <p>
                    If you have an account but forgot your password, you can{" "}
                    <span
                      className={"auth-route-link"}
                      onClick={(e: MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        history.push("/forgot-password");
                      }}
                    >
                      reset your password
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
                      placeholder="email or username"
                      value={usernameTry}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUsernameTry(e.currentTarget.value)
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
                  {error ? <ErrorFlag message={errorMessage} /> : ""}
                  <Form.Group className="auth-buttons">
                    <Button variant="primary" type="submit">
                      Login
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

export default Login;
