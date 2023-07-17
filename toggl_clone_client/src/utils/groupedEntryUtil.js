import { compareDesc } from "date-fns";
import { isListEqual } from "./listUtil";
import { timeEntryUtil } from "./TimeEntryUtil";

// #example
const groupedEntryExample = {
  gId: "Wed, 21 Jun 2023 - 0", // from groupCount
  description: "desc",
  projectId: 1234123,
  tags: ["tag1", "tag2"], //sorted as string
  startDate: new Date().getTime(),
  stopDate: new Date().getTime(),
  totalDuration: 12,
  entries: [],
};

// #create
const createGroupId = (count) => {
  return `G${count}`;
};

const createFromTimeEntry = (timeEntry) => {
  const newTags = [...timeEntry.tags];
  newTags.sort();
  return {
    gId: GroupedEntrySingleton.getNextGroupId(),
    description: timeEntry.description,
    projectId: timeEntry.projectId,
    tags: newTags,
    startDate: timeEntry.startDate,
    stopDate: timeEntry.stopDate,
    totalDuration: timeEntry.duration,
    entries: [timeEntry],
  };
};

const createFromTimeEntryList = (timeEntryList) => {
  if (!Boolean(timeEntryList) || timeEntryList?.length === 0) return;
  const groupedEntry = createFromTimeEntry(timeEntryList[0]);
  if (timeEntryList.length === 1) return groupedEntry;
  groupedEntry.entries = [...timeEntryList];
  refresh(groupedEntry);
  return groupedEntry;
};

// #update
const updateTEDateInfo = (groupedEntry, id, dateInfo) => {
  const timeEntry = findTimeEntryById(groupedEntry.entries, id);
  timeEntryUtil.updateDateInfo(timeEntry, dateInfo);
  refresh(groupedEntry);
};

const updateGroupingData = (groupedEntry, groupingData) => {
  if (!groupedEntry) return;
  groupedEntry.entries.forEach((entry) => {
    updateTEWithGroupingData(entry, groupingData);
  });
  updateObjWithGroupingData(groupedEntry, groupingData);
};

const updateTEWithGroupingData = (timeEntry, groupingData) => {
  updateObjWithGroupingData(timeEntry, groupingData);
};

const updateObjWithGroupingData = (obj, groupingData) => {
  if (groupingData.description !== undefined) {
    obj.description = groupingData.description;
  }

  if (groupingData.projectId !== undefined) {
    obj.projectId = groupingData.projectId;
  }

  if (groupingData.tags) {
    const newTags = [...groupingData.tags];
    newTags.sort();
    obj.tags = newTags;
  }
};

// #add
const addTimeEntry = (groupedEntry, timeEntry) => {
  groupedEntry.entries.push(timeEntry);
  refresh(groupedEntry);
};

// #remove
const removeBatchTimeEntry = (groupedEntry, idList) => {
  const entries = groupedEntry.entries;

  if (idList.length === 0 || idList.length === entries.length) {
    groupedEntry.entries = [];
    return entries;
  }

  const delTEList = entries.filter((entry) => idList.includes(entry.id));

  groupedEntry.entries = entries.filter((entry) => !idList.includes(entry.id));
  refresh(groupedEntry);

  return delTEList;
};

// #compare
const isEqual = (groupedEntry, groupData) => {
  return isEqualByGroupingData(groupedEntry, groupData);
};

const isEqualByGroupingData = (a, b) => {
  return (
    a.description === b.description &&
    a.projectId === b.projectId &&
    isListEqual(a.tags, b.tags)
  );
};

const isEqualByExistingGroupingData = (a, groupingData) => {
  return (
    (groupingData.description === undefined ||
      a.description === groupingData.description) &&
    (groupingData.projectId === undefined ||
      a.projectId === groupingData.projectId) &&
    (groupingData.tags === undefined || isListEqual(a.tags, groupingData.tags))
  );
};

// #calc
const calcTotalDuration = (groupedEntry) => {
  if (groupedEntry.entries.length < 1) return 0;
  return groupedEntry.entries.reduce(
    (prev, current) => prev + current.duration,
    0
  );
};

// #sort
const sortEntriesByDateInfo = (groupedEntry) => {
  if (groupedEntry.entries.length < 1) return;
  groupedEntry.entries.sort((a, b) => compareDesc(a.stopDate, b.stopDate));
  sortEntriesByStartDate(groupedEntry);
};

const sortEntriesByStartDate = (groupedEntry) => {
  groupedEntry.entries.sort((a, b) => compareDesc(a.startDate, b.startDate));
};

// #find
const findMaxStopDate = (groupedEntry) => {
  if (groupedEntry.entries.length < 1) return 0;
  return groupedEntry.entries.reduce((prev, current) =>
    prev.stopDate > current.stopDate ? prev : current
  ).stopDate;
};

const findTimeEntryById = (entries, id) => {
  return entries.find((entry) => entry.id === id);
};

// #other
const refresh = (groupedEntry) => {
  if (!(groupedEntry?.entries?.length > 0)) return;
  groupedEntry.stopDate = findMaxStopDate(groupedEntry);
  groupedEntry.totalDuration = calcTotalDuration(groupedEntry);

  if (groupedEntry.entries.length > 1) {
    sortEntriesByDateInfo(groupedEntry);
  }

  groupedEntry.startDate =
    groupedEntry.entries[groupedEntry.entries.length - 1].startDate;
};

const mergeWithGroupedEntry = (groupedEntry, otherGroupedEntry) => {
  groupedEntry.entries = [
    ...groupedEntry.entries,
    ...otherGroupedEntry.entries,
  ];
  refresh(groupedEntry);
};

const getEntryData = (groupedEntry) => {
  return {
    description: groupedEntry.description,
    projectId: groupedEntry.projectId,
    tags: [...groupedEntry.tags],
  };
};

export const GroupedEntrySingleton = {
  groupCount: 0,
  getNextGroupId: () => {
    return createGroupId(GroupedEntrySingleton.groupCount++);
  },
};

export const groupedEntryUtil = {
  createFromTimeEntry,
  createFromTimeEntryList,

  updateTEDateInfo,
  updateGroupingData,
  updateTEWithGroupingData,

  addTimeEntry,

  removeBatchTimeEntry,

  findTimeEntryById,

  isEqual,
  isEqualByGroupingData,
  isEqualByExistingGroupingData,

  refresh,
  mergeWithGroupedEntry,
  getEntryData,
};
