import { AppBar, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { TTAPPBAR_HEIGHT, TTAPPBAR_TOOL_HEIGHT } from "../../utils/constants";
import { Link } from "react-router-dom";

export const TTAppbar = styled((props) => (
  <AppBar position="static" elevation={2} {...props} />
))(({ theme }) => ({
  backgroundColor: "white",
  color: theme.palette.text.primary,
}));

export const TTAppbarMain = styled("div")(({ theme }) => ({
  height: TTAPPBAR_HEIGHT,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(0, 2.5),
}));

export const TTAppbarTool = styled("div")(({ theme }) => ({
  height: TTAPPBAR_TOOL_HEIGHT,
  padding: theme.spacing(0, 2.5),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  borderTop: "1px solid",
  borderTopColor: theme.palette.divider,
}));

export const TTAppbarTitle = styled((props) => (
  <Typography variant="h6" fontSize={"1.05rem"} {...props} />
))(({ theme }) => ({}));

export const TTAppbarLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.light,
  textTransform: "capitalize",
  fontSize: "0.95rem",
  padding: "8px",

  "&:hover,&.TT-selected": {
    color: theme.palette.primary.main,
  },
}));

export const TTAppbarStart = styled((props) => (
  <Stack flexBasis={"80px"} {...props} />
))(({ theme }) => ({}));

export const TTAppbarContent = styled((props) => (
  <Stack direction={"row"} {...props} />
))(({ theme }) => ({}));

export const TTAppbarActions = styled((props) => (
  <Stack ml={"auto"} gap={1} {...props} direction={"row"} />
))(({ theme }) => ({}));

export default TTAppbar;
