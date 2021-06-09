import { Router } from "express";
import { AssessmentHandler, Authenticator } from "../typings";

const router = Router();
const authenticator = new Authenticator();
const assessmentHandler = new AssessmentHandler();

router
  .get(
    "/user-assessments",
    authenticator.isAuthenticated,
    assessmentHandler.getUserAssessments
  )
  .get(
    "/get-user-assessment",
    authenticator.isAuthenticated,
    assessmentHandler.getUserAssessmentById
  )
  .post(
    "/new-assessment",
    authenticator.isAuthenticated,
    assessmentHandler.setNewAssessment
  )
  .put(
      "/update-user-assessment",
      authenticator.isAuthenticated,
      assessmentHandler.updateUserAssessment
  )
  .delete(
      "/delete-user-assessment",
      authenticator.isAuthenticated,
      assessmentHandler.deleteUserAssessment
  );

export { router };
