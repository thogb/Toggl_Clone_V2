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
  transition: theme.transitions.create("box-shadow", { duration: 100 }),
  boxShadow: `0px 0px 0px var(--shadow-size) var(--shadow-color)`,
  "&:hover": {
    boxShadow: `0px 0px 0px var(--shadow-hover-size) var(--shadow-hover-color)`,
  },
  "&:focus": {
    boxShadow: `0px 0px 0px var(--shadow-focus-size) var(--shadow-focus-color)`,
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

const CircularStartButton = ({
  size = "40px",
  shadow,
  shadowHover,
  shadowFocus,
  onClick,
  children,
  bgColor = "secondary",
  disabled = false,
  style,
  ...others
}) => {
  const theme = useTheme();
  shadow = {
    ...{
      size: "5px",
      color: theme.palette.secondary.main,
      opacity: 0.2,
    },
    ...shadow,
  };
  shadowHover = {
    ...{
      size: "5px",
      color: theme.palette.secondary.main,
      opacity: 0.2,
    },
    ...shadowHover,
  };
  shadowFocus = {
    ...{
      size: "5px",
      color: theme.palette.secondary.main,
      opacity: 0.2,
    },
    ...shadowFocus,
  };
  const finalStyle = {
    "--button-size": size,
    "--shadow-color": alpha(shadow.color, shadow.opacity),
    "--shadow-size": shadow.size,
    "--shadow-hover-color": alpha(shadowHover.color, shadowHover.opacity),
    "--shadow-hover-size": shadowHover.size,
    "--shadow-focus-color": alpha(shadowFocus.color, shadowFocus.opacity),
    "--shadow-focus-size": shadowFocus.size,
    ...style,
  };

  return (
    <StyledButton
      variant="contained"
      color={bgColor}
      disableRipple
      disableElevation
      disableTouchRipple
      style={finalStyle}
      onClick={onClick}
      {...others}
    >
      {children}
    </StyledButton>
  );
};

export default CircularStartButton;
