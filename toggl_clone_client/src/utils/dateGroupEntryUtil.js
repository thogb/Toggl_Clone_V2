import { compareDesc } from "date-fns";
import { formatDateEEddMMMyyyy } from "./TTDateUtil";
import {
  GroupedEntrySingleton,
  groupedEntryUtil as geUtil,
  groupedEntryUtil,
} from "./groupedEntryUtil";
import { timeEntryUtil } from "./TimeEntryUtil";

// #example
const DateGroupedEntryExample = {
  dateGroupId: "Wed, 21 Jun 2023",
  date: Date.now(),
  totalDuration: 0,
  groupedEntries: [],
};

// #create
const createDateGroupId = (date) => {
  return formatDateEEddMMMyyyy(date);
};

const createFromGroupedEntry = (groupedEntry) => {
  return {
    dateGroupId: createDateGroupId(groupedEntry.startDate),
    date: groupedEntry.startDate,
    totalDuration: groupedEntry.totalDuration,
    groupedEntries: [groupedEntry],
  };
};

const createFromTimeEntry = (timeEntry) => {
  return createFromGroupedEntry(geUtil.createFromTimeEntry(timeEntry));
};

// #update
const updateTEDateInfo = (dateGroupedEntry, gId, id, dateInfo) => {
  const groupedEntry = findGroupedEntryByGId(
    dateGroupedEntry.groupedEntries,
    gId
  );
  geUtil.updateTEDateInfo(groupedEntry, id, dateInfo);
  refresh(dateGroupedEntry);
};

const updateTEGroupingData = (dateGroupedEntry, gId, id, groupingData) => {
  const groupedEntry = findGroupedEntryByGId(
    dateGroupedEntry.groupedEntries,
    gId
  );

  console.log(groupingData);

  if (!groupedEntry) return;

  const timeEntry = geUtil.findTimeEntryById(groupedEntry.entries, id);
  console.log({ ...timeEntry });

  geUtil.updateTEWithGroupingData(timeEntry, groupingData);

  // Find the new groupEntry it belongs to
  const newGroupedEntry = findGroupedEntryByTimeEntry(
    dateGroupedEntry.groupedEntries,
    timeEntry
  );

  console.log(newGroupedEntry);
  console.log(groupedEntry === newGroupedEntry);

  // If same groupEntry then it means that there are no actual changes
  if (groupedEntry === newGroupedEntry) return;

  if (newGroupedEntry === undefined) {
    if (groupedEntry.entries.length === 1) {
      return geUtil.refresh(groupedEntry);
    }
    geUtil.removeBatchTimeEntry(groupedEntry, [id]);
    dateGroupedEntry.groupedEntries.push(geUtil.createFromTimeEntry(timeEntry));
  } else {
    geUtil.removeBatchTimeEntry(groupedEntry, [id]);
    geUtil.addTimeEntry(newGroupedEntry, timeEntry);
  }

  if (groupedEntry.entries.length === 0) {
    removeGroupedEntry(dateGroupedEntry, groupedEntry);
  }

  refresh(dateGroupedEntry);
};

const updateBatchTEGroupingDatainGE = (dateGroupEntry, gId, groupingData) => {
  const groupedEntry = findGroupedEntryByGId(
    dateGroupEntry.groupedEntries,
    gId
  );

  if (!groupedEntry) return;

  geUtil.updateGroupingData(groupedEntry, groupingData);

  const groupedEntries = dateGroupEntry.groupedEntries;
  const sameGroupingDataGEs = groupedEntries.filter(
    (ge) =>
      ge.gId !== groupedEntry.gId &&
      geUtil.isEqualByGroupingData(ge, groupedEntry)
  );

  if (sameGroupingDataGEs.length > 0) {
    const otherGroupedEntry = sameGroupingDataGEs[0];
    geUtil.mergeWithGroupedEntry(otherGroupedEntry, groupedEntry);
    removeGroupedEntry(dateGroupEntry, groupedEntry);
    refresh(dateGroupEntry);
  }
};

// #add
const addGroupedEntry = (dateGroupedEntry, groupedEntry, toRefresh = true) => {
  const sameGroupingDataGE = findGroupedEntryByGroupData(
    dateGroupedEntry.groupedEntries,
    groupedEntry
  );

  if (sameGroupingDataGE !== undefined) {
    geUtil.mergeWithGroupedEntry(sameGroupingDataGE, groupedEntry);
  } else {
    dateGroupedEntry.groupedEntries.push(groupedEntry);
  }

  if (toRefresh) refresh(dateGroupedEntry);
};

const addTimeEntry = (dateGroupedEntry, timeEntry) => {
  const groupedEntry = findGroupedEntryByTimeEntry(
    dateGroupedEntry.groupedEntries,
    timeEntry
  );
  if (!groupedEntry) {
    dateGroupedEntry.groupedEntries.push(geUtil.createFromTimeEntry(timeEntry));
  } else {
    geUtil.addTimeEntry(groupedEntry, timeEntry);
  }
  refresh(dateGroupedEntry);
};

// #calc
const calcTotalDuration = (dateGroupedEntry) => {
  return dateGroupedEntry.groupedEntries.reduce(
    (prev, current) => prev + current.totalDuration,
    0
  );
};

// #remove
const removeBatchTimeEntry = (dateGroupedEntry, idList) => {
  const filteredStructuredTEIds = filterStructuredTeIdsFromIdList(
    extractStructuredTEIds(dateGroupedEntry),
    idList
  );

  return removeBatchStructuredTE(dateGroupedEntry, filteredStructuredTEIds);
};

const removeBatchStructuredTE = (dateGroupedEntry, filteredStructuredTEIds) => {
  //   const groupedEntries = dateGroupedEntry.groupedEntries;
  const delTEList = [];

  filteredStructuredTEIds.forEach((groupedEntryId) => {
    const groupedEntry = findGroupedEntryByGId(
      dateGroupedEntry.groupedEntries,
      groupedEntryId.gId
    );
    delTEList.push(
      ...removeBatchTimeEntryFromGE(
        dateGroupedEntry,
        groupedEntry,
        groupedEntryId.entries,
        false
      )
    );
  });

  refresh(dateGroupedEntry);

  return delTEList;
};

const removeBatchTimeEntryFromGE = (
  dateGroupedEntry,
  groupedEntry,
  idList,
  toRefresh = true
) => {
  const delTEList = geUtil.removeBatchTimeEntry(groupedEntry, idList);
  if (groupedEntry.entries.length === 0) {
    removeGroupedEntry(dateGroupedEntry, groupedEntry);
  }
  if (toRefresh) refresh(dateGroupedEntry);
  return delTEList;
};

const removeTimeEntryFromGE = (dateGroupedEntry, gId, id) => {
  const groupedEntry = findGroupedEntryByGId(
    dateGroupedEntry.groupedEntries,
    gId
  );
  return removeBatchTimeEntryFromGE(dateGroupedEntry, groupedEntry, [id])[0];
};

const removeGroupedEntry = (dateGroupedEntry, groupedEntry) => {
  dateGroupedEntry.groupedEntries = dateGroupedEntry.groupedEntries.filter(
    (ge) => ge.gId !== groupedEntry.gId
  );
};

// #sort
const sortByDateInfo = (dateGroupedEntry) => {
  dateGroupedEntry.groupedEntries.sort((a, b) =>
    compareDesc(a.stopDate, b.stopDate)
  );
  sortByStartDate(dateGroupedEntry);
};

const sortByStartDate = (dateGroupedEntry) => {
  dateGroupedEntry.groupedEntries.sort((a, b) =>
    compareDesc(a.startDate, b.startDate)
  );
};

// #find
const findGroupedEntryByGId = (groupedEntries, gId) => {
  return groupedEntries.find((groupedEntry) => groupedEntry.gId === gId);
};

const findGroupedEntryByTimeEntry = (groupedEntries, timeEntry) => {
  return findGroupedEntryByGroupData(groupedEntries, timeEntry);
};

const findGroupedEntryByGroupData = (groupedEntries, groupData) => {
  return groupedEntries.find((groupedEntry) =>
    geUtil.isEqualByGroupingData(groupedEntry, groupData)
  );
};

// #other
const refresh = (dateGroupedEntry) => {
  dateGroupedEntry.totalDuration = calcTotalDuration(dateGroupedEntry);
  sortByDateInfo(dateGroupedEntry);
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
const extractStructuredTEIds = (dateGroupedEntry) => {
  return dateGroupedEntry.groupedEntries.map((groupedEntry) => {
    return {
      gId: groupedEntry.gId,
      entries: groupedEntry.entries.map((entry) => entry.id),
    };
  });
};

const filterStructuredTeIdsFromIdList = (structuredTEIds, idList) => {
  return structuredTEIds
    .map((structuredTEId) => {
      return {
        gId: structuredTEId.gId,
        entries: structuredTEId.entries.filter((id) => idList.includes(id)),
      };
    })
    .filter((structuredTEId) => structuredTEId.entries.length > 0);
};

const generateDateGroupedEntries = (timeEntries) => {
  const grouped = {};
  timeEntries.forEach((rawTimeEntry) => {
    const timeEntry = timeEntryUtil.createFromApiResponse(rawTimeEntry);
    const dateGroupId = dateGroupEntryUtil.createDateGroupId(
      timeEntry.startDate
    );

    // timeEntry.tags.sort();

    // Date group not created
    if (grouped[dateGroupId] === undefined) {
      // Create the date group and entry
      grouped[dateGroupId] = {
        dateGroupId: dateGroupId,
        date: timeEntry.startDate,
        totalDuration: timeEntry.duration,
        groupedEntries: [
          {
            gId: GroupedEntrySingleton.getNextGroupId(),
            description: timeEntry.description,
            projectId: timeEntry.projectId,
            tags: timeEntry.tags,
            startDate: timeEntry.startDate,
            stopDate: timeEntry.stopDate,
            totalDuration: timeEntry.duration,
            // entry: timeEntry,
            entries: [timeEntry],
          },
        ],
      };
    } else {
      const dateGroup = grouped[dateGroupId];

      const descTagGroup = dateGroup.groupedEntries.find((v) => {
        return groupedEntryUtil.isEqualByGroupingData(v, timeEntry);
      });

      // Desc tag group not found
      if (descTagGroup === undefined) {
        dateGroup.groupedEntries.push({
          gId: GroupedEntrySingleton.getNextGroupId(),
          description: timeEntry.description,
          projectId: timeEntry.projectId,
          tags: timeEntry.tags,
          startDate: timeEntry.startDate,
          stopDate: timeEntry.stopDate,
          totalDuration: timeEntry.duration,
          // entry: timeEntry,
          entries: [timeEntry],
        });
      } else {
        let entries = descTagGroup.entries;
        // if (entries === undefined) {
        //   descTagGroup.entries = [timeEntry, descTagGroup.entry];
        //   delete descTagGroup.entry;
        // } else {
        //   entries.push(timeEntry);
        // }
        entries.push(timeEntry);
        // Update desc tag group data
        if (timeEntry.startDate < descTagGroup.startDate) {
          descTagGroup.startDate = timeEntry.startDate;
        }
        if (timeEntry.stopDate > descTagGroup.stopDate) {
          descTagGroup.stopDate = timeEntry.stopDate;
        }
        descTagGroup.totalDuration += timeEntry.duration;
      }
      dateGroup.totalDuration += timeEntry.duration;
    }
  });

  for (let dateGroupId in grouped) {
    const groupedEntries = grouped[dateGroupId].groupedEntries;
    groupedEntries.sort((a, b) => compareDesc(a.startDate, b.startDate));
    groupedEntries.forEach((groupedEntry) => {
      if (groupedEntry.entries !== undefined) {
        groupedEntry.entries.sort((a, b) =>
          compareDesc(a.startDate, b.startDate)
        );
      }
    });
  }

  return grouped;
};

export const dateGroupEntryUtil = {
  createDateGroupId,
  createFromGroupedEntry,
  createFromTimeEntry,

  updateTEDateInfo,
  updateTEGroupingData,
  updateBatchTEGroupingDatainGE,

  addTimeEntry,
  addGroupedEntry,

  removeBatchTimeEntry,
  removeBatchStructuredTE,
  removeBatchTimeEntryFromGE,
  removeTimeEntryFromGE,

  findGroupedEntryByGId,
  findGroupedEntryByGroupData,
  findGroupedEntryByTimeEntry,

  extractStructuredTEIds,
  filterStructuredTeIdsFromIdList,
  generateDateGroupedEntries,
};
