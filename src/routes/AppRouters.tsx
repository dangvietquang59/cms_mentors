import { Navigate, Route, Routes } from "react-router-dom";
import Notfound from "../pages/Notfound";
import RootLayout from "../Layouts/RootLayout";
import Login from "../pages/Login";
import paths from "../utils/constants/paths";
import Users from "../pages/Users";
import Blogs from "../pages/Blogs";
import Chats from "../pages/Chats";
import JobTitle from "../pages/Jobtitle";
import Technologies from "../pages/Technologies";
import Dashboard from "../pages/Dashboard";
import CategoryBlog from "../pages/CategoryBlog";
import { useEffect } from "react";
import { getAccessToken } from "../utils/functions/getAccessToken";

const AppRoutes = () => {
  const token = getAccessToken();
  useEffect(() => {
    if (!token) {
      <Navigate to={paths.LOGIN} />;
    }
  });
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to={paths.LOGIN} replace />} />
        <Route path="*" element={<Notfound />} />
        <Route path={paths.USERS} element={<Users />} />
        <Route path={paths.DASHBOARD} element={<Dashboard />} />
        <Route path={paths.CATEGORY_BLOG} element={<CategoryBlog />} />
        <Route path={paths.BLOGS} element={<Blogs />} />
        <Route path={paths.CHATS} element={<Chats />} />
        <Route path={paths.JOB_TITLES} element={<JobTitle />} />
        <Route path={paths.TECHNOLOGIES} element={<Technologies />} />
      </Route>
      <Route path={paths.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
