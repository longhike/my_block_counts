import passport from "passport";
import * as local from "passport-local";
import * as bcrypt from "bcryptjs";
import db from "../models";
import { IUser } from "../models/User";

const LocalStrategy = local.Strategy;

const isValidEmail = (testCase: string): boolean => {
  const check =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return check.test(testCase.toLowerCase());
};

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async function (username: string, password: string, done: Function) {
      const validUser: any = await db.UserModel.findOne({
        where: {
          [isValidEmail(username) ? "email" : "username"]: username,
        },
      });
      if (!validUser) return done(null, false);
      bcrypt.compare(
        password,
        validUser.dataValues.password,
        (err: Error, match: boolean) => {
          if (err) return done(err);
          if (!match) return done(null, false);
          return done(null, validUser);
        }
      );
    }
  )
);

passport.serializeUser((user, cb) => cb(null, user));

passport.deserializeUser((obj, cb) => cb(null, obj));

export default passport;
