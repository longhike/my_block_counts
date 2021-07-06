import { Request, Response } from "express";
import { COLUMN_QUESTION_MAP, TColumnQuestionItem } from "../utils/data_map";

import db, {
  TDeepGeneralQuestionsStatic,
  TDeepHealthQuestionsStatic,
  TDeepHousingQuestionsStatic,
  TDeepIndustryQuestionsStatic,
  TDeepPhysicalDisorderQuestionsStatic,
  TDeepPublicServicesQuestionsStatic,
  TDeepPublicTransitQuestionsStatic,
  TDeepStoresQuestionsStatic,
} from "../models";

type TTranslator = {
  general_features_dq: TDeepGeneralQuestionsStatic;
  health_dq: TDeepHealthQuestionsStatic;
  housing_dq: TDeepHousingQuestionsStatic;
  industry_dq: TDeepIndustryQuestionsStatic;
  physical_disorder_dq: TDeepPhysicalDisorderQuestionsStatic;
  public_services_dq: TDeepPublicServicesQuestionsStatic;
  public_transit_dq: TDeepPublicTransitQuestionsStatic;
  stores_dq: TDeepStoresQuestionsStatic;
};

const translator: TTranslator = {
  general_features_dq: db.DeepGeneralQuestionsModel,
  health_dq: db.DeepHealthQuestionsModel,
  housing_dq: db.DeepHousingQuestionsModel,
  industry_dq: db.DeepIndustryQuestionsModel,
  physical_disorder_dq: db.DeepPhysicalDisorderQuestionsModel,
  public_services_dq: db.DeepPublicServicesQuestionsModel,
  public_transit_dq: db.DeepPublicTransitQuestionsModel,
  stores_dq: db.DeepStoresQuestionsModel,
};

export class DataHandler {
  public async getMyAssessments(req: Request, res: Response) {
    try {
      const { user_id } = req.query;
      const data = await db.AssessmentModel.findAll({
        where: { user_id },
        attributes: ["_id", "st_address"],
      });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("server_error");
    }
  }

  public async getAssessmentDetailByTableAndID(req: Request, res: Response) {
    try {
      const { _id, table } = req.query;
      const data = await translator[table as string].findAll({
        where: { assessment_id: _id },
        attributes: {
          exclude: [
            "_id",
            "assessment_id",
            "createdAt",
            "updatedAt",
            "user_id",
          ],
        },
      });
      if (!data[0]) return res.status(200).send([])
      const qMap = COLUMN_QUESTION_MAP[table as string];
      const set = data[0].dataValues;
      return res.status(200).json(
        qMap.map((el: TColumnQuestionItem) => {
          return {
            question: el.question,
            answer: set[el.col] ? set[el.col] : "Not answered",
          };
        })
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("server_error");
    }
  }
}
