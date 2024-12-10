import { UserType } from "../common/auth";

export type StatisticUserType = {
  userCount: number;
  mentorCount: number;
  menteeCount: number;
  totalBookings: number;
  totalTransactions: number;
};
export type FreeTimeDetailType = {
  _id: string;
  freeTimeId: string;
  name: string;
  from: string;
  to: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
export type BookingType = {
  _id: string;
  participants: UserType[];
  freetimeDetailId: FreeTimeDetailType;
  status: string;
  amount: number;
  from: string;
  to: string;
  createdAt: string;
  updatedAt: string;
};
export type StatisticTransactionsType = [
  {
    _id: string;
    userId: UserType;
    type: string;
    amount: number;
    status: string;
    relatedUserId: UserType;
    bookingId: BookingType;
    createdAt: string;
    updatedAt: string;
  },
];

export type RevenueAdmin = {
  date: string;
  transactionTotal: number;
  adminRevenueTotal: number;
};
