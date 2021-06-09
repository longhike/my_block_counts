import { MouseEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unsetCurrentAssessmentID } from "../redux/actions";
import FadeIn from "react-fade-in";
import { Card, Col, Jumbotron, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { IState } from "../utils/typings/_interfaces";

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const username: string = useSelector((state: IState) => state.user.username!);
  useEffect(() => {
    dispatch(unsetCurrentAssessmentID());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FadeIn>
        <Jumbotron>
          <Row>
            <Col md={5} className={"justify-content-center"}>
              <div className={"dashboard-welcome"}>
                <h2>Hi, {username}!</h2>
                <h3>Please select from the menu.</h3>
              </div>
            </Col>
            <Col md={7} className={"justify-content-center"}>
              <div className={"dashboard-options"}>
                <Card
                  className={"dashboard-button"}
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    history.push("/assessment");
                  }}
                >
                  <p>start a new assessment</p>
                </Card>
                <Card
                  className={"dashboard-button"}
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    history.push("/user-assessments");
                  }}
                >
                  <p>update an assessment</p>
                </Card>
                <Card className={"dashboard-button disabled"}>
                  <p>search MBC!</p>
                </Card>
              </div>
            </Col>
          </Row>
        </Jumbotron>
      </FadeIn>
    </>
  );
};

export default Dashboard;
