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

  public async getAllAssessments(req: Request, res: Response) {
    try {
      const data = await db.AssessmentModel.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "user_id", "weather"],
        },
      });
      const result = data.map((d) => d.get({ plain: true }));
      DataHandler.updateDataListCoordinatesToFloat(result);
      return res.status(200).json(result);
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
      if (!data[0]) return res.status(200).send([]);
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

  public async getAvailableFilters(req: Request, res: Response) {
    const response = {};
    const { kind } = req.params;
    const parsed = kind.split("-");
    const raw: any[] = await db.AssessmentModel.findAll({
      attributes: parsed,
    });
    raw.forEach(({ dataValues }) => {
      for (const key in dataValues) {
        if (!response.hasOwnProperty(key)) {
          response[key] = new Set();
          response[key].add(dataValues[key]);
        } else {
          response[key].add(dataValues[key]);
        }
      }
    });
    for (const key in response) {
      response[key] = Array.from(response[key]);
    }
    res.json(response);
  }

  private static updateDataListCoordinatesToFloat(list: any[]): void {
    for (let i = 0; i < list.length; i++) {
      const current = list[i];
      const updatedCoordinates = JSON.parse(current.coordinates).map((c) =>
        parseFloat(c)
      );
      current.coordinates = updatedCoordinates;
      list[i] = current;
    }
  }
}
