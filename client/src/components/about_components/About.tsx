import { useEffect } from "react";
import { Col, Jumbotron, Row } from "react-bootstrap";
import FadeIn from "react-fade-in";
import { useDispatch, useSelector } from "react-redux";
import { unsetCurrentAssessment } from "../../redux/actions";
import Contact from "./Contact";
import { IState } from "../../utils/typings/_interfaces"
import BackButton from "../../utils/BackButton";

const About = () => {

  const dispatch = useDispatch()

  const curAssessId: string | null = useSelector(
    (state: IState) => state.currentAssessment._id
  );

  useEffect(() => {
    if (curAssessId) dispatch(unsetCurrentAssessment());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    <BackButton prev={""} />
    <FadeIn>
      
      <Jumbotron style={{ textAlign: "start" }}>
        <Row style={{marginBottom: "5px"}}>
          <Col>
            <h3>About My Block Counts</h3>
          </Col>
        </Row>

        <Row>
          <Col
            md={6}
            style={{
              marginBottom: "5px",
            }}
          >
            <p>
              My Block Counts allows for users to collect data under 8 domains
              related to the built environment: block features, stores, housing,
              industry, physical disorder, public services, transit, and health.
            </p>
            <p>
              The tool guides users through a series of survey questions related
              to the above domains to capture the nature of the built
              environment quantitatively. Once the user has completed the
              survey, they are able to access their data set and utilize it in
              tandem with other members of their community who use the tool.
            </p>
            <p>
              Through training and collaboration, community members become
              community scientists with the information needed to advocate for
              improved or additional infrastructure, and ultimately towards a
              more environmentally just neighborhood.
            </p>
          </Col>
          <Col md={6}>
            <h5>
              Have a problem or just want to tell us how great this app is? Hit
              us up!
            </h5>
            <Contact />
          </Col>
        </Row>
      </Jumbotron>
    </FadeIn>
    </>
  );
};

export default About;
