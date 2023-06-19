import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Backdrop, Box, Paper, Popper } from "@mui/material";
import React from "react";

const SIZES = {
  md: 238,
  lg: 338,
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  // px: 1 / 2,
}));

const TTPopper = ({
  anchorEl,
  onClose,
  placement,
  size = "lg",
  children,
  style,
  gap,
  offset,
  ...other
}) => {
  const theme = useTheme();

  const openPopper = Boolean(anchorEl);
  //   const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Popper
        // id={id}
        open={openPopper}
        // disablePortal
        anchorEl={anchorEl}
        placement={placement ?? "bottom-start"}
        modifiers={[
          offset ? { name: "offset", options: { offset: offset } } : {},
        ]}
        style={{
          zIndex: theme.zIndex.modal + 2,
          ...style,
        }}
        {...other}
      >
        <StyledPaper
          elevation={8}
          style={{
            margin: gap,
            ...(size !== "none" ? { width: `${SIZES[size]}px` } : {}),
          }}
        >
          {children}
        </StyledPaper>
      </Popper>
      <Backdrop
        style={{ backgroundColor: "transparent", zIndex: theme.zIndex.modal }}
        open={openPopper}
        onClick={() => onClose()}
      ></Backdrop>
    </>
  );
};

export default TTPopper;
