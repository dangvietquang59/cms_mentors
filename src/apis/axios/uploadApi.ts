/* eslint-disable @typescript-eslint/no-explicit-any */
import urls from "../../utils/constants/urls";
import axiosClient from "./axiosClient";

const uploadApi = {
  async upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosClient.post<any>(
        `${urls.V2}/${urls.UPLOAD}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res?.data;
    } catch (error) {
      console.error("UPLOAD error:", error);
      throw error;
    }
  },
};

export default uploadApi;
