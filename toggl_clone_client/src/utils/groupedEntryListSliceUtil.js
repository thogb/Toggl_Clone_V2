import { addSeconds, set, startOfWeek } from "date-fns";
import { dateGroupEntryUtil as dgeUtil } from "./dateGroupEntryUtil";
import { groupedEntryUtil as geUtil } from "./groupedEntryUtil";
import { timeEntryUtil } from "./TimeEntryUtil";

// #update
const updateTEGroupingData = (state, dateGroupId, gId, id, groupingData) => {
  const dateGroupedEntry = state.dateGroupedEntries[dateGroupId];
  dgeUtil.updateTEGroupingData(dateGroupedEntry, gId, id, groupingData);
};

const updateTEDateInfo = (state, dateGroupId, gId, id, dateInfo) => {
  const dateGroupedEntries = state.dateGroupedEntries;
  const newDateGroupId = dgeUtil.createDateGroupId(dateInfo.startDate);
  if (newDateGroupId === dateGroupId) {
    dgeUtil.updateTEDateInfo(
      dateGroupedEntries[dateGroupId],
      gId,
      id,
      dateInfo
    );
  } else {
    const dateGroupedEntry = dateGroupedEntries[dateGroupId];
    const timeEntry = dgeUtil.removeTimeEntryFromGE(dateGroupedEntry, gId, id);
    if (dateGroupedEntry.groupedEntries.length === 0) {
      delete dateGroupedEntries[dateGroupId];
    }
    timeEntryUtil.updateDateInfo(timeEntry, dateInfo);
    addTimeEntry(state, timeEntry);
  }
};

const updateGroupingDataInGE = (state, dateGroupId, gId, groupingData) => {
  const dateGroupedEntry = state.dateGroupedEntries[dateGroupId];
  dgeUtil.updateBatchTEGroupingDatainGE(dateGroupedEntry, gId, groupingData);
};

const updateBatchTEInDGE = (state, dateGroupId, idList, newTEData) => {
  const delTEList = removeBatchTimeEntryFromDGE(state, dateGroupId, idList);
  const newTags = [...newTEData.tags];
  newTags.sort();
  const newDate = new Date(newTEData.startDate);

  const newTEList = delTEList.map((te) => {
    const newStartDate = set(te.startDate, {
      year: newDate.getFullYear(),
      month: newDate.getMonth(),
      date: newDate.getDate(),
    }).getTime();
    return {
      ...te,
      description: newTEData.description,
      projectId: newTEData.projectId,
      startDate: newStartDate,
      stopDate: addSeconds(newStartDate, te.duration).getTime(),
      tags: [...newTags],
    };
  });
  const ge = geUtil.createFromTimeEntryList(newTEList);
  addGroupedEntry(state, ge);
};

// #add
const addTimeEntry = (state, timeEntry) => {
  const dateGroupedEntries = state.dateGroupedEntries;
  const dateGroupId = dgeUtil.createDateGroupId(timeEntry.startDate);
  const dateGroupedEntry = dateGroupedEntries[dateGroupId];

  if (dateGroupedEntry === undefined) {
    dateGroupedEntries[dateGroupId] = dgeUtil.createFromGroupedEntry(
      geUtil.createFromTimeEntry(timeEntry)
    );
  } else {
    dgeUtil.addTimeEntry(dateGroupedEntry, timeEntry);
  }
  // addGroupedEntry(state, geUtil.createFromTimeEntry(timeEntry));
};

const addGroupedEntry = (state, groupedEntry) => {
  const dateGroupedEntries = state.dateGroupedEntries;
  const dateGroupId = dgeUtil.createDateGroupId(groupedEntry.startDate);
  const dateGroupedEntry = dateGroupedEntries[dateGroupId];

  if (dateGroupedEntry === undefined) {
    dateGroupedEntries[dateGroupId] =
      dgeUtil.createFromGroupedEntry(groupedEntry);
  } else {
    dgeUtil.addGroupedEntry(dateGroupedEntry, groupedEntry);
  }
};

// #remove
const removeDateGroupedEntry = (state, dateGroupId) => {
  delete state.dateGroupedEntries[dateGroupId];
};

// const removeBatchTimeEntry = (state, dateGroupId, idList) => {
//   const dateGroupedEntry = state.dateGroupedEntries[dateGroupId];

//   const delTEList = dgeUtil.removeBatchTimeEntry(dateGroupedEntry, idList);

//   if (dateGroupedEntry.groupedEntries.length === 0) {
//     delete state.dateGroupedEntries[dateGroupId];
//   }
// };

const removeBatchTimeEntryFromDGE = (state, dateGroupId, idList) => {
  const dateGroupedEntry = state.dateGroupedEntries[dateGroupId];

  const delTEList = dgeUtil.removeBatchTimeEntry(dateGroupedEntry, idList);

  if (dateGroupedEntry.groupedEntries.length === 0) {
    delete state.dateGroupedEntries[dateGroupId];
  }

  return delTEList;
};

const removeBatchTimeEntryFromGE = (state, dateGroupId, gId, idList) => {
  const dateGroupedEntry = state.dateGroupedEntries[dateGroupId];
  const groupedEntry = dgeUtil.findGroupedEntryByGId(
    dateGroupedEntry.groupedEntries,
    gId
  );

  dgeUtil.removeBatchTimeEntryFromGE(dateGroupedEntry, groupedEntry, idList);

  if (dateGroupedEntry.groupedEntries.length === 0) {
    delete state.dateGroupedEntries[dateGroupId];
  }
};

// const removeTimeEntryFromGE = (state, dateGroupId, gId, id) => {
//   const dateGroupedEntry = state.dateGroupedEntries[dateGroupId];

//   dgeUtil.removeTimeEntryFromGE(dateGroupedEntry, gId, id);

//   if (dateGroupedEntry.groupedEntries.length === 0) {
//     delete state.dateGroupedEntries[dateGroupId];
//   }
// };

// #other
const getTotalDurationOfADay = (dateGroupEntries, date) => {
  return dateGroupEntries[dgeUtil.createDateGroupId(date)]?.totalDuration ?? 0;
};

const getTotalDurationOfAWeek = (dateGroupEntries, date) => {
  const startDate = startOfWeek(date, { weekStartsOn: 1 });
  let totalDuration = 0;
  for (let i = 0; i < 7; i++) {
    totalDuration += getTotalDurationOfADay(dateGroupEntries, startDate);
    startDate.setDate(startDate.getDate() + 1);
  }

  return totalDuration;
};

export const groupedEntryListSliceUtil = {
  addTimeEntry,

  updateTEGroupingData,
  updateTEDateInfo,
  updateGroupingDataInGE,
  updateBatchTEInDGE,

  removeDateGroupedEntry,
  //   removeTimeEntryFromGE,
  removeBatchTimeEntryFromGE,
  removeBatchTimeEntryFromDGE,

  getTotalDurationOfADay,
  getTotalDurationOfAWeek,
};
