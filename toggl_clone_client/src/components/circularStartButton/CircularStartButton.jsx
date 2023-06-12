import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, alpha } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  position: "relative",
  minWidth: "var(--button-size)",
  width: "var(--button-size)",
  height: "var(--button-size)",
  padding: 0,
  boxSizing: "content-box",
  boxShadow: `0px 0px 0px 5px ${alpha(theme.palette.secondary.main, 0.2)}`,
  "&:hover": {
    boxShadow: `0px 0px 0px 3px ${alpha(theme.palette.secondary.main, 0.2)}`,
  },
  // "&::after": {
  //   content: '""',
  //   width: "calc(var(--button-size) + 5px)",
  //   height: "calc(var(--button-size) + 5px)",
  //   borderRadius: "50%",
  //   // border: "1px solid gray",
  //   position: "absolute",
  //   // transition: theme.transitions.create(["width", "height"]),
  // },
  // "&:hover::after": {
  //   width: "calc(var(--button-size) + 2px)",
  //   height: "calc(var(--button-size) + 2px)",
  //   // border: "1px solid var(--border-color)",
  // },
}));

const CircularStartButton = ({ size = 40, borderColor = null, ...others }) => {
  const theme = useTheme();
  const unit = "px";
  const style = {
    "--button-size": `${size}${unit}`,
    "--shadow-color": alpha(borderColor ?? theme.palette.secondary.main, 0.2),
  };

  return (
    <StyledButton
      variant="contained"
      color="secondary"
      disableRipple
      disableElevation
      disableTouchRipple
      style={style}
    >
      {others.children}
    </StyledButton>
  );
};

export default CircularStartButton;
