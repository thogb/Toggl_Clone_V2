import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import React from "react";

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: "0px calc(var(--TTPopper-container-padding) * -1)",
}));

const TTPopperDivider = ({ spacing }) => {
  return (
    <StyledDivider style={{ marginTop: spacing, marginBottom: spacing }} />
  );
};

export default TTPopperDivider;
