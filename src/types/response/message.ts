import { UserType } from "../common/auth";
export type Attachments = {
  filename: string;
  url: string;
  mimetype: string;
  _id: string;
};
export type MessageType = {
  _id: string;
  sender: UserType;
  content: string;
  group: string;
  attachments: Attachments[];
  timestamp: string;
  createdAt: string;
  updatedAt: string;
};
