import { BlogType } from "../common/blog";

export type BlogsResponseType = {
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  posts: BlogType[];
};
