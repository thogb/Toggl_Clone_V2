import {
  differenceInCalendarDays,
  differenceInSeconds,
  eachDayOfInterval,
  endOfWeek,
  format,
  isEqual,
  isToday,
  parse,
  setMilliseconds,
  startOfWeek,
} from "date-fns";
import { DATE_FORMAT, REFERENCE_DATE, TIME_FORMAT } from "./constants";

export const isDateToday = (date) => {
  const today = parse(
    format(Date.now(), DATE_FORMAT),
    DATE_FORMAT,
    REFERENCE_DATE
  );

  return isEqual(today, date);
};

export const formatDateMD = (date) => {
  return isToday(date) ? "Today" : format(date, "MM/dd");
};

export const formatDateHMA = (date) => {
  return format(date, TIME_FORMAT);
};

export const parseDateHMA = (str) => {
  return parse(str, TIME_FORMAT, REFERENCE_DATE);
};

export const formatDateEEddMMM = (date) => {
  return isToday(date) ? "Today" : format(date, "EEE, dd MMM");
};

export const formatDateEEddMMMyyyy = (date) => {
  return isToday(date) ? "Today" : format(date, "EEE, dd MMM yyyy");
};

export const formatDateyyyyMMdd = (date) => {
  return format(date, "yyyy-MM-dd");
};

export const getDaysBetween = (start, end) => {
  return Math.abs(differenceInCalendarDays(end, start));
  // const newStart = new Date(
  //   start.getFullYear(),
  //   start.getMonth(),
  //   start.getDate()
  // );
  // const newEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  // return Math.floor(
  //   (newEnd.getTime() - newStart.getTime()) / (24 * 60 * 60 * 1000)
  // );
};

export const getDiffInSeconds = (start, end) => {
  return Math.abs(
    differenceInSeconds(setMilliseconds(end, 0), setMilliseconds(start, 0))
  );
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

export const miliSecToTimeObj = (miliSec) => {
  // const inSecond = Math.floor(miliSec / 1000);
  // const hour = Math.floor(inSecond / 3600);
  // const secLeft = inSecond % 3600;
  // return {
  //   hour: hour,
  //   minute: Math.floor(secLeft / 60),
  //   second: secLeft % 60,
  // };
  return secondToTimeObj(Math.floor(miliSec) / 1000);
};

export const secondToTimeObj = (inSecond) => {
  const hour = Math.floor(inSecond / 3600);
  const secLeft = inSecond % 3600;
  return {
    hour: hour,
    minute: Math.floor(secLeft / 60),
    second: secLeft % 60,
  };
};

export const timeObjToMinute = (timeObj) => {
  return (
    timeObj.hour * 60 +
    timeObj.minute +
    Number((timeObj.second / 60).toFixed(2))
  );
};

export const formatSecondHMMSS = (second) => {
  const timeObj = secondToTimeObj(second);
  return `${String(timeObj.hour)}:${String(timeObj.minute).padStart(
    2,
    "0"
  )}:${String(timeObj.second).padStart(2, "0")}`;
};

export const formatMinHMMSS = (minutes) => {
  const timeObj = minuteToTimeObj(minutes);
  return `${String(timeObj.hour)}:${String(timeObj.minute).padStart(
    2,
    "0"
  )}:${String(timeObj.second).padStart(2, "0")}`;
};

export const convert12Hto24H = (hour, isAM) => {
  if (!(hour >= 1 && hour <= 12)) return null;

  if (isAM) {
    return hour === 12 ? 0 : hour;
  } else {
    return hour < 12 ? hour + 12 : hour;
  }
};

export const getDatesOfWeek = (date) => {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });
};
