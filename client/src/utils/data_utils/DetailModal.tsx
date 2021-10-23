import { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IState } from "../typings/_interfaces";
import AssessmentDetail from "./AssessmentDetail";

type TDetailModalProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const DetailModal = ({ show, setShow }: TDetailModalProps) => {
  const _id: string = useSelector(
    (state: IState) => state.currentAssessment._id!
  );
  const hide = () => {
    setShow(false);
  };
  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton />
      <Modal.Body>
        <AssessmentDetail _id={_id} />
      </Modal.Body>
    </Modal>
  );
};

export default DetailModal;
