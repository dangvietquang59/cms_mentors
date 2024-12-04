import { Avatar } from "antd";
import images from "../../assets/images";
import { useChatStore } from "../../stores/chatStore";

function HeaderChat() {
  const { activeRoom } = useChatStore();
  return (
    <div className="flex items-center gap-[12px] border-b p-[10px] w-full">
      <Avatar
        src={activeRoom?.members?.[0]?.imageUrl || images.defaultUser}
        alt="avatar"
        size={50}
      />
      <div className="flex flex-col gap-[4px]">
        <p className="text-[16px] font-semibold">
          {activeRoom?.members?.[0]?.fullName}
        </p>
        <p className="text-[14px] text-[#999]">
          {activeRoom?.members?.[0]?.bio?.name || "Mentee"}
        </p>
      </div>
    </div>
  );
}

export default HeaderChat;
