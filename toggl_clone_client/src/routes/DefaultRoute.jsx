import { Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { ROUTES } from "./Routes";

const DefaultRoute = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to={ROUTES.SIGNUP} />;
  } else {
    return <Navigate to={ROUTES.TIMER} />;
  }
};

export default DefaultRoute;
