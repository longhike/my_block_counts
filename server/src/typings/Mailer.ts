import { Response } from "express";
import dotenv from "dotenv";
import nodemailer, { Transporter } from "nodemailer";
dotenv.config();

export class Mailer {
  private _id: string;
  private session_id: string;
  private protocol: string;
  private hostname: string;
  private email: string;
  private message: string;
  private messageHTML: string;
  private res: Response;
  private transport: Transporter;
  constructor(
    _id: string,
    session_id: string,
    hostname: string,
    email: string,
    res: Response
  ) {
    this._id = _id;
    this.session_id = session_id;
    this.protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    this.hostname = hostname;
    this.email = email;
    this.message = `Hi there - \n\nYou're receiving this email because of a password reset attempt. If this was you, please click the following link: ${this.protocol}://${this.hostname}/forgot-password/${this._id}_${this.session_id}.\n\nIf this was not you, please disregard this email and reach out to us immediately at ceejhcenter@gmail.com\n\n\nDO NOT REPLY TO THIS MESSAGE`;
    this.messageHTML =`<p>Hi there - </p><p>You're receiving this email because of a password reset attempt. If this was you, please click the following link: ${this.protocol}://${this.hostname}/forgot-password/${this._id}_${this.session_id}.</p><p>If this was not you, please disregard this email and reach out to us immediately at ceejhcenter@gmail.com.</p><h4><strong>DO NOT REPLY TO THIS MESSAGE</strong></h4>`;
    this.res = res;
    this.transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDR,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  public async sendMail(): Promise<Response> {
    try {
      const success = await this.transport.sendMail({
        from: process.env.EMAIL_ADDR,
        to: this.email,
        subject: "My Block Counts! password reset - DO NOT REPLY",
        text: this.message,
        html: this.messageHTML,
      });
      if (!success) {
        throw new Error("send_fail");
      } else {
        return this.res.status(200).send("OK");
      }
    } catch (error) {
      console.log(error);
      return this.res.status(500).send("failure");
    }
  }
}
