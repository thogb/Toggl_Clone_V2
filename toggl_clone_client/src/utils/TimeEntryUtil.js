import { addSeconds, differenceInSeconds } from "date-fns";

// #example
// const timeEntryExample = {
//   id: 3004659064,
//   workspace_id: 7169665,
//   projectId: 1234123,
//   startDate: new Date().getTime(),
//   stopDate: new Date().getTime(),
//   duration: 4,
//   description: "",
//   tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
// };

const invalidDateInfo = {
  duration: -1,
  startDate: null,
  stopDate: null,
};

// #compare
const isEqual = (timeEntry, groupData) => {};

// #create
const createFromApiResponse = (rawTimeEntry) => {
  const startDate = new Date(rawTimeEntry.startDate).getTime();
  const stopDate = new Date(rawTimeEntry.stopDate).getTime();
  const tags = rawTimeEntry.tags.map((tag) => tag.name);
  tags.sort();
  const timeEntry = {
    id: rawTimeEntry.id,
    description: rawTimeEntry.description,
    startDate: startDate,
    stopDate: stopDate,
    duration: rawTimeEntry.duration,
    tags: tags,
    workspaceId: rawTimeEntry.workspaceId,
    projectId: rawTimeEntry.projectId,
  };
  return timeEntry;
};

// #update
const updateDateInfo = (timeEntry, dateInfo) => {
  timeEntry.duration = dateInfo.duration;
  timeEntry.startDate = dateInfo.startDate;
  timeEntry.stopDate = addSeconds(
    dateInfo.startDate,
    dateInfo.duration
  ).getTime();
};

const cloneTimeEntry = (timeEntry) => {
  return {
    ...timeEntry,
    tags: [...timeEntry.tags],
  };
};

const getEntryData = (timeEntry) => {
  return {
    description: timeEntry.description,
    projectId: timeEntry.projectId,
    tags: [...timeEntry.tags],
  };
};

const isDateInfoEqualBySeconds = (dateInfo1, dateInfo2) => {
  return (
    dateInfo1.duration === dateInfo2.duration &&
    differenceInSeconds(dateInfo1.startDate, dateInfo2.startDate) === 0 &&
    differenceInSeconds(dateInfo1.stopDate, dateInfo2.stopDate) === 0
  );
};

const getInvalidDate = () => invalidDateInfo;

const convertDateInfoToIntDateInfo = (dateInfo) => {
  return {
    ...dateInfo,
    startDate: dateInfo.startDate.getTime(),
    stopDate: dateInfo.stopDate.getTime(),
  };
};

export const timeEntryUtil = {
  createFromApiResponse,

  updateDateInfo,
  cloneTimeEntry,
  getEntryData,

  isDateInfoEqualBySeconds,
  getInvalidDate,
  convertDateInfoToIntDateInfo,
};
