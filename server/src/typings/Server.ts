import path from "path";
import express, { Express, Request, Response, Router } from "express";
import { Server as CServer } from "http";
import db from "../models";

export type TRouter = {
  path: string;
  controller: Router;
};

export default class Server {
  private readonly PORT: string | number;
  private app: Express;
  constructor(port: string | number, app: Express) {
    this.PORT = port;
    this.app = app;
  }

  private listen(): CServer | Error {
    try {
      return this.app.listen(this.PORT, () =>
        console.log("listening on port: %s", this.PORT)
      );
    } catch (error) {
      return new Error(error);
    }
  }

  public implementMiddleware(mids: any[]): void {
    mids.forEach((mid) => {
      this.app.use(mid);
    });
  }

  public implementRouting(routers: any[]): void {
    routers.forEach((r) => {
      this.app.use(r.path, r.controller);
    });
  }

  private handleProduction(): void {
    if (process.env.NODE_ENV === "production") {
      this.app.use(express.static(path.join(__dirname, "../../../client/build")));
      this.app.get("/*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "../../../client/build/index.html"));
      });
    }
  }

  public async connect(): Promise<void>{
    try {
      this.handleProduction();
      await db.sequelize.sync();
      this.listen();
    } catch (error) {
      console.error("connection failed!");
      console.error(error);
      process.exit(0);
    }
  }
}
