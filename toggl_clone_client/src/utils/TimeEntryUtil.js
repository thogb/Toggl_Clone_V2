import { addSeconds } from "date-fns";

// #example
const timeEntryExample = {
  id: 3004659064,
  workspace_id: 7169665,
  projectId: 1234123,
  startDate: new Date().getTime(),
  stopDate: new Date().getTime(),
  duration: 4,
  description: "",
  tags: ["backend", "Brain_training", "C#", ".net_Core", ".net_Core_Web"],
};
// #compare
const isEqual = (timeEntry, groupData) => {};

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

export const timeEntryUtil = { updateDateInfo, cloneTimeEntry, getEntryData };
