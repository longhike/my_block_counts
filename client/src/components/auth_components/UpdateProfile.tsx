import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { Button, Form, Jumbotron } from "react-bootstrap";
import FadeIn from "react-fade-in";
import { setUser } from "../../redux/actions";
import { ErrorFlag } from "../../utils/ErrorFlag";
import { SuccessFlag } from "../../utils/SuccessFlag";
import { IState, IUser } from "../../utils/typings/_interfaces";
import { TPasswordUpdate, TUpdatedUser } from "../../utils/typings/_types";

const UpdateProfile = ({ getUserAndHandleState }: any) => {
  const user: IUser = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const _id = user._id;
  const [cols, setCols] = useState<string[]>([]);
  const [username, setUsername] = useState<string>(user.username!);
  const [email, setEmail] = useState<string>(user.email!);
  const [passwordUpdate, setPasswordUpdate] = useState<TPasswordUpdate>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateInputs = (kind: string, value: string) => {
    const checkEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkUsername = /^[a-zA-Z0-9]*$/;
    switch (kind) {
      case "username":
        return (
          checkUsername.test(value) &&
          !(value.length < 4) &&
          !(value.length > 20)
        );
      case "email":
        return checkEmail.test(value);
      case "password":
        return !(value.length < 8) && !(value.length > 50);
      default:
        return false;
    }
  };

  const showError = (message: string): void => {
    setErrorMessage(message);
    setError(true);
    if (buttonLoading) setButtonLoading((cur) => false);
  };

  const destroyError = (): void => {
    setErrorMessage("");
    setError(false);
  };

  const getUserInfoAndSetState = async (): Promise<any> => {
    try {
      const { data }: AxiosResponse = await axios.get("/auth/user");
      dispatch(setUser(data))
      return;
    } catch (error) {}
  };

  const resetFields = () => {
    setPasswordUpdate({
      ...passwordUpdate,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setCols((cur) => []);
    getUserInfoAndSetState();
  };

  const validateInputsAndUpdateUser = (cols: string[], _id: string) => {
    setButtonLoading((cur) => true);
    const updatedUser: TUpdatedUser = {
      _id,
    };
    if (cols.includes("username")) {
      if (!validateInputs("username", username)) {
        showError(
          "Your username must be at least 4 and no more than 20 characters long, and can only contain letters and numbers."
        );
        setButtonLoading((cur) => false);
        return;
      }
      updatedUser.username = username;
    }
    if (cols.includes("email")) {
      if (!validateInputs("email", email)) {
        showError("Please enter a properly formatted email.");
        setButtonLoading((cur) => false);
        return;
      }
      updatedUser.email = email;
    }
    if (cols.includes("password")) {
      if (!validateInputs("password", passwordUpdate.newPassword)) {
        showError(
          "Your password must be at least 8 and no more than 50 characters long."
        );
        setButtonLoading((cur) => false);
        return;
      }
      if (passwordUpdate.newPassword !== passwordUpdate.confirmNewPassword) {
        showError(
          "Your new password must match the confirm new password input."
        );
        setButtonLoading((cur) => false);
        return;
      }
      updatedUser.password = passwordUpdate;
    }
    axios
      .put("/auth/update-user", { cols, user: updatedUser })
      .then(({ data }) => {
        if (data === "success") getUserAndHandleState();
        setSuccessMessage("success!");
        setSuccess((cur) => true);
        setButtonLoading((cur) => false);
        resetFields();
        setTimeout(() => {
          setSuccess((cur) => false);
          setSuccessMessage("");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        switch (err.response.status) {
          case 400:
            setErrorMessage("your original password is incorrect");
            break;
          default:
            setErrorMessage("Oops - something went wrong");
            break;
        }
        setError(true);
        setButtonLoading((cur) => false);
      });
  };
  return (
    <FadeIn>
      <Jumbotron>
        <Form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            destroyError();
            validateInputsAndUpdateUser(cols, _id!);
          }}
        >
          <Form.Group>
            <h4>Update your user information</h4>
          </Form.Group>
          <Form.Group>
            <Form.Label>update username</Form.Label>
            <Form.Control
              as="input"
              placeholder="username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (!cols.includes("username")) setCols([...cols, "username"]);
                setUsername(e.currentTarget.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>update email</Form.Label>
            <Form.Control
              as="input"
              placeholder="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (!cols.includes("email")) setCols([...cols, "email"]);
                setEmail(e.currentTarget.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>update password</Form.Label>
            <Form.Control
              as="input"
              type="password"
              placeholder="current password"
              value={passwordUpdate.currentPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (!cols.includes("password")) setCols([...cols, "password"]);
                setPasswordUpdate({
                  ...passwordUpdate,
                  currentPassword: e.currentTarget.value,
                });
              }}
            />
            <Form.Control
              as="input"
              type="password"
              placeholder="new password"
              value={passwordUpdate.newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordUpdate({
                  ...passwordUpdate,
                  newPassword: e.currentTarget.value,
                })
              }
            />
            <Form.Control
              as="input"
              type="password"
              placeholder="confirm new password"
              value={passwordUpdate.confirmNewPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordUpdate({
                  ...passwordUpdate,
                  confirmNewPassword: e.currentTarget.value,
                })
              }
            />
          </Form.Group>
          {error ? <ErrorFlag message={errorMessage} /> : ""}
          {success ? <SuccessFlag message={successMessage} /> : ""}
          <Form.Group>
            <Button
              type="submit"
              disabled={buttonLoading || cols.length <= 0 ? true : false}
            >
              Update
            </Button>
          </Form.Group>
        </Form>
      </Jumbotron>
    </FadeIn>
  );
};

export default UpdateProfile;
