import HeaderChat from "./HeaderChat";
import { IoIosSend } from "react-icons/io";
import MemberChat from "./MemberChat";
import MyChat from "./MyChat";

function ContentChat() {
  return (
    <div className="w-full">
      <HeaderChat />
      <div className="min-h-[500px] max-h-[500px] py-[10px] flex flex-col gap-[12px] overflow-y-auto px-[10px]">
        <MemberChat />
        <MyChat />
        <MyChat />
        <MyChat />
        <MyChat />
        <MyChat />
        <MyChat />
        <MyChat />
        <MyChat />
        <MyChat />
        <MyChat />
        <MyChat />
      </div>

      {/* Chat Input Section */}
      <div className="bg-[#F9F9F9] rounded-lg border flex items-center gap-3 sticky bottom-[0] p-[2px_4px]">
        {/* Input Field */}
        <input
          placeholder="Nhập tin nhắn..."
          className="w-full px-4 py-2 text-[14px] bg-transparent rounded-lg focus:outline-none"
        />

        {/* Send Button */}
        <button className="p-1 bg-blue-500 rounded-full hover:bg-blue-600 transition-all">
          <IoIosSend className="text-white w-[24px] h-[24px]" />
        </button>
      </div>
    </div>
  );
}

export default ContentChat;
