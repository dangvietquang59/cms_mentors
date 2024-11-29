import { TechnologyType } from "../../types/common/auth";
import urls from "../../utils/constants/urls";
import axiosClient from "./axiosClient";

interface TechnologiesProps {
  name: string;
}
const technologiesApi = {
  async create(payload: TechnologiesProps) {
    try {
      const res = await axiosClient.post<TechnologyType>(
        `${urls.TECHNOLOGIES}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Technologies error:", error);
      throw error;
    }
  },
  async update(payload: TechnologiesProps, id: string) {
    try {
      const res = await axiosClient.put<TechnologyType>(
        `${urls.TECHNOLOGIES}/${id}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Technologies error:", error);
      throw error;
    }
  },
  async delete(id: string) {
    try {
      const res = await axiosClient.delete<TechnologyType>(
        `${urls.TECHNOLOGIES}/${id}`
      );

      return res?.data;
    } catch (error) {
      console.error("Technologies error:", error);
      throw error;
    }
  },
};

export default technologiesApi;
