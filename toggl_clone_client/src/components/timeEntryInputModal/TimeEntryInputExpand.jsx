import styled from "@emotion/styled";
import { Typography, alpha } from "@mui/material";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classnames";

const StyledButon = styled("button")(({ theme }) => ({
  height: "100%",
  minHeight: "40px",
  width: "100%",
  minWidth: "60px",
  borderRadius: theme.shape.borderRadius,
  border: "none",
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(0, 1.5),

  "& svg": {
    color: alpha(theme.palette.primary.light, 0.7),
    fontSize: "1rem",
  },
}));

const TimeEntryInputExpand = ({
  placeholder,
  text,
  expanded = false,
  onClick,
  children,
  className,
  ...others
}) => {
  const fClassName = classNames(
    "TimeEntryInputExpand",
    expanded && "Mui-expanded",
    className
  );

  return (
    <StyledButon className={fClassName} onClick={onClick} {...others}>
      <Typography
        variant="body2"
        noWrap
        color={!Boolean(text) && "text.placeholder"}
      >
        {Boolean(text) ? text : placeholder}
      </Typography>
      {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </StyledButon>
  );
};

export default TimeEntryInputExpand;
