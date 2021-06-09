import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { TUserAssessmentsResponseShape } from "../../utils/typings/_types";
import { IState } from "../../utils/typings/_interfaces";
import Loading from "../../utils/Loading";
import { ErrorFlag } from "../../utils/ErrorFlag";
import UserAssessmentsDisplay from "./user_assessments_components/UserAssessmentsDisplay";
import NoAssessments from "./user_assessments_components/NoAssessments";
import { Jumbotron } from "react-bootstrap";
import FadeIn from "react-fade-in";

const UserAssessments = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [userAssessments, setUserAssessments] = useState<
    TUserAssessmentsResponseShape[]
  >([]);
  const userID: string = useSelector((state: IState) => state.user._id!);

  const getUserAssessmentsAndHandleStateIfExist = (): void => {
    if (!loading) setLoading(true);
    axios
      .get("/assessments/user-assessments", {
        params: {
          user_id: userID,
        },
      })
      .then(({ data }: AxiosResponse) => {
        setUserAssessments((cur) => [...data]);
        setLoading((cur) => false);
      })
      .catch((error) => {
        console.error(error)
        setError((cur) => true);
        setLoading((cur) => false);
      });
  };

  useEffect(() => {
    getUserAssessmentsAndHandleStateIfExist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
