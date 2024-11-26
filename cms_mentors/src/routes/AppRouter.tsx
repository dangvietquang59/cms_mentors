import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import paths from "../utils/constants/paths";
import BlankLayout from "../layouts/BlankLayout";
import Login from "../pages/Login";
import RootLayout from "../layouts/RootLayout";
import Dashboard from "../pages/Dashboard";
import Forbidden from "../pages/Forbidden";
import NotFound from "../pages/NotFound";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect to login if accessing root */}
        <Route path="/" element={<Navigate to={paths.LOGIN} replace />} />

        {/* Public route - Login */}
        <Route
          path={paths.LOGIN}
          element={
            <BlankLayout>
              <Login />
            </BlankLayout>
          }
        />

        {/* Protected route - Only admin can access Dashboard */}
        <Route
          path={paths.DASHBOARD}
          element={
            <RootLayout>
              <Dashboard />
            </RootLayout>
          }
        />

        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
