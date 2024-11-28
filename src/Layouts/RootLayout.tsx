import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#f1f1f1] flex flex-col gap-[12px]">
        <Header />
        <div className="bg-white h-full p-[10px] mx-[10px] rounded-[10px] shadow-md border">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
