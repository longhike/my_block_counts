import { useEffect, useState } from "react";
import { Col, Jumbotron, Row } from "react-bootstrap";
import AssessmentListHolder from "../../utils/data_utils/AssessmentListHolder";
import FadeIn from "react-fade-in";
import { getAllAssessments } from "../../api/ApiRoutes";
import Loading from "../../utils/Loading";
import BackButton from "../../utils/BackButton";

const DataByAddress = () => {
  const [loadingResponses, setLoadingResponses] = useState<boolean>(true);
  const [availableAssessments, setAvailableAssessments] = useState<Array<any>>(
    []
  );

  const getAndSetAvailableAssessments = async () => {
    try {
      const response = await getAllAssessments();
      setAvailableAssessments([...response]);
      setLoadingResponses(false);
    } catch (error) {}
  };

  useEffect(() => {
    getAndSetAvailableAssessments();
  }, []);

  return (
    <>
      <BackButton prev={"data"} />
      <FadeIn>
        <Jumbotron>
          <BackButton prev={"data"} />
          <Row>
            <Col>
              {loadingResponses ? (
                <Loading />
              ) : (
                <AssessmentListHolder list={availableAssessments} />
              )}
            </Col>
          </Row>
        </Jumbotron>
      </FadeIn>
    </>
  );
};

export default DataByAddress;
