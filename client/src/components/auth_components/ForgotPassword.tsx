import { Dispatch, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Form, Jumbotron } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ErrorFlag } from "../../utils/ErrorFlag";
import { TPasswordResetParams } from "../../utils/typings/_types";

const sendNewEmail = async (
  email: string,
  setHeaderState: Dispatch<React.SetStateAction<string>>
) => {
  setHeaderState(". . .");
  try {
    const success = await axios.post("/auth/forgot-password", { email });
    if (success)
      setHeaderState(
        "OK, check your email!\n\nIf you don't see an email from us in your inbox, check your spam folder. If you don't receive any email at all, make sure you have an account, or reach out to us by going to the About section and sending us a message."
      );
  } catch (error) {
    console.log(error);
    setHeaderState("Oh dear. Something went wrong...");
  }
};

const resetPassword = async (session: string, password: string) => {
  try {
    const { data } = await axios.post("/auth/reset-password", {
      session,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const InputEmailAndGetLink = () => {
  const initialMessage =
    "Input the email you used for your account, and we'll send you a link to reset your password if the account exists.";
  const [email, setEmail] = useState<string>("");
  const [header, setHeader] = useState<string>(initialMessage);
  return (
    <Form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        sendNewEmail(email, setHeader);
      }}
    >
      <h4>{header}</h4>
      <Form.Group>
        <Form.Control
          as="input"
          value={email}
          placeholder={"email"}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.currentTarget.value);
          }}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Button type="submit">Get link to update password</Button>
      </Form.Group>
    </Form>
  );
};

const ResetPasswordAndSignIn = (id: string) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [header, setHeader] = useState(
    "Set a new password - you'll be taken to the login page afterwards."
  );
  return (
    <Form
      onSubmit={async (event: FormEvent) => {
        event.preventDefault();
        try {
          if (password !== confirmPassword)
            throw new Error(
              "Your password and confirm password inputs must match"
            );
          else if (password.length > 50 || password.length < 8)
            throw new Error(
              "Your password must be at least 8 and no more than 50 characters long"
            );
          else {
            setHeader(". . .");
            const success = await resetPassword(id, password);
            if (success === "success") history.push("/login");
          }
        } catch (error) {
          setErrorMessage(error.message);
          setError((cur) => true);
        }
      }}
    >
      <h4>{header}</h4>
      <Form.Group>
        <Form.Control
          type="password"
          value={password}
          as="input"
          placeholder="new password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          value={confirmPassword}
          as="input"
          placeholder="new confirm password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.currentTarget.value)
          }
        ></Form.Control>
      </Form.Group>
      {error ? <ErrorFlag message={errorMessage} /> : ""}
      <Form.Group>
        <Button type="submit">Reset password</Button>
      </Form.Group>
    </Form>
  );
};

const ForgotPassword = () => {
  const { id }: TPasswordResetParams = useParams();
  return (
    <Jumbotron>
      {id ? ResetPasswordAndSignIn(id) : InputEmailAndGetLink()}
    </Jumbotron>
  );
};

export default ForgotPassword;
