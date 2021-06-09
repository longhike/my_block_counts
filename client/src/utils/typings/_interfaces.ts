import { Dispatch, SetStateAction } from "react";
import { Question } from "./_classes";

export interface IQuestionRenderShape extends Question {
  changeTarget: string | number;
  changeHandler: Dispatch<SetStateAction<string | number>>;
}

export interface IAssessmentQuestionsShape {
  general_block_features: Question[];
  stores: Question[];
  industry: Question[];
  physical_disorder: Question[];
  housing: Question[];
  public_services: Question[];
  public_transit: Question[];
  health: Question[];
}

export interface IUser {
  _id: string | null;
  username: string | null;
  email?: string | null;
}

export interface IState {
  user: IUser;
  currentAssessmentID: string | null;
}