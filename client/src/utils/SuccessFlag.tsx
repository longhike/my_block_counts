import { Alert } from "react-bootstrap";
import { TSuccessFlagProps } from "../utils/typings/_types"

export const SuccessFlag = ({ message }: TSuccessFlagProps) => {
    return (
        <Alert variant="success">
            <p>{message}</p>
        </Alert>
   )
}