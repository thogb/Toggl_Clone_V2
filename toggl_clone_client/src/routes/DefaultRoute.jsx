import { Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { loginRoute, timerRoute } from "./Routes";

const DefaultRoute = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to={loginRoute.path} />;
  } else {
    return <Navigate to={timerRoute.path} />;
  }
};

export default DefaultRoute;
