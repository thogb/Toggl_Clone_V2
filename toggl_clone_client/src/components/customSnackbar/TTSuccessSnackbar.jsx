import { SnackbarContent } from "notistack";
import React, { forwardRef } from "react";
import {
  TTSnackbarBase,
  TTSnackbarMessage,
  TTSnackbarTitle,
} from "./TTSnackbarBase";

const TTSuccessSnackbar = forwardRef(({ message, ...other }, ref) => {
  return (
    <SnackbarContent ref={ref}>
      <TTSnackbarBase>
        <TTSnackbarTitle color="success.main">Success!</TTSnackbarTitle>
        <TTSnackbarMessage>{message}</TTSnackbarMessage>
      </TTSnackbarBase>
    </SnackbarContent>
  );
});

export default TTSuccessSnackbar;
