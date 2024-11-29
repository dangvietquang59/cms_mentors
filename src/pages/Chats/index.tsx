import ContentChat from "../../components/Chat/ContentChat";
import RoomSide from "../../components/Chat/RoomSide";

function Chats() {
  return (
    <div className="flex gap-[12px]">
      <RoomSide />
      <ContentChat />
    </div>
  );
}

export default Chats;
