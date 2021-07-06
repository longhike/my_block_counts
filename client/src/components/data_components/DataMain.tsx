import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FadeIn from "react-fade-in";
import { IState } from "../../utils/typings/_interfaces";
import { Card, Col, Jumbotron, Row } from "react-bootstrap";
import * as dotenv from "dotenv";
import { unsetCurrentAssessment } from "../../redux/actions";

dotenv.config();

const DataMain = () => {
  const dispatch = useDispatch();
  
  const username: string | null = useSelector(
    (state: IState) => state.user.username
  );

  const curAssessId: string | null = useSelector(
    (state: IState) => state.currentAssessment._id
  );

  useEffect(() => {
    if (curAssessId) dispatch(unsetCurrentAssessment());
  }, []);

  const history = useHistory();
  return (
    <FadeIn>
      <Jumbotron>
        <Row>
          <Col md={5}>
            <div className={"data-welcome"}>
              <h2>Welcome to the My Block Counts Data Hub</h2>
              <h4>
                We have a bunch of exciting data visualization tools in the
                works. For now, please select the tool that best fits your
                needs:
              </h4>
            </div>
          </Col>
          <Col md={7}>
            <div className={"data-tools-list"}>
              <Card
                className={"dashboard-button disabled"}
                // onClick={(e: MouseEvent<HTMLElement>) => {
                //   e.preventDefault();
                //   history.push("/data/by-address");
                // }}
              >
                view by address (coming soon)
              </Card>
              <Card
                className={
                  username ? "dashboard-button" : "dashboard-button disabled"
                }
                onClick={(e: MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  if (username) {
                    history.push("/data/my-data");
                  }
                }}
              >
                {username ? (
                  "view my assessments"
                ) : (
                  <Card.Text>
                    <span
                      className="span-link"
                      onClick={(e: MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        history.push("/login");
                      }}
                    >
                      log in
                    </span>{" "}
                    to view your assessments
                  </Card.Text>
                )}
              </Card>
            </div>
          </Col>
        </Row>
      </Jumbotron>
    </FadeIn>
  );
};

export default DataMain;
