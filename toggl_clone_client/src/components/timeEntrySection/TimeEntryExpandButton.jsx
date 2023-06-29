import styled from "@emotion/styled";
import { alpha } from "@mui/material";
import classNames from "classnames";
import React from "react";

const StyledButton = styled("button")(({ theme }) => ({
  width: "30px",
  height: "30px",
  border: "1px solid",
  borderColor: alpha(theme.palette.primary.light, 0.4),
  borderRadius: "50%",
  fontSize: "0.875rem",
  fontWeight: 600,
  color: alpha(theme.palette.primary.light, 0.8),
  overflow: "hidden",
  padding: 0,
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "start",
  textAlign: "center",

  "&:hover": {
    cursor: "pointer",
  },

  "&.TimeEntryExpandButton-open": {
    backgroundColor: alpha(theme.palette.primary.light, 0.15),

    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.light, 0.175),
    },

    "&:active": {
      backgroundColor: alpha(theme.palette.primary.light, 0.2),
    },
  },
}));

const TimeEntryExpandButton = ({
  children,
  className,
  isOpen = false,
  onClick,
  ...others
}) => {
  return (
    <StyledButton
      onClick={onClick}
      className={classNames(
        isOpen ? "TimeEntryExpandButton-open" : null,
        className
      )}
      {...others}
    >
      {children}
      {/* <div style={{ marginLeft: "0px" }}>{children}</div> */}
    </StyledButton>
  );
};

export default TimeEntryExpandButton;
