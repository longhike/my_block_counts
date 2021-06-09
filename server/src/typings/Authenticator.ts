import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import db from "../models";
import dotenv from "dotenv";
dotenv.config();

interface IUserResponse extends Express.User {
  _id?: string | null;
  username?: string | null;
  email?: string | null;
}

interface ISignupShape extends Express.User {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
}

export class Authenticator {
  public isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (req.user) {
      return next();
    }
    res.status(401).send("not_authorized");
  }

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

  private async sendEmail(email: string, message: string, messageHTML: string, res: Response): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_ADDR,
          pass: process.env.EMAIL_PASS,
        },
      });
      const success = await transporter.sendMail({
        from: process.env.EMAIL_ADDR,
        to: email,
        subject: "My Block Counts! password reset - DO NOT REPLY",
        text: message,
        html: messageHTML
      });
      if (!success) {
        throw new Error("send_fail");
      } else {
        return res.status(200).send("OK");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("failure");
    }
  }

  public getUserIfSessionInitiated(req: Request, res: Response): Response<any> {
    try {
      if (!req.user) return res.status(401).send("not_authorized");
      const { _id, username, email }: IUserResponse = req.user;
      res.status(200).json({
        _id,
        username,
        email,
      });
    } catch (error) {
      res.status(500).send("server_error");
    }
  }

  public async updateUser(req: Request, res: Response): Promise<any> {
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

  public forgotPassword = async (req: Request, res: Response): Promise<any> => {
    try {
      const { email } = req.body;
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      const exists = await db.UserModel.findOne({
        where: { email },
      });
      if (!exists) {
        return res.status(200).send("OK");
      }
      const _id = uuid();
      const session_id = uuid();
      const hashedSessionId = bcrypt.hashSync(session_id, bcrypt.genSaltSync());
      const success = await db.PasswordResetModel.create({
        _id,
        session_id: hashedSessionId,
        user_id: exists.get("_id"),
      });
      if (!success) {
        throw new Error("reset_create_error");
      }
      const message = `Hi there - \n\nYou're receiving this email because of a password reset attempt. If this was you, please click the following link: ${protocol}://${req.hostname}/forgot-password/${_id}_${session_id}.\n\nIf this was not you, please disregard this email and reach out to us immediately at ceejhcenter@gmail.com\n\n\nDO NOT REPLY TO THIS MESSAGE`;
      const messageHTML = `<p>Hi there - </p><p>You're receiving this email because of a password reset attempt. If this was you, please click the following link: ${protocol}://${req.hostname}/forgot-password/${_id}_${session_id}.</p><p>If this was not you, please disregard this email and reach out to us immediately at ceejhcenter@gmail.com.</p><h4><strong>DO NOT REPLY TO THIS MESSAGE</strong></h4>`;
      this.sendEmail(email, message, messageHTML, res);
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

  public login(req: Request, res: Response): Response {
    try {
      const { _id, username, email }: IUserResponse = req.user;
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
    return res.send("success");
  }
}
