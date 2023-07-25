import { Stack } from "@mui/material";
import React from "react";

const StackBetween = ({ children, my, style, ...others }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      // my={my ?? 1.5}
      // my={my}
      {...others}
    >
      {children}
    </Stack>
  );
};

export default StackBetween;
