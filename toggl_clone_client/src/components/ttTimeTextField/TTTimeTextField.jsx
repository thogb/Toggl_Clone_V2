import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { secondToTimeObj } from "../../utils/TTDateUtil";
import classNames from "classnames";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  width: "8ch",
  color: theme.palette.text.secondary,
  fontWeight: 500,
  cursor: "default",
  //   color: grey[600],
  "&.TTTimeTextField-small": {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
  },
  "&.TTTimeTextField-withPopOver": {
    zIndex: theme.zIndex.popper + 1,
  },
  "& > input": {
    textAlign: "center",
  },
  "& > input:focus": {
    color: theme.palette.text.primary,
  },
  "& > input::selection": {
    backgroundColor: grey[400],
  },
}));

const DEFAULT_VALUE = "0:00:00";

const TTTimeTextField = ({
  size,
  height,
  second,
  withPopOver,

  inputRef,
  className,

  onFocus,
  onBlur,
  onSecondChange,
  onEditComplete,
  ...others
}) => {
  const [value, setValue] = useState(DEFAULT_VALUE);

  useEffect(() => {
    formatSecond(second);
  }, [second]);

  const fClassName = classNames(
    "TTTimeTextField",
    size === "sm" && "TTTimeTextField-small",
    withPopOver && "TTTimeTextField-withPopOver",
    className
  );

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // From value of minute update to value in string format
  const formatSecond = (inSecond) => {
    if (Number.isFinite(inSecond)) {
      if (inSecond < 0) {
        if (onSecondChange) onSecondChange(0);
      } else if (inSecond === 0) {
        setValue(DEFAULT_VALUE);
      } else {
        const timeObj = secondToTimeObj(inSecond);
        setValue(
          `${String(timeObj.hour)}:${String(timeObj.minute).padStart(
            2,
            "0"
          )}:${String(timeObj.second).padStart(2, "0")}`
        );
      }
    } else {
      if (onSecondChange) onSecondChange(0);
    }
  };

  const handleFocus = (e) => {
    if (onFocus) onFocus(e);
    e.currentTarget.select();
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
    const contents = value.split(":").map((str) => Number(str));
    const valid = contents.every((i) => Number.isFinite(i) && i >= 0);
    let newSecond = 0;

    if (valid) {
      if (contents.length === 1) {
        newSecond = contents[0] * 60;
      } else if (contents.length >= 2) {
        newSecond += contents[0] * 3600;
        newSecond += contents[1] * 60;

        if (contents.length >= 3) {
          newSecond += contents[2];
        }
      }

      if (newSecond !== second) {
        onSecondChange(newSecond);
      }
    } else {
      newSecond = second;
    }

    formatSecond(newSecond);
    if (onEditComplete) onEditComplete(newSecond);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const style = {
    ...(height && { height: height }),
  };

  return (
    <StyledInputBase
      className={fClassName}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={style}
      inputRef={inputRef}
      {...others}
    />
  );
};

export default TTTimeTextField;
