import { TechnologyType } from "../../types/common/auth";
import urls from "../../utils/constants/urls";
import axiosClient from "./axiosClient";

interface TechnologiesProps {
  name: string;
}
const jobTitleApi = {
  async create(payload: TechnologiesProps) {
    try {
      const res = await axiosClient.post<TechnologyType>(
        `${urls.JOBTITLE}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Job title error:", error);
      throw error;
    }
  },
  async update(payload: TechnologiesProps, id: string) {
    try {
      const res = await axiosClient.put<TechnologyType>(
        `${urls.JOBTITLE}/${id}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Job title error:", error);
      throw error;
    }
  },
  async delete(id: string) {
    try {
      const res = await axiosClient.delete<TechnologyType>(
        `${urls.JOBTITLE}/${id}`
      );

      return res?.data;
    } catch (error) {
      console.error("Job title error:", error);
      throw error;
    }
  },
};

export default jobTitleApi;
