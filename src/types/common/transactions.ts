import { UserType } from "./auth";

export type TransactionType = {
  _id: string;
  userId: UserType;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
