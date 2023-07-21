import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(({ theme }) => ({
  justifyContent: "space-between",
  color: theme.palette.primary.light,
  ...theme.typography.subtitle2,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TTPopperButton = ({ children, ...others }) => {
  return (
    <StyledButton size="small" fullWidth variant="contained" {...others}>
      {children}
    </StyledButton>
  );
};

export default TTPopperButton;
