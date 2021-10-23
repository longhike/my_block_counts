import { Question } from "./_classes";
import { IAssessmentIdAddress } from "./_interfaces";
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

export type TPasswordUpdateShape = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
};

export type TUpdatedUser = {
  _id: string;
  username?: string;
  email?: string;
  password?: TPasswordUpdateShape;
};

export type TAuthObj = {
  username?: string;
  email?: string;
  password?: string;
};

export type TUserAssessmentsResponseShape = {
  _id: string;
  st_address: string;
};

export type TUserAssessmentsDisplayProps = {
  userAssessments: IAssessmentIdAddress[];
  getUserAssessmentsAndHandleStateIfExist: Function;
};

export type TUserAssessmentListItemProps = {
  assessment_id: string | null;
  st_address: string | null;
  getUserAssessmentsAndHandleStateIfExist: Function;
};

export type TInitialAssessmentSectionProps = {
  setSessionInitiated: Dispatch<SetStateAction<boolean>>;
};

export type TDeepAssessmentQueryShape = {
  assessment_id: string;
  table: string;
  col?: string;
  value?: string;
};

export type TDeepAssessmentSectionSetProps = {
  set: Question[];
  table: string;
};

export type TDeepAssessmentRowIsSetResponse= {
  _id: string;
}

export type TInitialAssessmentInfoShape = {
  _id: string;
  user_id: string;
  st_address: string;
  number?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  coordinates?: string;
  weather: string | null;
};

export type TPlacesResponse = {
  label?: string;
  value?: object;
};

export type TLatLng = {
  lat?: number;
  lng?: number;
};

export type TParsedAddressShape = {
  number?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
};

export type TPlacesInputProps = {
  responses: TInitialAssessmentInfoShape;
  setResponses: Dispatch<SetStateAction<TInitialAssessmentInfoShape>>;
};

export type TForgotPasswordProps = {
  email: string;
};

export type TResetPasswordObj = {
  session: string;
  password: string;
};

export type TAssessmentIdParams = {
  assessment_id: string;
};

export type TAssessmentResponseShape = {
  question: string;
  answer: string;
}

export type TAssessmentDetailDisplay = {
  data: TAssessmentResponseShape[][];
};

export type TDataFilters = {
  state?: string[],
  city?: string[],
  zipcode?: string
}