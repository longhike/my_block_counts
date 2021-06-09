import {
  TUserAssessmentsDisplayProps,
  TUserAssessmentsResponseShape,
} from "../../../utils/typings/_types";
import UserAssessmentListItem from "./UserAssessmentListItem";
import FadeIn from "react-fade-in";
import { useState } from "react";
import { ErrorFlag } from "../../../utils/ErrorFlag";

const UserAssessmentsDisplay = ({
  userAssessments,
  getUserAssessmentsAndHandleStateIfExist,
}: TUserAssessmentsDisplayProps) => {
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  return (
    <>
      <FadeIn>
        <div className={"user-assessment-items-holder"}>
          {userAssessments.map((el: TUserAssessmentsResponseShape) => {
            return (
              <UserAssessmentListItem
                key={el._id}
                assessment_id={el._id}
                st_address={el.st_address}
                getUserAssessmentsAndHandleStateIfExist={
                  getUserAssessmentsAndHandleStateIfExist
                }
              />
            );
          })}
        </div>
        {error ? <ErrorFlag message={errorMessage}/> : ""}
      </FadeIn>
    </>
  );
};

export default UserAssessmentsDisplay;
