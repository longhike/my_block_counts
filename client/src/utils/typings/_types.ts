import { Question } from "./_classes"
import { Dispatch, SetStateAction } from "react";

export type TErrorFlagProps = {
  message: string;
};

export type TSuccessFlagProps = {
  message: string;
};

export type TNavigatorProps = {
  signOutUserAndHandleState: Function;
};

export type TPasswordResetParams = {
  id: string | undefined;
};

export type TPasswordUpdate = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
};

export type TUpdatedUser = {
  _id: string;
  username?: string;
  email?: string;
  password?: TPasswordUpdate;
};

export type TSignupObj = {
  username: string;
  email: string;
  password: string;
};

export type TLoginObj = {
  username: string;
  password: string;
};

export type TUserAssessmentsResponseShape = {
  _id: string;
  st_address: string;
};

export type TUserAssessmentsDisplayProps = {
  userAssessments: TUserAssessmentsResponseShape[];
  getUserAssessmentsAndHandleStateIfExist: Function;
};

export type TUserAssessmentListItemProps = {
  assessment_id: string;
  st_address: string;
  getUserAssessmentsAndHandleStateIfExist: Function;
};

export type TInitialAssessmentSectionProps = {
  setSessionInitiated: Dispatch<SetStateAction<boolean>>;
};

export type TDeepAssessmentSectionSetProps = {
  set: Question[];
  table: string;
};


export type TInitialAssessmentSectionResponse = {
  _id: string;
  user_id: string;
  st_address: string;
  weather: string | null;
  loc_intersection: string;
};