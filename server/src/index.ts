import express, { Express, RequestHandler } from "express";
import session from "express-session";
import passport from "passport";
import SequelizeStore from "connect-session-sequelize";
import compression from "compression";
import * as dotenv from "dotenv";
import db from "./models";
import {
  AuthController,
  AssessmentController,
  DataController,
  DeepQuestionController,
} from "./controller";
import { Server, TRouter } from "./typings";

dotenv.config();
const SessionStore = SequelizeStore(session.Store);
const app: Express = express();

const PORT: string | number = process.env.PORT || 3001;

const server: Server = new Server(PORT, app);

const setSessionParams: RequestHandler = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SessionStore({
    db: db.sequelize,
    tableName: "session",
  }),
});

const middleware: any[] = [
  compression(),
  express.json(),
  express.urlencoded({ extended: true }),
  setSessionParams,
  passport.initialize(),
  passport.session(),
];

const controllers: TRouter[] = [
  {
    path: "/auth",
    controller: AuthController,
  },
  {
    path: "/assessments",
    controller: AssessmentController,
  },
  {
    path: "/assessments/deep-q",
    controller: DeepQuestionController,
  },
  {
    path: "/api",
    controller: DataController,
  },
];

server.implementMiddleware(middleware);
server.implementRouting(controllers);
server.connect();
