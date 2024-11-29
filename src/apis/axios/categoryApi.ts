import { CategoryType } from "../../types/common/category";
import urls from "../../utils/constants/urls";
import axiosClient from "./axiosClient";

interface CategoryBlog {
  name: string;
  description: string;
}
const categoryApi = {
  async create(payload: CategoryBlog) {
    try {
      const res = await axiosClient.post<CategoryType>(`${urls.TAGS}`, payload);

      return res?.data;
    } catch (error) {
      console.error("Tags title error:", error);
      throw error;
    }
  },
  async update(payload: CategoryBlog, id: string) {
    try {
      const res = await axiosClient.put<CategoryType>(
        `${urls.TAGS}/${id}`,
        payload
      );

      return res?.data;
    } catch (error) {
      console.error("Tags title error:", error);
      throw error;
    }
  },
  async delete(id: string) {
    try {
      const res = await axiosClient.delete<CategoryType>(`${urls.TAGS}/${id}`);

      return res?.data;
    } catch (error) {
      console.error("Tags title error:", error);
      throw error;
    }
  },
};

export default categoryApi;
