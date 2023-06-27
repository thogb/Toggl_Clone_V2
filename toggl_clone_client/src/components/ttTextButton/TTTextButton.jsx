import styled from "@emotion/styled";
import classNames from "classnames";
import React from "react";

const StyledButton = styled("button")(({ theme }) => ({
  border: "none",
  margin: 0,
  padding: 0,
  backgroundColor: "transparent",
  fontSize: "0.9rem",
  fontWeight: 500,
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',

  "&:enabled:hover": {
    cursor: "pointer",
  },

  "&::first-letter": {
    textTransform: "uppercase",
  },
}));

const TTTextButton = ({ text, onClick, className, ...others }) => {
  return (
    <StyledButton
      className={classNames("TTTextButton", className)}
      onClick={onClick}
      {...others}
    >
      {text}
    </StyledButton>
  );
};

export default TTTextButton;
