/* eslint-disable @typescript-eslint/no-explicit-any */
import urls from "../../utils/constants/urls";
import axiosClient from "./axiosClient";

const messageApi = {
  async create(payload: FormData) {
    try {
      const res = await axiosClient.post<any>(`${urls.MESSAGES}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res?.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};

export default messageApi;
