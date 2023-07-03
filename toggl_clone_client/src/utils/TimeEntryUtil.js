import { compareDesc, differenceInMilliseconds } from "date-fns";
import { formatDateEEddMMMyyyy } from "./TTDateUtil";

export const GroupedEntrySingleton = {
  groupCount: 0,
  getNextGroupId: () => {
    return createGroupId(GroupedEntrySingleton.groupCount++);
  },
};

// #comparisions
export const isTagDescriptionEqual = (a, b) => {
  // Assumes tags are all sorted in order
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

// #others
export const createGroupId = (count) => {
  return `G${count}`;
};

export const createDateGroupId = (date) => {
  return formatDateEEddMMMyyyy(date);
};

// #utils
export const getTotalDurationOfADay = (dateGroupEntries, date) => {
  return dateGroupEntries[createDateGroupId(date)]?.totalTime ?? 0;
};

// #timeEntry
export const moveTEFromGroupedEntry = (
  groupedEntries,
  groupedEntry,
  timeEntry
) => {
  // Last item in groupedEntry so remove it
  if (groupedEntry.entries.length < 2) {
    removeGroupedEntry(groupedEntries, groupedEntry.gId);
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
    if (!isListEqual(timeEntry.tags, newTags)) {
      timeEntry.tags = newTags;
    }
  }

  // Find the new groupEntry it belongs to
  const newGroupedEntry = findGroupedEntryByTE(groupedEntries, timeEntry);
  // If same groupEntry then it means that there are no actual changes
  if (groupedEntry !== newGroupedEntry) {
    if (newGroupedEntry === undefined && groupedEntry.entries.length < 2) {
      refreshGroupedEntry(groupedEntry);
    } else {
      moveTeFromToGroupedEntry(
        groupedEntries,
        groupedEntry,
        newGroupedEntry,
        timeEntry
      );
    }
    sortGroupedEntriesByDateInfo(groupedEntries);
  }
};

export const updateTimeEntryDateInfo = (
  dateGroupedEntries,
  dateGroupId,
  gId,
  id,
  dateInfo
) => {
  const { duration, startDate, stopDate } = dateInfo;
  if (Math.abs(differenceInMilliseconds(startDate, stopDate)) < duration * 1000)
    return;
  const dateGroupEntry = dateGroupedEntries[dateGroupId];
  const groupedEntries = dateGroupEntry.groupedEntries;
  const { groupedEntry, timeEntry } = findGroupedEntryAndTimeEntry(
    groupedEntries,
    gId,
    id
  );

  const newDateGroupId = createDateGroupId(startDate);

  timeEntry.duration = duration;
  timeEntry.startDate = startDate;
  timeEntry.stopDate = stopDate;

  if (newDateGroupId === dateGroupId) {
    // This means the timEntry will remain in the same groupEntry.
    // The only thing to do now is to refresh and update the groupedEntry.
    refreshGroupedEntry(groupedEntry);
    refreshDateGroupedEntry(dateGroupedEntries, newDateGroupId);
  } else {
    // This means timeEntry will be moved into a new dateGroupedEntry.
    // First remove the timeEntry from the current groupedEntry.
    removeBatchTEFromGE(dateGroupedEntries, dateGroupId, gId, [id]);
    // Then search to see if the new dateGroupedEntry exists with newDateGroupId
    if (dateGroupedEntries[newDateGroupId] === undefined) {
      // Doesnt exist so create a new dateGroupedEntry and add to dateGroupedEntries
      dateGroupedEntries[newDateGroupId] = createNewDGEFromGE(
        createNewGroupedEntry(timeEntry),
        startDate
      );
    } else {
      // newDateGroupedEntry exists so search for the groupEntry it belongs to now
      const newDateGroupedEntry = dateGroupedEntries[newDateGroupId];
      const newGroupedEntries = newDateGroupedEntry.groupedEntries;
      const newGroupedEntry = findGroupedEntryByTE(
        newGroupedEntries,
        timeEntry
      );
      moveTEToGroupedEntry(newGroupedEntries, newGroupedEntry, timeEntry);
      refreshDateGroupedEntry(dateGroupedEntries, newDateGroupId);
    }
  }
};

export const updateAllTEGroupDateInGE = (groupedEntry, data) => {
  const name = data.name;
  const entries = groupedEntry.entries;

  if (name === "description") {
    const newDescription = data.description.trim();
    if (groupedEntry.description !== newDescription) {
      groupedEntry.description = newDescription;
      entries.forEach((timeEntry) => (timeEntry.description = newDescription));
    }
  } else if (name === "projectId") {
    const newProjectId = data.projectId;
    if (groupedEntry.projectId !== newProjectId) {
      groupedEntry.projectId = newProjectId;
      entries.forEach((timeEntry) => (timeEntry.projectId = newProjectId));
    }
  } else if (name === "tags") {
    const newTags = [...data.tags];
    newTags.sort();
    if (!isListEqual(groupedEntry.tags, newTags)) {
      groupedEntry.tags = newTags;
      entries.forEach((timeEntry) => (timeEntry.tags = [...newTags]));
    }
  }
};

// #groupedEntry
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

export const refreshGroupedEntry = (groupedEntry, sort = true) => {
  if (groupedEntry.entries.length === 1) {
    updateGroupedEntryByTE(
      groupedEntry,
      groupedEntry.entries[groupedEntry.entries.length - 1]
    );
  } else {
    if (sort) sortEntriesByDateInfo(groupedEntry.entries);
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

// #entries
export const sortEntriesByDateInfo = (entries) => {
  entries.sort((a, b) => compareDesc(a.stopDate, b.stopDate));
  sortEntriesByStartDate(entries);
};

export const sortEntriesByStartDate = (entries) => {
  entries.sort((a, b) => compareDesc(a.startDate, b.startDate));
};

// #groupedEntries
export const addNewGroupedEntry = (groupedEntries, groupedEntry) => {
  groupedEntries.push(groupedEntry);
  sortGroupedEntriesByDateInfo(groupedEntries);
};

export const removeGroupedEntry = (groupedEntries, gId) => {
  groupedEntries.splice(
    groupedEntries.findIndex((e) => e.gId === gId),
    1
  );
};
export const sortGroupedEntriesByDateInfo = (groupedEntries) => {
  groupedEntries.sort((a, b) => compareDesc(a.stopDate, b.stopDate));
  sortGroupedEntriesByStartDate(groupedEntries);
};

export const sortGroupedEntriesByStartDate = (groupedEntries) => {
  groupedEntries.sort((a, b) => compareDesc(a.startDate, b.startDate));
};

// #dateGroupEntries

// #dateGroupEntry
export const removeDateGroupedEntry = (dateGroupEntries, dateGroupId) => {
  delete dateGroupEntries[dateGroupId];
};

export const refreshDateGroupedEntry = (
  dateGroupEntries,
  dateGroupId,
  sort = true
) => {
  // Check if there are any groupedEntries left and delete if none
  const dateGroupedEntry = dateGroupEntries[dateGroupId];
  if (dateGroupedEntry.groupedEntries.length === 0) {
    delete dateGroupEntries[dateGroupId];
  } else {
    // Update the totalDuration of the dateGroupedEntry
    dateGroupEntries[dateGroupId].totalDuration =
      calcTotalDurationofDGE(dateGroupedEntry);
    if (sort) sortGroupedEntriesByDateInfo(dateGroupedEntry.groupedEntries);
  }
};

export const calcTotalDurationofDGE = (dateGroupedEntry) => {
  return dateGroupedEntry.groupedEntries.reduce(
    (prev, current) => prev + current.totalDuration,
    0
  );
};

export const createNewDGEFromGE = (groupedEntry, date) => {
  const newDateGroupedEntry = {
    dateGroupId: createDateGroupId(date),
    date: date,
    totalDuration: groupedEntry.totalDuration,
    groupedEntries: [groupedEntry],
  };
  return newDateGroupedEntry;
};

// #mix
export const removeBatchTEFromGE = (
  dateGroupedEntries,
  dateGroupId,
  gId,
  idList,
  refreshDGE = true
) => {
  if (!Boolean(idList)) return false;

  const dateGroupEntry = dateGroupedEntries[dateGroupId];
  const groupedEntries = dateGroupEntry.groupedEntries;
  const groupedEntry = findGroupedEntryByGId(groupedEntries, gId);
  // const entries = groupedEntry.entries;

  if (idList.length === 0 || idList.length === groupedEntry.entries.length) {
    if (groupedEntries.length === 1) {
      // Means this groupEntry is the last group in groupedEntries so delete
      // the dateGroupEntry
      delete dateGroupedEntries[dateGroupId];
    } else {
      // This to delete the group entry it self.
      removeGroupedEntry(groupedEntries, groupedEntry.gId);
      if (refreshDGE)
        refreshDateGroupedEntry(dateGroupedEntries, dateGroupId, false);
    }
  } else {
    if (idList.length === 1) {
      // Deleting one item from group entry
      groupedEntry.entries.splice(
        groupedEntry.entries.findIndex((e) => e.id === idList[0]),
        1
      );
    } else {
      // Deleting multiple items from group entry
      groupedEntry.entries = groupedEntry.entries.filter(
        (e) => !idList.includes(e.id)
      );
    }
    // Update the data of the group entry
    // Delete, so there is no need to sort
    refreshGroupedEntry(groupedEntry, false);
    // Sort the groupedEntries since dateInfo might have changed
    if (refreshDGE)
      refreshDateGroupedEntry(dateGroupedEntries, dateGroupId, true);
  }
};

/**
 * Extracts the ids of the timeEntries from the dateGroupEntry. The extracted
 * Array containst a Object with the following structure:
 * { gId: string, entries: Array<Integer> }
 *
 * @param {DateGroupEntry} dateGroupEntry
 *
 * @returns {Array}
 */
export const extractGroupedTEIdsFromDGE = (dateGroupedEntry) => {
  return dateGroupedEntry.groupedEntries.map((groupedEntry) => {
    return {
      gId: groupedEntry.gId,
      entries: groupedEntry.entries.map((entry) => entry.id),
    };
  });
};

export const filterGroupedTEIdsFromIdList = (groupedTEIds, idList) => {
  // Remove id from groupedTEIds where the id is not in the idList
  return groupedTEIds
    .map((groupedTEId) => {
      return {
        gId: groupedTEId.gId,
        entries: groupedTEId.entries.filter((id) => idList.includes(id)),
      };
    })
    .filter((groupedTEId) => groupedTEId.entries.length > 0);
};

export const removeBatchTEFromDGE = (
  dateGroupedEntries,
  dateGroupId,
  idList
) => {
  const dateGroupedEntry = dateGroupedEntries[dateGroupId];
  const filteredGroupedTEIds = filterGroupedTEIdsFromIdList(
    extractGroupedTEIdsFromDGE(dateGroupedEntry),
    idList
  );

  console.log(filteredGroupedTEIds);

  // Remove the entries lot of time entry ids from group entry
  filteredGroupedTEIds.forEach((groupedTEId) => {
    // Do not need to refresh until the loop is finished
    removeBatchTEFromGE(
      dateGroupedEntries,
      dateGroupId,
      groupedTEId.gId,
      groupedTEId.entries,
      false
    );
  });

  // Delete if dateGroupEntry is empty else refresh the dateGroupEntry and sort
  if (dateGroupedEntry.groupedEntries.length === 0) {
    delete dateGroupedEntries[dateGroupId];
  } else {
    refreshDateGroupedEntry(dateGroupedEntries, dateGroupId, true);
  }
};

// #find
export const findAllByIds = (dateGroupedEntries, dateGroupId, gId, id) => {
  const dateGroupEntry = dateGroupedEntries[dateGroupId];
  // const groupedEntries = dateGroupEntry.groupedEntries;
  const { groupedEntry, timeEntry } = findGroupedEntryAndTimeEntry(
    dateGroupEntry.groupedEntries,
    gId,
    id
  );

  return {
    dateGroupEntry: dateGroupEntry,
    groupedEntry: groupedEntry,
    timeEntry: timeEntry,
  };
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
