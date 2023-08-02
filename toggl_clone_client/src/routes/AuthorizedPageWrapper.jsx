import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { loginRoute } from "./Routes";

const AuthorizedPageWrapper = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to={loginRoute.path} />;
  }

  return <Outlet />;
};

export default AuthorizedPageWrapper;
