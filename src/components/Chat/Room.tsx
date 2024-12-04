import { Avatar } from "antd";
import images from "../../assets/images";
import { ChatRoomType } from "../../types/response/chat";
import { useChatStore } from "../../stores/chatStore";

interface RoomProps {
  room: ChatRoomType;
}

function Room({ room }: RoomProps) {
  const { activeRoom, setActiveRoom } = useChatStore();

  const isActive = activeRoom?._id === room._id;

  return (
    <button
      className={`flex items-center gap-[12px] hover:bg-[#f1f1f1] w-full duration-300 rounded-[10px] p-[10px] ${
        isActive ? "bg-[#e6f7ff]" : ""
      }`}
      onClick={() => setActiveRoom(room)}
    >
      <Avatar
        src={room?.members?.[0]?.imageUrl ?? images.defaultUser}
        alt="avatar"
        size={50}
      />
      <div className="flex flex-col items-start gap-[4px]">
        <p className="text-[16px] font-semibold">
          {room?.members?.[0]?.fullName}
        </p>
        <p className="text-[14px] text-[#999]">
          {room?.latestMessage?.content ?? "Chưa có tin nhắn mới"}
        </p>
      </div>
    </button>
  );
}

export default Room;
