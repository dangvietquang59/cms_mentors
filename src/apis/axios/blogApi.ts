import { TechnologyType } from "../../types/common/auth";
import urls from "../../utils/constants/urls";
import axiosClient from "./axiosClient";

interface BlogProps {
  title: string;
  content: string;
  tags: string[];
}
const blogApi = {
  async create(payload: BlogProps) {
    try {
      const res = await axiosClient.post<TechnologyType>(
        `${urls.POSTS}/${urls.CREATE_NEW_POST}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("blog title error:", error);
      throw error;
    }
  },
  async update(payload: BlogProps, id: string) {
    try {
      const res = await axiosClient.put<TechnologyType>(
        `${urls.POSTS}/${urls.UPDATE_POST}/${id}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("blog title error:", error);
      throw error;
    }
  },
  async delete(id: string) {
    try {
      const res = await axiosClient.delete<TechnologyType>(
        `${urls.POSTS}/${urls.DELETE_POST}/${id}`
      );

      return res?.data;
    } catch (error) {
      console.error("blog title error:", error);
      throw error;
    }
  },
};

export default blogApi;
