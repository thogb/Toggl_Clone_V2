import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: "var(--TTPopper-container-padding)",
}));

const TTPopperContainer = ({ padding, children }) => {
  const style = {
    "--TTPopper-container-padding": padding ?? "16px",
    display: "flex",
    flexDirection: "column",
  };

  return <StyledBox style={style}>{children}</StyledBox>;
};

export default TTPopperContainer;
