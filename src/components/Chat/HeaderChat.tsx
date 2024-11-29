import { Avatar } from "antd";
import images from "../../assets/images";

function HeaderChat() {
  return (
    <div className="flex items-center gap-[12px] border-b p-[10px] w-full">
      <Avatar src={images.defaultUser} alt="avatar" size={50} />
      <div className="flex flex-col gap-[4px]">
        <p className="text-[16px] font-semibold">Đặng Việt Quang</p>
        <p className="text-[14px] text-[#999]">Frontend Developer</p>
      </div>
    </div>
  );
}

export default HeaderChat;
