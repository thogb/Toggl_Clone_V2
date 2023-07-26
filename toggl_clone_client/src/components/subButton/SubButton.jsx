import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

const StyledButton = styled(ButtonBase)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  padding: theme.spacing(1, 1),
  fontWeight: 600,
  borderRadius: 8,
  "&:hover,&:focus,&.TTPopper-open": {
    backgroundColor: grey[300],
  },
  "&:active": {
    backgroundColor: grey[400],
  },
}));

const SubButton = ({
  to,
  children,
  noVerticalPadding,
  style,
  onClick,
  type = "button",
  ...others
}) => {
  return (
    <StyledButton
      type={type}
      component={to ? Link : null}
      to={to}
      variant="text"
      disableRipple
      disableTouchRipple
      onClick={onClick}
      style={{
        ...(noVerticalPadding && { paddingTop: 0, paddingBottom: 0 }),
        ...style,
      }}
      {...others}
    >
      {children}
    </StyledButton>
  );
};

export default SubButton;
