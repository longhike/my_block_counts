import { Router } from "express";
import { passport } from "../config";
import { Authenticator } from "../typings";

const router = Router();

const authenticator = new Authenticator();

router
  .get("/", authenticator.getUserIfSessionInitiated)
  .get("/user", authenticator.isAuthenticated, authenticator.getUserIfSessionInitiated)
  .get("/logout", authenticator.logout)
  .post("/login", passport.authenticate("local"), authenticator.login)
  .post("/signup", authenticator.signup)
  .post("/forgot-password", authenticator.forgotPassword)
  .post("/reset-password", authenticator.resetPassword)
  .put("/update-user", authenticator.isAuthenticated, authenticator.passwordIsValid, authenticator.updateUser)


export { router };
