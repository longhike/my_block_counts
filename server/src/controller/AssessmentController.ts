import { Router } from "express";
import { AssessmentHandler, User } from "../typings";

const router = Router();
const user = new User();
const assessmentHandler = new AssessmentHandler();

router
  .get(
    "/user-assessments",
    user.isAuthenticated,
    assessmentHandler.getUserAssessments
  )
  .get(
    "/get-user-assessment",
    user.isAuthenticated,
    assessmentHandler.getUserAssessmentById
  )
  .post(
    "/new-assessment",
    user.isAuthenticated,
    assessmentHandler.setNewAssessment
  )
  .put(
      "/update-user-assessment",
      user.isAuthenticated,
      assessmentHandler.updateUserAssessment
  )
  .delete(
      "/delete-user-assessment",
      user.isAuthenticated,
      assessmentHandler.deleteUserAssessment
  );

export { router };
