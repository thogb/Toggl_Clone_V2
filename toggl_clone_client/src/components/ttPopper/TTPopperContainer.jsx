import styled from "@emotion/styled";
import { Box, useTheme } from "@mui/material";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: "var(--TTPopper-container-padding)",
}));

const TTPopperContainer = ({ padding, children, style }) => {
  const theme = useTheme();

  const fStyle = {
    "--TTPopper-container-padding":
      padding ?? theme.spacing(theme.ttSpacings.popper.px / 2),
    display: "flex",
    flexDirection: "column",
    ...style,
  };

  return <StyledBox style={fStyle}>{children}</StyledBox>;
};

export default TTPopperContainer;
