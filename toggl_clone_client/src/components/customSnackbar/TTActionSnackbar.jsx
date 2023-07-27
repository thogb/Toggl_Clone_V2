import { SnackbarContent } from "notistack";
import React, { forwardRef } from "react";

const TTActionSnackbar = forwardRef(({ message, ...other }, ref) => {
  return <SnackbarContent ref={ref}></SnackbarContent>;
});

export default TTActionSnackbar;
