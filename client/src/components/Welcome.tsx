import { MouseEvent } from "react";
import { Button, Col, Jumbotron, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import FadeIn from "react-fade-in";

const Welcome = () => {
  const history = useHistory();
  return (
    <>
      <FadeIn>
        <Jumbotron>
          <Row className={"welcome-row"}>
            <Col md={7}>
              <h3>Welcome to MY BLOCK COUNTS!</h3>
              <h5>
                <span
                  className={"navigation-link"}
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    history.push("/login");
                  }}
                >
                  Log in
                </span>{" "}
                or{" "}
                <span
                  className={"navigation-link"}
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    history.push("/signup");
                  }}
                >
                  sign up
                </span>{" "}
                to begin counting the environmental health features in your
                community!
              </h5>
              <h5>
                You can also visit our{" "}
                <span
                  className={"navigation-link"}
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    history.push("/data");
                  }}
                >
                  data hub
                </span>{" "}
                to view and analyze data that users have submitted (though you
                need to be logged in to use some of the features!)
              </h5>
            </Col>
            <Col md={5}>
              <div className="auth-buttons">
                <Button
                  variant="primary"
                  type="button"
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="info"
                  type="button"
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    history.push("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </Col>
          </Row>
        </Jumbotron>
      </FadeIn>
    </>
  );
};

export default Welcome;
