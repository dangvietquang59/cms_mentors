import { FaBell } from "react-icons/fa";
import images from "../assets/images";
import { getProfile } from "../utils/functions/getProfile";
import { Popover } from "antd";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const profile = getProfile();
  const handleLogout = () => {
    localStorage.clear();
  };
  const content = (
    <div className="w-[200px]">
      <button className="hover:bg-[#eee] w-full duration-300 p-[8px] rounded-[10px] flex items-center justify-start gap-[12px]">
        <CgProfile />
        <p>Thông tin tài khoản</p>
      </button>
      <button
        className="hover:bg-[#eee] w-full duration-300 p-[8px] rounded-[10px] flex items-center justify-start gap-[12px]"
        onClick={handleLogout}
      >
        <CiLogout />
        <p>Đăng xuất</p>
      </button>
    </div>
  );
  return (
    <header className="bg-white p-4 flex items-center justify-end shadow-md border-b sticky top-0 z-50">
      <div className="flex items-center space-x-6">
        <button className="relative">
          <FaBell size={24} color="#999" />
          <span className="absolute top-[-5px] right-[-5px] text-white bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        <Popover content={content} trigger={"click"}>
          <button className="flex items-center space-x-2">
            <img
              src={images.defaultUser}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{profile?.fullName}</span>
          </button>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
