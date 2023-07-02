import { Box } from "@mui/material";
import React from "react";

const bgColor = "#FEF9F7";

const PageContainer = ({ children, ...others }) => {
  return (
    <Box bgcolor={bgColor} height={"100vh"} overflow={"scroll"} {...others}>
      {children}
    </Box>
  );
};

export default PageContainer;
