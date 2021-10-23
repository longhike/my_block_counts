import { MouseEvent } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentAssessment } from "../../../redux/actions";
import { useHistory } from "react-router-dom";
import { TUserAssessmentListItemProps } from "../../../utils/typings/_types";
import { Button, Row, Col } from "react-bootstrap";

const UserAssessmentListItem = ({
  assessment_id,
  st_address,
  getUserAssessmentsAndHandleStateIfExist,
}: TUserAssessmentListItemProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className="user-assessment-list-item">
      <Row className={"user-assessment-list-item-row"} xs={2}>
        <Col md={8}>
          <div className={"user-assessment-list-item-address"}>
            <h5>{st_address}</h5>
          </div>
        </Col>
        <Col md={4}>
          <Row>
            <Col>
              <Button
                variant={"info"}
                className={"user-assessment-list-item-button"}
                onClick={(e: MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  dispatch(
                    setCurrentAssessment({ _id: assessment_id, st_address })
                  );
                  history.push(`/assessment/${assessment_id}`);
                }}
              >
                Update
              </Button>
            </Col>
            <Col>
              <Button
                variant={"danger"}
                className={"user-assessment-list-item-button"}
                onClick={async (e: MouseEvent<HTMLElement>): Promise<void> => {
                  e.preventDefault();
                  try {
                    await axios.delete("/assessments/delete-user-assessment", {
                      params: { id: assessment_id },
                    });
                    getUserAssessmentsAndHandleStateIfExist();
                  } catch (error: any) {
                    console.log(error.message);
                  }
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserAssessmentListItem;
