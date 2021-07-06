import { Router } from "express";
import { DataHandler, User } from "../typings";

const router = Router();
const user = new User();
const dataHandler = new DataHandler();

router
  .get("/my-data", user.isAuthenticated, dataHandler.getMyAssessments)
  .get("/my-data/get-by-id", dataHandler.getAssessmentDetailByTableAndID);

export { router };
