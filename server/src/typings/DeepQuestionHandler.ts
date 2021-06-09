import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
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

export class DeepQuestionHandler {
  public async createNewDeepQuestionRowIfNotExists(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { assessment_id, table } = req.body;
      const model: any = translator[table];
      console.log(model);
      const response = await model.findOne({
        attributes: ["_id"],
        where: { assessment_id },
      });
      if (response) return res.status(200).send(response.get({ plain: true }));
      const _id = uuid();
      const newBody = { _id, assessment_id };
      const newRow = await model.create(newBody);
      console.log(newRow);
      return res.status(200).send(newRow.getDataValue("_id"));
    } catch (error) {
      console.log(error);
      return res.status(500).send("failure");
    }
  }

  public async getDeepQuestionAnswer(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { table, col, assessment_id } = req.query;
      const answer = await translator[table as string].findOne({
        attributes: [col],
        where: {
          assessment_id,
        },
      });
      return res.status(200).json(answer.get({ plain: true }));
    } catch (error) {
      console.log(error);
      return res.status(500).send("failure");
    }
  }

  public async updateDeepQuestionAnswer(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { assessment_id, col, data, table } = req.body;
      await translator[table].update(
        {
          [col]: data,
        },
        {
          where: {
            assessment_id,
          },
        }
      );
      return res.status(200).send("success");
    } catch (error) {
      console.log(error);
      return res.status(500).send("failure");
    }
  }
}
