import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SIDE_MENU_ITEM_LEN = 47;
const SIDE_MENU_ITEM_HEIGHT = 52;

const SideMenuItem = styled("div")(({ theme }) => ({
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  padding: `${theme.spacing()} 0px`,
  minHeight: `${SIDE_MENU_ITEM_HEIGHT}px`,
  minWidth: `${SIDE_MENU_ITEM_LEN}px`,
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "& a": {
    lineHeight: 0,
  },
  "& MuiSvgIcon-root": {
    fontSize: "1rem",
  },
}));

const SideNavBarButton = ({ to = null, onClick, ...other }) => {
  return (
    <SideMenuItem>
      {!to ? (
        <ButtonBase disableRipple disableTouchRipple onClick={onClick}>
          {other.children}
        </ButtonBase>
      ) : (
        <Link to={to}>{other.children}</Link>
      )}
    </SideMenuItem>
  );
};

export default SideNavBarButton;
