import React, { useState, useMemo } from "react";
import { PieChartOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Layout, Menu, Popover, theme } from "antd";
import { useNavigate } from "react-router-dom";
import paths from "../utils/constants/paths";
import images from "../assets/images";
import icons from "../assets/icons";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const items: MenuItem[] = useMemo(() => {
    return [
      getItem("Dashboard", paths.DASHBOARD, <PieChartOutlined />),

      getItem("Quản lý người dùng", paths.USERS, <TeamOutlined />),
    ];
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Xử lý logout
  const logout = () => {
    localStorage.clear();
    navigate(paths.LOGIN);
  };

  const UserContent = (
    <ul className="flex flex-col gap-[12px] w-[150px]">
      <li className="text-[16px] cursor-pointer">Cá nhân</li>
      <li
        className="text-[16px] font-bold cursor-pointer text-[#718255]"
        onClick={logout}
      >
        Đăng xuất
      </li>
    </ul>
  );

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={250}
          collapsedWidth={80}
        >
          <div className="demo-logo-vertical" />
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-start"
            }  gap-[8px] p-[10px]`}
          >
            <img
              src={images.logo}
              alt="logo"
              className="w-[50px] h-[50px] rounded-[8px]"
            />
            {!collapsed && (
              <p className="text-white whitespace-nowrap"> HRM Hiyu</p>
            )}
          </div>

          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <Header
            style={{ padding: 0, background: colorBgContainer }}
            className="flex justify-end items-center"
          >
            <div className="flex items-center gap-[12px] mr-[12px]">
              <Popover content={<div>Thông báo</div>} trigger={"click"}>
                <button className="p-[8px] bg-[#E8F5DA] rounded-full">
                  <img src={icons.bell} alt="icon" />
                </button>
              </Popover>
              <Popover
                content={UserContent}
                trigger={"click"}
                open={open}
                onOpenChange={() => setOpen(true)}
              >
                <Avatar
                  src={""}
                  alt="image"
                  size={40}
                  className="cursor-pointer"
                />
              </Popover>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div className="min-h-[80vh] bg-white shadow-lg p-[20px] my-[24px] rounded-[8px]">
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default RootLayout;
