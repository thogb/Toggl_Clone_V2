import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingPage = () => {
  return (
    <Box
      display={"flex"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
