/* eslint-disable react-hooks/rules-of-hooks */
import HeaderChat from "./HeaderChat";
import { IoIosClose, IoIosSend } from "react-icons/io";
import MemberChat from "./MemberChat";
import MyChat from "./MyChat";
import { io } from "socket.io-client";
import { useChatStore } from "../../stores/chatStore";
import { getProfile } from "../../utils/functions/getProfile";
import { useRef, useState, useEffect } from "react";
import { useScrollToBottom } from "../../utils/hooks/useScrollToBottom";
import { useFetchMessages } from "../../apis/swr/useFetchMessage";
import messageApi from "../../apis/axios/messageApi";
import icons from "../../assets/icons";

const socket = io(import.meta.env.VITE_BASE_URL);

function ContentChat() {
  const [msg, setMsg] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const { activeRoom } = useChatStore();
  const profile = getProfile();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Check if activeRoom is available before proceeding
  if (!activeRoom?._id) {
    return <div>Loading...</div>; // Or a more specific loading message
  }

  // Now we can safely call the useFetchMessages hook
  const { data, mutate } = useFetchMessages(activeRoom._id);

  useScrollToBottom(messagesEndRef, data ? [data.length] : []);

  // Handle socket updates
  useEffect(() => {
    if (activeRoom?._id) {
      socket.emit("joinRoom", activeRoom._id);
    }

    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      mutate();
    });

    return () => {
      socket.off("newMessage");
    };
  }, [activeRoom?._id, mutate]);

  // Handle message sending
  const handleSendMessage = async () => {
    if (!profile?._id || !activeRoom?._id) return;

    const formData = new FormData();
    formData.append("senderId", profile._id);
    formData.append("content", msg.trim());
    formData.append("groupId", activeRoom._id);

    if (selectedImage) {
      formData.append("attachments", selectedImage);
    }

    if (!selectedImage && !msg.trim()) {
      alert("Bạn cần nhập nội dung tin nhắn hoặc đính kèm một ảnh.");
      return;
    }

    setIsSending(true);
    try {
      const res = await messageApi.create(formData);
      if (res) {
        socket.emit("sendMessage", res.data);
        setMsg("");
        setSelectedImage(null);
        setPreviewImage(null); // Clear preview after sending
        mutate(); // Update message list
      }
    } catch (errors) {
      console.error(errors);
    } finally {
      setIsSending(false);
    }
  };

  // Handle file input change
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(null); // Remove preview when user deletes image
  };

  // Handle keydown event (send message on Enter)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isSending) {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full flex flex-col h-full relative">
      {/* Header */}
      <HeaderChat />

      {/* Chat Content */}
      <div className="flex-1 flex flex-col gap-[12px] py-4 px-4 overflow-y-auto min-h-[600px] max-h-[600px]">
        {data?.map((message, index) => {
          if (profile?._id === message?.sender?._id) {
            return <MyChat key={index} message={message} />;
          } else {
            return <MemberChat key={index} message={message} />;
          }
        })}
      </div>
      <div ref={messagesEndRef} />

      {/* Chat Input Section */}
      <div className="bg-[#F9F9F9] rounded-lg border flex items-center gap-3 sticky bottom-0 p-2">
        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <button
          className="p-1 bg-gray-300 rounded-full hover:bg-gray-400 transition-all"
          onClick={() => fileInputRef.current?.click()}
        >
          <img src={icons.image} alt="Attach" className="w-6 h-6" />
        </button>

        {/* Text Input */}
        <input
          placeholder="Nhập tin nhắn..."
          className="w-full px-4 py-2 text-sm bg-transparent rounded-lg focus:outline-none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Send Button */}
        <button
          className={`p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all ${
            isSending && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleSendMessage}
          disabled={isSending}
        >
          <IoIosSend className="text-white w-6 h-6" />
        </button>
      </div>

      {/* Preview Image */}
      {previewImage && (
        <div className="absolute bottom-[9%] left-0 right-0 bg-white p-4 rounded-lg shadow-lg flex justify-between items-center z-10">
          <img
            src={previewImage}
            alt="Preview"
            className="w-24 h-24 object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="text-red-500 p-1 bg-transparent hover:bg-red-100 rounded-full"
          >
            <IoIosClose className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ContentChat;
