import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Mailer } from "./Mailer";
import db from "../models";
dotenv.config();

export interface IUser extends Express.User {
  _id?: string | null;
  username?: string | null;
  email?: string | null;
}

export class User {
  public isAuthenticated(
    user: Request,
    res: Response,
    next: NextFunction
  ): void | Response {
    if (!user) {
      return res.status(401).send("not_authorized");
    }
    return next();
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { cols, user }: any = req.body;
      const update = {};
      cols.forEach((col) => {
        update[col] = user[col];
      });
      await db.UserModel.update(update, {
        where: {
          _id: user._id,
        },
      });
      cols.forEach((col) => {
        if (col !== "password") {
          req.user[col] = user[col];
        }
      });
      return res.status(200).send("success");
    } catch (error) {
      return res.status(500).send("oh no...");
    }
  }

  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { email } = req.body;
      const exists = await db.UserModel.findOne({
        where: { email },
      });
      if (!exists) {
        return res.status(200).send("OK");
      }
      const _id = uuid();
      const session_id = uuid();
      const hostname = req.hostname;
      const hashedSessionId = bcrypt.hashSync(session_id, bcrypt.genSaltSync());
      const success = await db.PasswordResetModel.create({
        _id,
        session_id: hashedSessionId,
        user_id: exists.get("_id"),
      });
      if (!success) {
        throw new Error("reset_create_error");
      }
      const mail = new Mailer(_id, session_id, hostname, email, res);
      return mail.sendMail();
    } catch (error) {
      console.log(error);
      res.status(500).send("failure");
    }
  };

  public async resetPassword(req: Request, res: Response): Promise<any> {
    try {
      const { session, password } = req.body;
      const [session_id, session_pass] = session.split("_");
      const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
      const validSession = await db.PasswordResetModel.findOne({
        where: { _id: session_id },
      });
      const _id = validSession.get("user_id");
      const hashed_session_pass = validSession.getDataValue("session_id");
      bcrypt.compare(session_pass, hashed_session_pass, async (err, valid) => {
        if (err) throw new Error("validation_error");
        if (!valid) return res.status(401).send("not_authorized");
        await db.UserModel.update(
          {
            password: newPassword,
          },
          {
            where: { _id },
          }
        );
        return res.status(200).send("success");
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("error!");
    }
  }
}
