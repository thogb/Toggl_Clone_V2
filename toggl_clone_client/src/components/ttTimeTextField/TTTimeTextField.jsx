import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useMemo, useState } from "react";
import { minuteToTimeObj } from "../../utils/TTDateUtil";

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
    zIndex: theme.zIndex.modal + 1,
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
  withPopOver,
  minute,
  height,
  onFocus,
  onBlur,
  onMinuteChange,
  ...others
}) => {
  const [value, setValue] = useState(DEFAULT_VALUE);

  useEffect(() => {
    formatMinute(minute);
  }, []);

  const className = useMemo(() => {
    const classNames = [];
    if (size) {
      if (size === "sm") classNames.push("TTTimeTextField-small");
    }
    if (withPopOver) classNames.push("TTTimeTextField-withPopOver");

    return classNames.length > 0 ? classNames.join(" ") : null;
  }, [size, withPopOver]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  console.log(minute);
  // From value of minute update to value in string format
  const formatMinute = (inMinute) => {
    if (Number.isFinite(inMinute)) {
      if (inMinute < 0) {
        onMinuteChange(0);
        // formatMinute(0);
      } else if (inMinute === 0) {
        setValue(DEFAULT_VALUE);
      } else {
        const timeObj = minuteToTimeObj(inMinute);
        setValue(
          `${String(timeObj.hour)}:${String(timeObj.minute).padStart(
            2,
            "0"
          )}:${String(timeObj.second).padStart(2, "0")}`
        );
      }
    } else {
      onMinuteChange(0);
      //   formatMinute(0);
    }
  };

  const handleFocus = (e) => {
    if (onFocus) onFocus(e);
    e.currentTarget.select();

    // console.log("on focus textfield + ");
    // console.log(e.relatedTarget);
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
    const contents = value.split(":").map((str) => Number(str));
    const valid = contents.every((i) => Number.isFinite(i) && i >= 0);
    let newMinutes = 0;

    if (valid) {
      if (contents.length === 1) {
        newMinutes = contents[0];
      } else if (contents.length >= 2) {
        newMinutes += contents[0] * 60;
        newMinutes += contents[1];

        if (contents.length >= 3) {
          newMinutes += contents[2] / 60;
        }
      }

      if (newMinutes !== minute) {
        onMinuteChange(newMinutes);
      }
    } else {
      newMinutes = minute;
    }

    formatMinute(newMinutes);
    console.log("onblur = " + newMinutes);
    // console.log(e);
    // console.log(e.currentTarget);
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
      className={className}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={style}
      {...others}
    />
  );
};

export default TTTimeTextField;
