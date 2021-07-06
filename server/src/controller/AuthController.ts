import { Router } from "express";
import { passport } from "../config";
import { Authenticator, User } from "../typings";

const router = Router();

const authenticator = new Authenticator();
const user = new User();

router
  .get("/", authenticator.getUserIfSessionInitiated)
  .get("/user", user.isAuthenticated, authenticator.getUserIfSessionInitiated)
  .get("/logout", authenticator.logout)
  .post("/login", passport.authenticate("local"), authenticator.login)
  .post("/signup", authenticator.signup)
  .post("/forgot-password", user.forgotPassword)
  .post("/reset-password", user.resetPassword)
  .put(
    "/update-user",
    user.isAuthenticated,
    authenticator.passwordIsValid,
    user.updateUser
  );

export { router };
