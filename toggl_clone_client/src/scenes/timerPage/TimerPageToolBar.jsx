import { useTheme } from "@emotion/react";
import { Stack } from "@mui/material";
import React from "react";
import ViewTypeSelector from "./ViewTypeSelector";

const TimerPageToolBar = ({ children, ...others }) => {
  const theme = useTheme();
  return (
    <Stack
      px={theme.ttSpacings.page.px}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"end"}
    >
      {children}
      <ViewTypeSelector />
    </Stack>
  );
};

export default TimerPageToolBar;
