import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { unsetCurrentAssessment } from "../../redux/actions"
import { IState } from "../typings/_interfaces";
import AssessmentListItem from "./AssessmentListItem";
import DetailModal from "./DetailModal";

type TAssessmentListHolderProps = {
  list: any[];
};

const AssessmentListHolder = ({ list }: TAssessmentListHolderProps) => {
  const dispatch = useDispatch();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const _id = useSelector((state:IState) => state.currentAssessment._id)
  useEffect(() => {
    if (!showDetailModal && _id) dispatch(unsetCurrentAssessment());
    // eslint-disable-next-line
  }, [showDetailModal])
  return (
    <>
      <DetailModal show={showDetailModal} setShow={setShowDetailModal} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>st addr</th>
            <th>city</th>
            <th>state</th>
            <th>zip</th>
          </tr>
        </thead>
        <tbody>
          {list.map((l: any, i: number) => {
            const { _id, st_address, city, state, zip } = l;
            return (
              <AssessmentListItem
                _id={_id}
                st_address={st_address}
                city={city}
                state={state}
                zip={zip}
                key={i}
                setShow={setShowDetailModal}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AssessmentListHolder;
