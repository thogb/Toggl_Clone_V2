import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { ROUTES } from "./Routes";

const AuthorizedPageWrapper = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
};

export default AuthorizedPageWrapper;
