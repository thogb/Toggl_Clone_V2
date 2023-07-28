import { Close } from "@mui/icons-material";
import { Dialog, Grow, styled } from "@mui/material";
import React from "react";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  // Paper
  "& .MuiDialog-paper": {
    padding: theme.spacing(2),
    width: "var(--tt-dialog-width)",
    overflow: "visible",

    // DialogTitle
    "& .MuiDialogTitle-root": {
      padding: 0,
      paddingBottom: theme.spacing(1),
      fontSize: theme.typography.body2.fontSize,
      lineHeight: theme.typography.body2.lineHeight,
    },

    // DialogContent
    "& .MuiDialogContent-root": {
      padding: 0,
      //   marginBottom: theme.spacing(8),
      overflow: "visible",
    },

    // DialogActions
    "& .MuiDialogActions-root": {
      padding: 0,
      justifyContent: "start",
    },

    "& .TimeEntryInputModal-close": {
      cursor: "pointer",
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      padding: theme.spacing(1 / 2),
    },
  },
}));

const TTDialog = ({ width, open, onClose, style, children, ...others }) => {
  const fStyle = {
    "--tt-dialog-width": width ?? "360px",
    ...style,
  };

  return (
    <StyledDialog
      transitionDuration={300}
      TransitionComponent={Grow}
      TransitionProps={{ easing: "cubic-bezier(0, 0, 0.2, 1)" }}
      open={open}
      onClose={onClose}
      style={fStyle}
      {...others}
    >
      {children}
      <Close className="TimeEntryInputModal-close" onClick={onClose} />
    </StyledDialog>
  );
};

export default TTDialog;
