import { Route, Routes } from "react-router-dom";
import Notfound from "../pages/Notfound";
import RootLayout from "../Layouts/RootLayout";
import Login from "../pages/Login";
import paths from "../utils/constants/paths";
import Users from "../pages/Users";
import Blogs from "../pages/Blogs";
import Chats from "../pages/Chats";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="*" element={<Notfound />} />
        <Route path={paths.USERS} element={<Users />} />
        <Route path={paths.BLOGS} element={<Blogs />} />
        <Route path={paths.CHATS} element={<Chats />} />
      </Route>
      <Route path={paths.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
