import axios, { AxiosResponse } from "axios";
import {
  TAuthObj,
  TForgotPasswordProps,
  TResetPasswordObj,
  TUpdatedUser,
} from "../utils/typings/_types";
import { IUser } from "../utils/typings/_interfaces";

export const login = async (loginObj: TAuthObj): Promise<IUser> => {
  try {
    const { data }: AxiosResponse<IUser> = await axios.post(
      "/auth/login",
      loginObj
    );
    return data;
  } catch (error: any) {
    return error;
  }
};

export const signup = async (signupObj: TAuthObj): Promise<string> => {
  try {
    const { data } = await axios.post("/auth/signup", signupObj);
    return data as string;
  } catch (error: any) {
    return error;
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    await axios.get("/auth/logout");
    return true;
  } catch (error: any) {
    return false;
  }
};

export const getUserIfAuthenticated = async (): Promise<IUser> => {
  try {
    const { data }: AxiosResponse<IUser> = await axios.get(
      `${window.location.origin}/auth`
    );
    return data;
  } catch (error: any) {
    return error;
  }
};

export const updateUserInfo = async (
  cols: string[],
  user: TUpdatedUser
): Promise<boolean> => {
  try {
    const { data }: AxiosResponse<string> = await axios.put(
      "/auth/update-user",
      { cols, user }
    );
    return data === "success";
  } catch (error: any) {
    return error;
  }
};

export const forgotPassword = async (
  forgotObj: TForgotPasswordProps
): Promise<boolean> => {
  try {
    const { data }: AxiosResponse<string> = await axios.post(
      "/auth/forgot-password",
      forgotObj
    );
    return data === "OK";
  } catch (error: any) {
    return error;
  }
};

export const resetPassword = async (
  resetObj: TResetPasswordObj
): Promise<boolean> => {
  try {
    const { data }: AxiosResponse<string> = await axios.post(
      "/auth/reset-password",
      resetObj
    );
    return data === "success";
  } catch (error: any) {
    return error;
  }
};
