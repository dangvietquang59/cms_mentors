import { UserType } from "../common/auth";

export type ChatRoomType = {
  latestMessage: {
    sender: string;
    content: string;
    timestamp: string;
  };
  _id: string;
  name: string;
  members: UserType[];
};
