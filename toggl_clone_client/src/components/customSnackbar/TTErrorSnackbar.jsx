import React, { forwardRef } from "react";
import {
  TTSnackbarBase,
  TTSnackbarMessage,
  TTSnackbarTitle,
} from "./TTSnackbarBase";
import { SnackbarContent } from "notistack";

const TTErrorSnackbar = forwardRef(({ message, ...other }, ref) => {
  return (
    <SnackbarContent ref={ref}>
      <TTSnackbarBase>
        <TTSnackbarTitle color="error.main">Error!</TTSnackbarTitle>
        <TTSnackbarMessage>{message}</TTSnackbarMessage>
      </TTSnackbarBase>
    </SnackbarContent>
  );
});

export default TTErrorSnackbar;
