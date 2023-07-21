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

// #create
const createFromApiResponse = (rawTimeEntry) => {
  const startDate = new Date(timeEntry.startDate).getTime();
  const stopDate = new Date(timeEntry.stopDate).getTime();
  const tags = timeEntry.tags.map((tag) => tag.name);
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

export const timeEntryUtil = {
  createFromApiResponse,
  updateDateInfo,
  cloneTimeEntry,
  getEntryData,
};
