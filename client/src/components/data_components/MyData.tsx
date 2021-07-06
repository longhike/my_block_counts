import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Col, Form, Jumbotron, Row } from "react-bootstrap";
import Loading from "../../utils/Loading";
import { IState, IUser } from "../../utils/typings/_interfaces";
import AssessmentDetail from "./data_visualization_components/AssessmentDetail";
import { FormEvent } from "react";

const MyData = () => {
  const user: IUser = useSelector((state: IState) => state.user);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [assessmentViewed, setAssessmentViewed] = useState<string>("");

  const getMyData = async () => {
    const { data } = await axios.get(`/api/my-data?user_id=${user._id}`);
    setDataList((cur) => [...data]);
    setLoading((cur) => false);
  };

  useEffect(() => {
    if (dataList.length > 0) {
      setAssessmentViewed(dataList[0]._id);
    }
  }, [dataList]);

  useEffect(() => {
    getMyData();
  }, []);

  return (
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
          {loading ? <Loading /> : <AssessmentDetail _id={assessmentViewed} /> }
        </Col>
      </Row>
    </Jumbotron>
  );
};

export default MyData;
