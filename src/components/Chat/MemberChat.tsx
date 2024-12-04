import { MessageType } from "../../types/response/message";
import { formatTime } from "../../utils/functions/formatTime";

interface MemberChatProps {
  message: MessageType;
}

function MemberChat({ message }: MemberChatProps) {
  return (
    <div className="flex">
      <div className="bg-green-100 p-3 rounded-xl w-fit max-w-xs flex flex-col gap-2">
        {/* Hiển thị nội dung tin nhắn */}
        {message?.content && (
          <p className="font-medium mb-1 text-[14px] break-words">
            {message.content}
          </p>
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
        <span className="text-green-600 text-[12px] self-end">
          {formatTime(message?.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default MemberChat;
