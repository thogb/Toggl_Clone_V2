import styled from "@emotion/styled";
import React from "react";

const GrowingInputContainer = styled("div")(({ theme }) => ({
  position: "relative",
  // width: "fit-content",
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif;',
  fontSize: "1rem",
  // backgroundColor: "green",
  overflow: "hidden",
  // minWidth: 0,
  maxWidth: "100%",

  "&>input,&>div": {
    fontSize: "inherit",
    fontFamily: "inherit",
    letterSpacing: 0,
    lineHeight: 1,
    height: "1em",
  },

  "&>input": {
    position: "absolute",
    padding: 0,
    border: "none",
    outline: "none",
    width: "100%",
    backgroundColor: "transparent",
  },

  "&>div": {
    // position: "relative",
    // top: 0,
    // left: 0,
    visibility: "hidden",
    whiteSpace: "pre",
  },
}));

const GrowingInput = ({
  value,
  onChange,
  onInputComplete,
  placeholder,
  ...others
}) => {
  const actualPlaceholder = placeholder ?? "Input something here";

  const handleOnChange = (e) => {
    if (onChange) onChange(e);
  };

  const handleBlur = (e) => {
    if (onInputComplete) onInputComplete(e);
  };

  return (
    <GrowingInputContainer {...others}>
      <input
        placeholder={actualPlaceholder}
        value={value}
        onChange={handleOnChange}
        onBlur={handleBlur}
      />
      <div>{Boolean(value) ? value : actualPlaceholder}</div>
      {/* <div>asd&nbsp&nbsp &nbsp</div> */}
    </GrowingInputContainer>
  );
};

export default GrowingInput;
