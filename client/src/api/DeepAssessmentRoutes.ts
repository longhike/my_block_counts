import axios, { AxiosResponse } from "axios";
import {
  TDeepAssessmentQueryShape,
  TDeepAssessmentRowIsSetResponse,
} from "../utils/typings/_types";

export const findOrCreateDeepQRow = async (
  query: TDeepAssessmentQueryShape
): Promise<TDeepAssessmentRowIsSetResponse> => {
  try {
    const { data }: AxiosResponse = await axios.post(
      "/assessments/deep-q/find-or-create-deep-q-row",
      query
    );
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getDeepAssessmentAnswerIfExists = async (
  query: TDeepAssessmentQueryShape
): Promise<any> => {
  try {
    const { data }: AxiosResponse = await axios.get(
      "/assessments/deep-q/get-deep-q-entry",
      {
        params: query,
      }
    );
    return data;
  } catch (error: any) {
    return error;
  }
};

export const updateDeepAssessmentAnswer = async (query: TDeepAssessmentQueryShape): Promise<any> => {
  try{
    const { data }: AxiosResponse = await axios.post("/assessments/deep-q/update-deep-q-entry",
    query)
    return data
  } catch (error: any) {

  }
}
