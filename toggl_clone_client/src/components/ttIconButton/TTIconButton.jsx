import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  padding: theme.spacing(1),
  "&>svg": {
    fontSize: theme.typography.h6.fontSize,
    color: "var(--color)",
  },
  "&:hover > svg": {
    color: "var(--color-hover)",
  },
  "&:focus > svg": {
    color: "var(--color-focus)",
  },
  "&:disabled > svg": {
    color: "var(--color-disabled)",
  },
}));

const TTIconButton = ({
  onClick,
  children,
  color,
  colorHover,
  colorFocus,
  colorDisabled,
  padding,
  ...other
}) => {
  const style = {
    "--color": color ?? grey[800],
    "--color-hover": colorHover ?? grey[900],
    "--color-focus": colorFocus ?? "",
    "--color-disabled": colorDisabled ?? color ?? grey[400],
    padding,
  };

  return (
    <StyledButton
      disableElevation
      disableRipple
      disableTouchRipple
      disableFocusRipple
      style={style}
      onClick={onClick}
      {...other}
    >
      {children}
    </StyledButton>
  );
};

export default TTIconButton;
