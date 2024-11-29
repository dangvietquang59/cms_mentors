import { useState } from "react";
import SearchCustom from "../SearchCustom";
import Room from "./Room";

function RoomSide() {
  const [query, setQuery] = useState<string>("");
  return (
    <div className="w-[350px] min-h-screen border-r pr-[10px] flex flex-col gap-[24px]">
      <h2 className="text-[20px] font-semibold">Phòng chat</h2>
      <SearchCustom value={query} setValue={setQuery} />
      <div className="flex flex-col gap-[8px] max-h-[500px] overflow-y-auto">
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
      </div>
    </div>
  );
}

export default RoomSide;
