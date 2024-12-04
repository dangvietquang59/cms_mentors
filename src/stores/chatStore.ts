import { create } from "zustand";
import { ChatRoomType } from "../types/response/chat";

export const initRoom = {
  latestMessage: {
    sender: "",
    content: "",
    timestamp: "",
  },
  _id: "-1",
  name: "",
  members: [],
};
interface ChatStore {
  activeRoom: ChatRoomType | null;
  setActiveRoom: (room: ChatRoomType) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  activeRoom: initRoom,
  setActiveRoom: (room) => set({ activeRoom: room }),
}));
