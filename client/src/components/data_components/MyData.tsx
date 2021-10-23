import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Form, Jumbotron, Row } from "react-bootstrap";
import FadeIn from "react-fade-in";
import Loading from "../../utils/Loading";
import { IState, IUser } from "../../utils/typings/_interfaces";
import { TUserAssessmentsResponseShape } from "../../utils/typings/_types";
import AssessmentDetail from "../../utils/data_utils/AssessmentDetail";
import { getMyAssessments } from "../../api/ApiRoutes";
import BackButton from "../../utils/BackButton";

const MyData = () => {
  const user: IUser = useSelector((state: IState) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<TUserAssessmentsResponseShape[]>([]);
  const [assessmentViewed, setAssessmentViewed] = useState<string>("");

  const getData = async () => {
    const data: TUserAssessmentsResponseShape[] = await getMyAssessments(
      user._id!
    );
    setDataList((cur) => [...data]);
    setLoading((cur) => false);
  };

  useEffect(() => {
    if (dataList.length > 0) {
      setAssessmentViewed(dataList[0]._id);
    }
  }, [dataList]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackButton prev="data" />
      <FadeIn>
        <Jumbotron>
          <Row>
            <Col md={6}>
              <div style={{ textAlign: "left" }}>
                <h2>{user.username}'s assessments</h2>
              </div>
            </Col>
            <Col md={6}>
              {loading ? (
                <Loading />
              ) : dataList.length <= 0 ? (
                "looks like you don't have any assessments yet!"
              ) : (
                <Form>
                  <Form.Group>
                    <Form.Control
                      as="select"
                      onChange={(e: any) => {
                        e.preventDefault();
                        const _id = e.currentTarget.value;
                        if (assessmentViewed !== _id)
                          setAssessmentViewed((cur) => _id);
                      }}
                    >
                      {dataList.map(({ _id, st_address }, i) => {
                        return (
                          <option key={i} value={_id}>
                            {st_address}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Form>
              )}
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <Loading />
              ) : (
                <AssessmentDetail _id={assessmentViewed} />
              )}
            </Col>
          </Row>
        </Jumbotron>
      </FadeIn>
    </>
  );
};

export default MyData;
