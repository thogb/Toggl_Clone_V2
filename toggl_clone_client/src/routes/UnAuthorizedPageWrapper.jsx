import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { timerRoute } from "./Routes";

const UnAuthorizedPageWrapper = () => {
  const token = useSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to={timerRoute.path} />;
  }

  return <Outlet />;
};

export default UnAuthorizedPageWrapper;
