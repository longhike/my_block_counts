import { Router } from "express";
import { DeepQuestionHandler, Authenticator } from "../typings";

const router = Router();
const authenticator = new Authenticator();
const deepQuestionHandler = new DeepQuestionHandler();

router
  .get(
    "/get-deep-q-entry",
    authenticator.isAuthenticated,
    deepQuestionHandler.getDeepQuestionAnswer
  )
  .post(
    "/find-or-create-deep-q-row",
    authenticator.isAuthenticated,
    deepQuestionHandler.createNewDeepQuestionRowIfNotExists
  )
  .post(
    "/update-deep-q-entry",
    authenticator.isAuthenticated,
    deepQuestionHandler.updateDeepQuestionAnswer
  );

export { router };
