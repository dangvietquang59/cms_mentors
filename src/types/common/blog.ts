import { UserType } from "./auth";

export type BlogType = {
  _id: string;
  title: string;
  content: string;
  userId: UserType;
  slug: string;
  tags: [];
  likes: [];
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
