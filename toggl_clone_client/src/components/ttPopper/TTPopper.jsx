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
  ...other
}) => {
  const theme = useTheme();

  const openPopper = Boolean(anchorEl);
  //   const id = open ? "simple-popper" : undefined;

  return (
    <Box>
      <Popper
        // id={id}
        open={openPopper}
        disablePortal
        anchorEl={anchorEl}
        placement={placement ?? "bottom-start"}
        style={{ zIndex: theme.zIndex.modal + 2 }}
        {...other}
      >
        <StyledPaper
          elevation={8}
          style={{
            ...(size !== "none" ? { width: `${SIZES[size]}px` } : {}),
          }}
        >
          {children}
        </StyledPaper>
      </Popper>
      <Backdrop
        style={{ backgroundColor: "transparent" }}
        open={openPopper}
        onClick={() => onClose()}
      ></Backdrop>
    </Box>
  );
};

export default TTPopper;
