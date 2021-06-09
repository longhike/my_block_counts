import { Alert } from "react-bootstrap";
import { TErrorFlagProps } from "./typings/_types";

export const ErrorFlag = ({ message }: TErrorFlagProps) => {
  return (
    <Alert variant="danger">
      <p>{message}</p>
    </Alert>
  );
};
