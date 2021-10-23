import {
  TUserAssessmentsDisplayProps,
} from "../../../utils/typings/_types";
import { IAssessmentIdAddress } from "../../../utils/typings/_interfaces";
import UserAssessmentListItem from "./UserAssessmentListItem";
import FadeIn from "react-fade-in";
import { useState } from "react";
import { ErrorFlag } from "../../../utils/ErrorFlag";

const UserAssessmentsDisplay = ({
  userAssessments,
  getUserAssessmentsAndHandleStateIfExist,
}: TUserAssessmentsDisplayProps) => {
  // eslint-disable-next-line
  const [error, setError] = useState<boolean>(false)
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState<string>("")
  return (
    <>
      <FadeIn>
        <div className={"user-assessment-items-holder"}>
          {userAssessments.map((el: IAssessmentIdAddress) => {
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
