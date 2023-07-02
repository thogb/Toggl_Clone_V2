import styled from "@emotion/styled";
import { Button, alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import classNames from "classnames";
import React from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  borderRadius: "8px",
  padding: theme.spacing(0.75),
  fontSize: "1.1rem",
  "&>svg": {
    fontSize: "inherit",
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
  "&.TT-open": {
    backgroundColor: theme.palette.action.focus,
  },
  "&.TT-selected": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.2),
    "&>svg": {
      color: theme.palette.secondary.main,
    },

    "&:hover": {
      backgroundColor: alpha(theme.palette.secondary.main, 0.4),
    },
  },

  "&.TTPopper-open": {
    "&>svg": {
      color: theme.palette.secondary.main,
    },
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
  selected = false,
  className,
  style,
  open = false,
  colorStrength = 6,
  ...other
}) => {
  const enchanedStyle = {
    "--color": color ?? grey[Math.min((1 + colorStrength) * 100)],
    "--color-hover":
      colorHover ?? grey[Math.min((3 + colorStrength) * 100, 900)],
    "--color-focus": colorFocus ?? "",
    "--color-disabled": colorDisabled ?? color ?? grey[400],
    padding,
    ...style,
  };

  const fClassName = classNames(
    selected && "TT-selected",
    open && "TT-open",
    className
  );

  return (
    <StyledButton
      disableElevation
      disableRipple
      disableTouchRipple
      disableFocusRipple
      onClick={onClick}
      // className={selected ? classNames("TT-selected", className) : className}
      className={fClassName}
      style={enchanedStyle}
      {...other}
    >
      {children}
    </StyledButton>
  );
};

export default TTIconButton;
