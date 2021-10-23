import { Router } from "express";
import { DataHandler, User } from "../typings";

const router = Router();
const user = new User();
const dataHandler = new DataHandler();

router
  .get("/list/my-assessments", user.isAuthenticated, dataHandler.getMyAssessments)
  .get("/list/assessments", dataHandler.getAllAssessments)
  .get("/detail/assessment", dataHandler.getAssessmentDetailByTableAndID)
  .get("/filters/:kind", dataHandler.getAvailableFilters);

export { router };
