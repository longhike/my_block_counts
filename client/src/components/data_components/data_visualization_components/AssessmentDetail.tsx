import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { TABLE_NAME_LIST } from "../../../utils/data_map";
// import { Question } from "../../../utils/typings/_classes";
// import { AssessmentQuestions } from "../../../utils/_assessmentQuestions";
import AssessmentDetailDisplay from "./assessment_detail_components/AssessmentDetailDisplay";
import Loading from "../../../utils/Loading";
import axios from "axios";

type TAssessmentDetailProps = {
  _id: string;
};

const AssessmentDetail = ({ _id }: TAssessmentDetailProps) => {
  const [assessmentData, setAssessmentData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const getAssessmentDataAndSetState = async () => {
    setDataLoading((cur) => true);
    try {
      for (let i = 0; i < TABLE_NAME_LIST.length; i++) {
        const { data } = await axios.get(
          `/api/my-data/get-by-id?_id=${_id}&table=${TABLE_NAME_LIST[i]}`
        );
        if (!data) throw new Error("data_error");
        if (data.length <= 0) throw new Error("no_data");
        if (i === 0) setAssessmentData((cur) => [[...data]]);
        else setAssessmentData((cur) => [...cur, data]);
      }
      setDataLoading(false);
    } catch (error) {
      console.log(error.message);
      setAssessmentData((cur) => []);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getAssessmentDataAndSetState();
    // eslint-disable-next-line
  }, [_id]);

  return (
    <>
      {dataLoading ? (
        <Loading />
      ) : (
        <AssessmentDetailDisplay data={assessmentData} />
      )}
    </>
  );
};

export default AssessmentDetail;
