import styled from "@emotion/styled";
import { Button } from "@mui/material";
import classNames from "classnames";
import React from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  // justifyContent: "space-between",
  justifyContent: "start",
  color: theme.palette.primary.light,
  ...theme.typography.subtitle2,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.TT-Selected": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const TTPopperButton = ({ children, size = "small", selected, ...others }) => {
  const fClassName = classNames("TT-PopperButton", selected && "TT-Selected");

  return (
    <StyledButton
      className={fClassName}
      size={size}
      fullWidth
      variant="contained"
      {...others}
    >
      {children}
    </StyledButton>
  );
};

export default TTPopperButton;
