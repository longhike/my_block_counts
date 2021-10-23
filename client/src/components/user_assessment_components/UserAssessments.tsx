import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserAssessmentIdsAndAddresses } from "../../api/AssessmentRoutes";
import { IAssessmentIdAddress, IState } from "../../utils/typings/_interfaces";
import Loading from "../../utils/Loading";
import { ErrorFlag } from "../../utils/ErrorFlag";
import UserAssessmentsDisplay from "./user_assessments_components/UserAssessmentsDisplay";
import NoAssessments from "./user_assessments_components/NoAssessments";
import { Jumbotron } from "react-bootstrap";
import FadeIn from "react-fade-in";
import BackButton from "../../utils/BackButton";

const UserAssessments = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [userAssessments, setUserAssessments] = useState<
    IAssessmentIdAddress[]
  >([]);
  const userID: string = useSelector((state: IState) => state.user._id!);

  const getUserAssessmentsAndHandleStateIfExist = async (id: string) => {
    if (!loading) setLoading(true);
    try {
      const data: IAssessmentIdAddress[] =
        await getUserAssessmentIdsAndAddresses(id);
      setUserAssessments((cur) => [...data]);
      setLoading((cur) => false);
    } catch (error) {
      console.error(error);
      setError((cur) => true);
      setLoading((cur) => false);
    }
  };

  useEffect(() => {
    getUserAssessmentsAndHandleStateIfExist(userID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackButton prev={""} />
      <FadeIn>
        <Jumbotron>
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorFlag
              message={
                "oy vey. something went wrong. please refresh and try again."
              }
            />
          ) : userAssessments.length > 0 ? (
            <UserAssessmentsDisplay
              userAssessments={userAssessments}
              getUserAssessmentsAndHandleStateIfExist={
                getUserAssessmentsAndHandleStateIfExist
              }
            />
          ) : (
            <NoAssessments />
          )}
        </Jumbotron>
      </FadeIn>
    </>
  );
};

export default UserAssessments;
