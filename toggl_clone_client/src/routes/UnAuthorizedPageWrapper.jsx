import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./Routes";

const UnAuthorizedPageWrapper = () => {
  const token = useSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to={ROUTES.TIMER} />;
  }

  return <Outlet />;
};

export default UnAuthorizedPageWrapper;
