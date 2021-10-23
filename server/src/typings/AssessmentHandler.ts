import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import db from "../models";
import { IAssessment } from "../models/Assessment";

type TNewAssessmentShape = {
  _id: string;
  st_address: string;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  coordinates: string;
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
      const { body } = req;
      const newAssessmentBody: TNewAssessmentShape = {
        _id: id,
        user_id: body.user_id,
        st_address: body.st_address,
        number: body.number,
        street: body.street,
        neighborhood: body.neighborhood,
        city: body.city,
        state: body.state,
        country: body.country,
        zip: body.zip,
        coordinates: body.coordinates,
        weather: body.weather,
      };
      const exists = await db.AssessmentModel.count({
        where: { st_address: newAssessmentBody.st_address },
      });
      if (exists > 0) return res.status(403).send("not_unique")
      const newAssessment = await db.AssessmentModel.create(newAssessmentBody);
      const { _id, st_address } = newAssessment.get({
        plain: true,
      });
      res.status(200).send({ _id, st_address });
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
      const {
        _id,
        st_address,
        number,
        street,
        neighborhood,
        city,
        state,
        country,
        zip,
        coordinates,
        weather,
      } = req.body;
      await db.AssessmentModel.update(
        {
          st_address,
          number: number ? number : null,
          street: street ? street : null,
          neighborhood: neighborhood ? neighborhood : null,
          city: city ? city : null,
          state: state ? state : null,
          country: country ? country : null,
          zip: zip ? zip : null,
          coordinates: coordinates ? coordinates : null,
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
