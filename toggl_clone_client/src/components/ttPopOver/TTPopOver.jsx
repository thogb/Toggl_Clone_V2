import { Popover } from "@mui/material";
import React from "react";

const SIZES = {
  md: 238,
  lg: 338,
};

const TTPopOver = ({
  anchorEl,
  anchorOrigin,
  onClose,
  children,
  size = "lg",
  ...others
}) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin ?? { vertical: "bottom", horizontal: "left" }}
      disableScrollLock
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
        },

        "& .MuiPaper-root": {
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          // px: 1 / 2,
          ...(size !== "none" ? { width: `${SIZES[size]}px` } : {}),
        },
      }}
      {...others}
    >
      {children}
    </Popover>
  );
};

export default TTPopOver;
