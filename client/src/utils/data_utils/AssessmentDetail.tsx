import { useState, useEffect } from "react";
import { TABLE_NAME_LIST } from "./data_map";
import AssessmentDetailDisplay from "./AssessmentDetailDisplay";
import Loading from "../Loading";
import { getAssessmentDetailById } from "../../api/ApiRoutes";

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
        const data = await getAssessmentDetailById(_id, TABLE_NAME_LIST[i])
        if (!data) throw new Error("data_error");
        if (data.length <= 0) throw new Error("no_data");
        if (i === 0) setAssessmentData((cur) => [data]);
        else setAssessmentData((cur) => [...cur, data]);
      }
      setDataLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setAssessmentData((cur) => []);
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (_id) {
      getAssessmentDataAndSetState();
    }
    
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
