import axios, { AxiosResponse } from "axios";
import { TInitialAssessmentInfoShape } from "../utils/typings/_types";
import { IAssessmentIdAddress } from "../utils/typings/_interfaces";


export const getUserAssessmentIdsAndAddresses = async (
  user_id: string
): Promise<IAssessmentIdAddress[]> => {
  try {
    const { data }: AxiosResponse = await axios.get(
      "/assessments/user-assessments",
      {
        params: {
          user_id,
        },
      }
    );
    return data;
  } catch (error: any) {
    return error;
  }
};

export const createNewAssessment = async (
  assessmentObj: TInitialAssessmentInfoShape
): Promise<IAssessmentIdAddress> => {
  try {
    const { data }: AxiosResponse<IAssessmentIdAddress> = await axios.post(
      "/assessments/new-assessment",
      assessmentObj
    );
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getCurrentAssessmentIfExists = async (_id: string) => {
  try {
    const { data }: AxiosResponse = await axios.get(
      "/assessments/get-user-assessment",
      {
        params: {
          _id,
        },
      }
    );
    return data;
  } catch (error: any) {}
};

export const updateInitialAssessmentInfo = async (
  assessmentObj: TInitialAssessmentInfoShape
): Promise<IAssessmentIdAddress> => {
  try {
    const { data }: AxiosResponse<IAssessmentIdAddress> = await axios.put(
      "/assessments/update-user-assessment",
      assessmentObj
    );
    return data;
  } catch (error: any) {
    return error;
  }
};
