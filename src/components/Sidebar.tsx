import { NavLink } from "react-router-dom";
import images from "../assets/images";
import paths from "../utils/constants/paths";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { TiMessages } from "react-icons/ti";
import { GiTechnoHeart } from "react-icons/gi";
import { SiSubtitleedit } from "react-icons/si";

const Sidebar = () => {
  const sidebars = [
    {
      title: "Dashboard",
      icon: <AiOutlineDashboard />,
      path: paths.DASHBOARD,
    },
    {
      title: "Quản lý người dùng",
      icon: <FaUsers />,
      path: paths.USERS,
    },
    {
      title: "Quản lý bài viết",
      icon: <FiInbox />,
      path: paths.BLOGS,
    },
    {
      title: "Quản lý chức danh",
      icon: <SiSubtitleedit />,
      path: paths.JOB_TITLES,
    },
    {
      title: "Quản lý công nghệ",
      icon: <GiTechnoHeart />,
      path: paths.TECHNOLOGIES,
    },
    {
      title: "Quản lý tin nhắn",
      icon: <TiMessages />,
      path: paths.CHATS,
    },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen">
      <div className="flex items-center p-4 border-b">
        <img
          src={images.logo}
          alt="Logo"
          className="h-[50px] w-[50px] rounded-[10px]"
        />
        <h1 className="ml-2 text-lg font-semibold">Mentor systems</h1>
      </div>
      <nav className="mt-10 px-[4px] flex flex-col gap-[4px]">
        {sidebars?.map((item, index) => (
          <NavLink
            to={item?.path}
            className={({ isActive }) =>
              `p-[10px] rounded-lg flex items-center space-x-2 transition-colors duration-300 
               ${isActive ? "bg-green-600 text-white" : "hover:bg-green-700 text-gray-200"}`
            }
            key={index}
          >
            {/* Thêm Icon trước Title */}
            <span className="text-xl">{item.icon}</span>
            <span>{item?.title}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
