import { Box } from "@mui/material";
import React from "react";
import { APPBAR_HEIGHT } from "../../utils/constants";

const bgColor = "#FEF9F7";

const PageContainer = ({ children, ...others }) => {
  return (
    <Box
      bgcolor={bgColor}
      // minHeight={"100%"}
      height={"100%"}
      minHeight={`calc(100vh - ${APPBAR_HEIGHT}px)`}
      {...others}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
