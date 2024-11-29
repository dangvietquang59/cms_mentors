import { Avatar } from "antd";
import images from "../../assets/images";

function Room() {
  return (
    <button className="flex items-center gap-[12px] hover:bg-[#f1f1f1] w-full duration-300 rounded-[10px] p-[10px]">
      <Avatar src={images.defaultUser} alt="avatar" size={50} />
      <div className="flex flex-col items-start gap-[4px]">
        <p className="text-[16px] font-semibold">Đặng Việt Quang</p>
        <p className="text-[14px] text-[#999]">Chưa có tin nhắn mới</p>
      </div>
    </button>
  );
}

export default Room;
