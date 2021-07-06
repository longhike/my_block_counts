import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcryptjs";
import db from "../models";
import { IUser } from "./";
import dotenv from "dotenv";
dotenv.config();

interface ISignupShape extends Express.User {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
}

export class Authenticator {

  public async passwordIsValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    if (!req.body.user.password) {
      return next();
    } else {
      const { user } = req.body;
      const dbUser = await db.UserModel.findByPk(user._id);
      const { password } = dbUser.get({ plain: true });
      bcrypt.compare(user.password.currentPassword, password, (err, valid) => {
        if (valid) {
          req.body.user.password = bcrypt.hashSync(
            user.password.newPassword,
            bcrypt.genSaltSync()
          );
          return next();
        } else {
          return res.status(401).send("incorrect_password");
        }
      });
    }
  }

  public getUserIfSessionInitiated(req: Request, res: Response): Response<any> {
    try {
      if (!req.user) return res.status(401).send("not_authorized");
      const { _id, username, email }: IUser = req.user;
      res.status(200).json({
        _id,
        username,
        email,
      });
    } catch (error) {
      res.status(500).send("server_error");
    }
  }

  public login(req: Request, res: Response): Response {
    try {
      const { _id, username, email }: IUser = req.user;
      return res.status(200).json({ _id, username, email });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  public async signup(req: Request, res: Response): Promise<Response> {
    try {
      const _id = uuid();
      const { username, email, password } = req.body;
      const newUser: ISignupShape = {
        _id,
        username,
        email,
        password,
      };
      await db.UserModel.create(newUser);
      return res.status(200).send("success");
    } catch (error) {
      let itemFailed = error.errors[0].path;
      if (itemFailed.includes(".")) {
        itemFailed = itemFailed.split(".")[1];
      }
      const howFailed = error.errors[0].validatorKey;
      return res.status(500).json({ error: [itemFailed, howFailed] });
    }
  }

  public logout(req: Request, res: Response): Response {
    req.logout();
    req.session.destroy(err => {
      console.log(err)
    })
    return res.send("success");
  }
}
