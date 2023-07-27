import { Paper, Typography, styled } from "@mui/material";
import React from "react";

export const TTSnackbarBase = styled((props) => (
  <Paper elevation={4} {...props} />
))(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  width: "100%",
}));

export const TTSnackbarTitle = (props) => (
  <Typography fontSize={"0.95rem"} variant="subtitle2" {...props} />
);
export const TTSnackbarMessage = styled((props) => (
  <Typography variant="body2" {...props} />
))(({ theme }) => ({
  "&:first-letter": {
    textTransform: "uppercase",
  },
}));
