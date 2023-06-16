import { format, isEqual, parse } from "date-fns";
import { DATE_FORMAT, REFERENCE_DATE, TIME_FORMAT } from "./constants";

export const isDateToday = (date) => {
  const today = parse(
    format(new Date(), DATE_FORMAT),
    DATE_FORMAT,
    REFERENCE_DATE
  );

  return isEqual(today, date);
};

export const formatDateMD = (date) => {
  return format(date, "MM/dd");
};

export const formatDateHMA = (date) => {
  return format(date, TIME_FORMAT);
};

export const minuteToTimeObj = (minute) => {
  const intPart = parseInt(minute);
  const floatPart = minute - intPart;
  return {
    hour: Math.floor(intPart / 60),
    minute: intPart % 60,
    second: Math.round(floatPart * 60),
  };
};

export const timeObjToMinute = (timeObj) => {
  return (
    timeObj.hour * 60 +
    timeObj.minute +
    Number((timeObj.second / 60).toFixed(2))
  );
};
