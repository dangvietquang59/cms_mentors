import { MessageType } from "../../types/response/message";
import { formatTime } from "../../utils/functions/formatTime";

interface MyChatProps {
  message: MessageType;
}

function MyChat({ message }: MyChatProps) {
  return (
    <div className="flex justify-end">
      <div className="bg-[#efefef] p-[10px] rounded-[10px] w-fit max-w-[70%] flex flex-col gap-2">
        {/* Hiển thị nội dung tin nhắn */}
        {message?.content && (
          <p className="text-[14px] break-words">{message.content}</p>
        )}

        {/* Hiển thị hình ảnh nếu có */}
        {message?.attachments?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.attachments.map((attachment) => (
              <img
                key={attachment._id}
                src={attachment.url}
                alt={attachment.filename}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Thời gian gửi tin nhắn */}
        <span className="text-[#adadad] text-[12px] self-end">
          {formatTime(message?.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default MyChat;
