import { compareDesc } from "date-fns";
import { formatDateEEddMMMyyyy } from "./TTDateUtil";

export const GroupedEntrySingleton = {
  groupCount: 0,
  getNextGroupId: () => {
    return createGroupId(GroupedEntrySingleton.groupCount++);
  },
};

// Assumes tags are all sorted in order
export const isTagDescriptionEqual = (a, b) => {
  return a.description === b.description && isListEqual(a.tags, b.tags);
};

export const isGroupEntryEqual = (a, b) => {
  return isTagDescriptionEqual(a, b) && a.projectId === b.projectId;
};

// From: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
export const isListEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export const createGroupId = (count) => {
  return `G${count}`;
};

export const createDateGroupId = (date) => {
  return formatDateEEddMMMyyyy(date);
};

export const getTotalDurationOfADay = (dateGroupEntries, date) => {
  return dateGroupEntries[createDateGroupId(date)]?.totalTime ?? 0;
};

export const findGroupedEntryByGId = (groupedEntries, gId) => {
  return groupedEntries.find((groupedEntry) => groupedEntry.gId === gId);
};

export const findTimeEntry = (timeEntries, id) => {
  return timeEntries.find((timeEntry) => timeEntry.id === id);
};

export const findGroupedEntryAndTimeEntry = (groupedEntries, gId, id) => {
  const groupedEntry = findGroupedEntryByGId(groupedEntries, gId);
  return {
    groupedEntry: groupedEntry,
    timeEntry: findTimeEntry(groupedEntry.entries, id),
  };
};

export const findGroupedEntryByTE = (groupedEntries, timeEntry) => {
  return groupedEntries.find((groupedEntry) =>
    isGroupEntryEqual(groupedEntry, timeEntry)
  );
};

export const moveTEFromGroupedEntry = (
  groupedEntries,
  groupedEntry,
  timeEntry
) => {
  // Last item in groupedEntry so remove it
  if (groupedEntry.entries.length < 2) {
    removeGroupedEntry(groupedEntries, groupedEntry);
  } else {
    // Remove timeEntry from groupedEntry
    groupedEntry.entries.splice(
      groupedEntry.entries.findIndex((e) => e.id === timeEntry.id),
      1
    );
    // Update groupedEntry's totalDuration
    groupedEntry.totalDuration -= timeEntry.duration;
    // Update the startDate
    groupedEntry.startDate =
      groupedEntry.entries[groupedEntry.entries.length - 1].startDate;
    // Update the stopDate if stopDate is equal to timeEntry.stopDate
    if (groupedEntry.stopDate === timeEntry.stopDate) {
      groupedEntry.stopDate = findMaxStopDateInGroupedEntry(groupedEntry);
    }
  }
};

export const moveTEToGroupedEntry = (
  groupedEntries,
  groupedEntry,
  timeEntry
) => {
  // Create new groupedEntry if it doesn't exist
  if (groupedEntry === undefined) {
    groupedEntry = createNewGroupedEntry(timeEntry);
    addNewGroupedEntry(groupedEntries, groupedEntry);
  } else {
    // Add timeEntry to groupedEntry
    groupedEntry.entries.push(timeEntry);
    // Update groupedEntry's totalDuration
    groupedEntry.totalDuration += timeEntry.duration;
    // Sort groupedEntry entries
    sortEntriesByStartDate(groupedEntry.entries);
    // Update the startDate
    groupedEntry.startDate =
      groupedEntry.entries[groupedEntry.entries.length - 1].startDate;
    // Update the stopDate
    groupedEntry.stopDate = findMaxStopDateInGroupedEntry(groupedEntry);
  }

  return groupedEntry;
};

export const moveTeFromToGroupedEntry = (
  groupedEntries,
  fromGroupedEntry,
  toGroupedEntry,
  timeEntry
) => {
  moveTEFromGroupedEntry(groupedEntries, fromGroupedEntry, timeEntry);
  moveTEToGroupedEntry(groupedEntries, toGroupedEntry, timeEntry);
};

export const checkedMoveTeFromToGroupedEntry = (
  groupedEntries,
  fromGroupedEntry,
  toGroupedEntry,
  timeEntry
) => {
  if (toGroupedEntry === undefined && fromGroupedEntry.entries.length < 2) {
  } else {
    moveTeFromToGroupedEntry(
      groupedEntries,
      fromGroupedEntry,
      toGroupedEntry,
      timeEntry
    );
  }
};

export const refreshGroupedEntryData = (groupedEntry) => {
  if (groupedEntry.entries.length === 1) {
    updateGroupedEntryByTE(
      groupedEntry,
      groupedEntry.entries[groupedEntry.entries.length - 1]
    );
  } else {
    sortEntriesByDateInfo(groupedEntry.entries);
    updateGroupedEntryByTE(
      groupedEntry,
      groupedEntry.entries[groupedEntry.entries.length - 1]
    );
    groupedEntry.stopDate = findMaxStopDateInGroupedEntry(groupedEntry);
    groupedEntry.totalDuration = calcTotalDurationofGroupedEntry(groupedEntry);
  }
};
export const updateGroupedEntryByTE = (groupedEntry, timeEntry) => {
  groupedEntry.description = timeEntry.description;
  groupedEntry.projectId = timeEntry.projectId;
  groupedEntry.tags = [...timeEntry.tags];
  groupedEntry.startDate = timeEntry.startDate;
  groupedEntry.stopDate = timeEntry.stopDate;
  groupedEntry.totalDuration = timeEntry.duration;
};

export const updateTEGroupData = (
  dateGroupedEntries,
  dateGroupId,
  gId,
  id,
  data
) => {
  const dateGroupEntry = dateGroupedEntries[dateGroupId];
  const groupedEntries = dateGroupEntry.groupedEntries;
  const { groupedEntry, timeEntry } = findGroupedEntryAndTimeEntry(
    groupedEntries,
    gId,
    id
  );
  const name = data.name;

  // Update the corresponding data
  if (name === "description") {
    timeEntry.description = data.description.trim();
  } else if (name === "projectId") {
    timeEntry.projectId = data.projectId;
  } else if (name === "tags") {
    const newTags = [...data.tags];
    newTags.sort();
    timeEntry.tags = newTags;
  }

  // Find the new groupEntry it belongs to
  const newGroupedEntry = findGroupedEntryByTE(groupedEntries, timeEntry);
  if (newGroupedEntry === undefined && groupedEntry.entries.length < 2) {
    refreshGroupedEntryData(groupedEntry);
  } else {
    moveTeFromToGroupedEntry(
      groupedEntries,
      groupedEntry,
      newGroupedEntry,
      timeEntry
    );
  }
  sortGroupedEntriesByDateInfo(groupedEntries);
};

export const createNewGroupedEntry = (timeEntry) => {
  return {
    gId: GroupedEntrySingleton.getNextGroupId(),
    description: timeEntry.description,
    projectId: timeEntry.projectId,
    tags: [...timeEntry.tags],
    startDate: timeEntry.startDate,
    stopDate: timeEntry.stopDate,
    totalDuration: timeEntry.duration,
    entries: [timeEntry],
  };
};

export const findMaxStopDateInGroupedEntry = (groupedEntry) => {
  return groupedEntry.entries.reduce((prev, current) =>
    prev.stopDate > current.stopDate ? prev : current
  ).stopDate;
};

export const calcTotalDurationofGroupedEntry = (groupedEntry) => {
  return groupedEntry.entries.reduce(
    (prev, current) => prev + current.duration,
    0
  );
};

// entries
export const sortEntriesByDateInfo = (entries) => {
  entries.sort((a, b) => compareDesc(a.stopDate, b.stopDate));
  sortEntriesByStartDate(entries);
};

export const sortEntriesByStartDate = (entries) => {
  entries.sort((a, b) => compareDesc(a.startDate, b.startDate));
};

// groupedEntries
export const removeGroupedEntry = (groupedEntries, groupedEntry) => {
  groupedEntries.splice(
    groupedEntries.findIndex((e) => e.gId === groupedEntry.gId),
    1
  );
};

export const addNewGroupedEntry = (groupedEntries, groupedEntry) => {
  groupedEntries.push(groupedEntry);
  sortGroupedEntriesByDateInfo(groupedEntries);
};

export const sortGroupedEntriesByDateInfo = (groupedEntries) => {
  groupedEntries.sort((a, b) => compareDesc(a.stopDate, b.stopDate));
  sortGroupedEntriesByStartDate(groupedEntries);
};

export const sortGroupedEntriesByStartDate = (groupedEntries) => {
  groupedEntries.sort((a, b) => compareDesc(a.startDate, b.startDate));
};
