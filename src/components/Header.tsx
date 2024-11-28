import { FaBell } from "react-icons/fa";
import images from "../assets/images";
import { getProfile } from "../utils/functions/getProfile";

const Header = () => {
  const profile = getProfile();
  return (
    <header className="bg-white p-4 flex items-center justify-end shadow-md border-b sticky top-0">
      <div className="flex items-center space-x-6">
        <button className="relative">
          <FaBell size={24} color="#999" />
          <span className="absolute top-[-5px] right-[-5px] text-white bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        <button className="flex items-center space-x-2">
          <img
            src={images.defaultUser}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{profile?.fullName}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
