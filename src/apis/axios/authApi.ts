import { LoginResponse } from "../../types/common/auth";
import {
  LoginRequestType,
  RegisterRequestType,
} from "../../types/requests/auth";
import urls from "../../utils/constants/urls";
import axiosClient from "./axiosClient";

const authApi = {
  async login(payload: LoginRequestType) {
    try {
      const res = await axiosClient.post<LoginResponse>(
        `${urls.AUTH}/${urls.LOGIN}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  async register(payload: RegisterRequestType) {
    try {
      const res = await axiosClient.post<LoginResponse>(
        `${urls.AUTH}/${urls.REGISTER}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },
};

export default authApi;
