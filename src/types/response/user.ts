import { UserType } from "../common/auth";

export type UserResponseType = {
  users: UserType[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
};
