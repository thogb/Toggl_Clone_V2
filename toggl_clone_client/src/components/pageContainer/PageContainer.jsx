import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { APPBAR_HEIGHT } from "../../utils/constants";
import { NAVBAR_BREAKPOINT } from "../../scenes/dashBoard/DashBoard";

const bgColor = "#FEF9F7";

const PageContainer = ({ children, ...others }) => {
  const theme = useTheme();
  const navbarBreak = useMediaQuery(theme.breakpoints.down(NAVBAR_BREAKPOINT));

  return (
    <Box
      bgcolor={bgColor}
      // minHeight={"100%"}
      height={"100%"}
      minHeight={navbarBreak ? `calc(100vh - ${APPBAR_HEIGHT}px)` : "100vh"}
      {...others}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
