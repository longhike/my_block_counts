import { Router } from "express";
import { DeepQuestionHandler, User } from "../typings";

const router = Router();
const user = new User();
const deepQuestionHandler = new DeepQuestionHandler();

router
  .get(
    "/get-deep-q-entry",
    user.isAuthenticated,
    deepQuestionHandler.getDeepQuestionAnswer
  )
  .post(
    "/find-or-create-deep-q-row",
    user.isAuthenticated,
    deepQuestionHandler.createNewDeepQuestionRowIfNotExists
  )
  .post(
    "/update-deep-q-entry",
    user.isAuthenticated,
    deepQuestionHandler.updateDeepQuestionAnswer
  );

export { router };
