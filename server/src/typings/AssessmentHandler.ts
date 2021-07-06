import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import db from "../models";
import { IAssessment } from "../models/Assessment";

type TNewAssessmentShape = {
  _id: string;
  st_address: string;
  weather: string;
  user_id: string;
};

type TUserAssessmentsShape = {
  _id: string;
  st_address: string;
};

export class AssessmentHandler {
  public async setNewAssessment(req: Request, res: Response) {
    try {
      const id = uuid();
      const assessmentBody: TNewAssessmentShape = { ...req.body, _id: id };
      const newAssessment = await db.AssessmentModel.create(assessmentBody);
      const { _id, st_address } = newAssessment.get({
        plain: true,
      });
      res.status(200).send({ _id, st_address });
      // res.status(200).send(newAssessment.getDataValue("_id"));
    } catch (error) {
      console.log(error);
      res.status(500).send("create_error");
    }
  }

  public async getUserAssessments(req: Request, res: Response) {
    try {
      const userAssessments: IAssessment[] = await db.AssessmentModel.findAll({
        attributes: ["_id", "st_address"],
        where: {
          user_id: req.query.user_id,
        },
      });
      const response: TUserAssessmentsShape[] = userAssessments.map((el) => {
        return el.get({
          plain: true,
        });
      });
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("find_error");
    }
  }

  public async getUserAssessmentById(req: Request, res: Response) {
    try {
      const _id: string | any = req.query._id;
      const userAssessment: IAssessment = await db.AssessmentModel.findByPk(
        _id
      );
      res.status(200).send(
        userAssessment.get({
          plain: true,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("find_error");
    }
  }

  public async updateUserAssessment(req: Request, res: Response) {
    try {
      const { _id, st_address, weather } = req.body;
      await db.AssessmentModel.update(
        {
          st_address,
          weather,
        },
        {
          where: {
            _id,
          },
        }
      );
      res.status(200).send({ _id, st_address });
    } catch (error) {
      console.log(error);
      res.status(500).send("failure");
    }
  }

  public async deleteUserAssessment(req: Request, res: Response) {
    try {
      const _id = req.query.id;
      const deleted = await db.AssessmentModel.destroy({ where: { _id } });
      console.log(deleted);
      res.status(200).send("success");
    } catch (error) {
      console.log(error);
      res.status(500).send("failure");
    }
  }
}
