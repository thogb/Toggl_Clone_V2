import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useMemo, useState } from "react";
import {
  convert12Hto24H,
  formatDateHMA,
  parseDateHMA,
} from "../../utils/TTDateUtil";
import { isValid } from "date-fns";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  minWidth: "8ch",
  color: theme.palette.text.primary,
  fontWeight: 400,
  padding: theme.spacing(0, 1.5),
  borderRadius: "8px",
  borderColor: grey[300],
  borderWidth: "1px",
  borderStyle: "solid",
  // backgroundColor: grey[300],
  //   color: grey[600],
  // "&.TTTimeTextField-small": {
  //   fontSize: theme.typography.body1.fontSize,
  //   color: theme.palette.text.primary,
  // },
  "&.TTTimeTextField-withPopOver": {
    zIndex: theme.zIndex.modal + 1,
  },
  "& .MuiInputAdornment-root": {
    marginLeft: theme.spacing(3 / 4),
  },
  // "& > input:focus": {
  //   color: theme.palette.text.primary,
  // },
  "& > input::selection": {
    backgroundColor: grey[400],
  },
}));

const TTTimeHMTextField = ({
  size,
  date,
  onDateChange,
  selectOnFocus,
  onFocus,
  onBlur,
  withPopOver,
  endAdornment,
  ...others
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setisFocused] = useState(false);

  useEffect(() => {
    formatDate(date);
  }, [date]);

  const className = useMemo(() => {
    const classNames = [];
    if (size) {
      if (size === "sm") classNames.push("TTTimeTextField-small");
    }
    if (withPopOver) classNames.push("TTTimeTextField-withPopOver");

    return classNames.length > 0 ? classNames.join(" ") : null;
  }, [size, withPopOver]);

  const formatDate = (inDate) => {
    try {
      const newValue = formatDateHMA(inDate);
      setValue(newValue);
    } catch (e) {
      const newDate = new Date();
      onDateChange(newDate);
      // formatDate(newDate);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFocus = (e) => {
    setisFocused(true);
    if (onFocus) onFocus(e);
    if (selectOnFocus) e.currentTarget.select();
  };

  const handleBlur = (e) => {
    setisFocused(false);
    if (onBlur) onBlur(e);
    const cleanValue = value
      .toUpperCase()
      .replace(/[ ]+/g, "")
      .replace("AM", "A")
      .replace("PM", "P");

    // verified that either end with digit A or P
    if (cleanValue.length <= 0 || !/[AP0-9]$/.test(cleanValue)) {
      // formatDate(date);
      return;
    }

    let strPart = cleanValue[cleanValue.length - 1];
    let digitpart = cleanValue;

    if (strPart === "A" || strPart === "P") {
      digitpart = cleanValue.slice(0, cleanValue.length - 1);
    } else {
      strPart = "";
    }

    const splitted = digitpart.split(":");

    // verified that split produce valid length and not empty and is valid integer
    if (
      splitted.length > 2 ||
      splitted.some((v) => v === "" && !Number.isInteger(Number(v)))
    ) {
      // formatDate(date);
      return;
    }

    let hour = null;
    let minute = null;

    if (splitted.length === 1) {
      const allDigit = splitted[0];

      if (allDigit.length > 4) {
        // formatDate(date);
        return;
      } else if (allDigit.length > 2) {
        const mid = allDigit.length - 2;
        hour = Number(allDigit.slice(0, mid));
        minute = Number(allDigit.slice(mid, allDigit.length));
      } else {
        hour = Number(allDigit);
        minute = 0;
      }
    } else {
      hour = Number(splitted[0]);
      minute = Number(splitted[1]);
    }

    hour = strPart ? convert12Hto24H(hour, strPart === "A") : hour;

    if (
      !(hour !== null && hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59)
    ) {
      // formatDate(date);
      return;
    }

    date.setHours(hour);
    date.setMinutes(minute);

    const newDate = new Date(date);
    onDateChange(newDate);
    // formatDate(newDate);
  };

  const handleKeyDown = (e) => {};

  const style = {};

  if (!isFocused && !isValid(parseDateHMA(value))) {
    formatDate(date);
  }

  return (
    <StyledInputBase
      value={value}
      className={className}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={style}
      endAdornment={endAdornment}
      {...others}
    />
  );
};

export default TTTimeHMTextField;
