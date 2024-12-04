/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import SearchCustom from "../SearchCustom";
import Room from "./Room";
import { useFetchChatRoom } from "../../apis/swr/useFetchChatRoom";
import { getProfile } from "../../utils/functions/getProfile";

function RoomSide() {
  const [query, setQuery] = useState<string>("");
  const profile = getProfile();

  if (!profile) {
    return <div>Loading...</div>;
  }

  const { data, error, isLoading } = useFetchChatRoom(profile?._id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading rooms</div>;
  }

  return (
    <div className="w-[350px] min-h-screen border-r pr-[10px] flex flex-col gap-[24px]">
      <h2 className="text-[20px] font-semibold">Phòng chat</h2>
      <SearchCustom value={query} setValue={setQuery} />
      <div className="flex flex-col gap-[8px] max-h-[500px] overflow-y-auto">
        {data && data.length > 0 ? (
          data.map((room, index) => <Room room={room} key={index} />)
        ) : (
          <p>Chưa có phòng chat</p>
        )}
      </div>
    </div>
  );
}

export default RoomSide;
