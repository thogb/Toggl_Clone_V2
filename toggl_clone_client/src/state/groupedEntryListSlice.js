import { createSlice } from "@reduxjs/toolkit";
import {} from "../utils/TTDateUtil";
import {
  GroupedEntrySingleton,
  createDateGroupId,
  deleteGEFromDateGroupEntry,
  deleteTEFromGroupedEntry,
  findGroupedEntryByGId,
  isGroupEntryEqual,
  removeBatchTEFromDGE,
  removeBatchTEFromGE,
  removeDateGroupedEntry,
  updateAllTEGroupDateInGE,
  updateTEGroupData,
  updateTimeEntryDateInfo,
} from "../utils/TimeEntryUtil";
import { compareDesc } from "date-fns";

const exampleState = {
  dateGroupedEntries: {
    "Wed, 21 Jun 2023": {
      dateGroupId: "Wed, 21 Jun 2023",
      date: Date.now(),
      totalDuration: 0,
      groupedEntries: [
        //sorted by {}.startDate
        {
          gId: "Wed, 21 Jun 2023 - 0", // from groupCount
          description: "desc",
          projectId: 1234123,
          tags: ["tag1", "tag2"], //sorted as string
          startDate: new Date().getTime(),
          stopDate: new Date().getTime(),
          totalDuration: 12,
          entries: [
            //sorted by {}.startDate
            {
              id: 3004659064,
              workspace_id: 7169665,
              projectId: 1234123,
              startDate: new Date().getTime(),
              stopDate: new Date().getTime(),
              duration: 4,
              description: "",
              tags: [
                "backend",
                "Brain_training",
                "C#",
                ".net_Core",
                ".net_Core_Web",
              ],
            },
            {
              id: 3004659064,
              workspace_id: 7169665,
              projectId: 1234123,
              startDate: new Date().getTime(),
              stopDate: new Date().getTime(),
              duration: 4,
              description: "",
              tags: [
                "backend",
                "Brain_training",
                "C#",
                ".net_Core",
                ".net_Core_Web",
              ],
            },
          ],
        },
      ],
    },
    "Tue, 20 Jun": {
      dateGroupId: "Tue, 20 Jun",
      year: 2023,
    },
  },
};

const initialState = {
  dateGroupedEntries: {},
};

export const generateDateGroupedEntries = (timeEntries) => {
  const grouped = {};
  timeEntries.timeEntries.forEach((timeEntry) => {
    const dateGroupId = createDateGroupId(timeEntry.startDate);
    timeEntry.tags.sort();

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

      const descTagGroup = dateGroup.groupedEntries.find((v) =>
        isGroupEntryEqual(v, timeEntry)
      );

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
        if (entries === undefined) {
          descTagGroup.entries = [timeEntry, descTagGroup.entry];
          delete descTagGroup.entry;
        } else {
          entries.push(timeEntry);
        }
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

export const groupedEntryListSlice = createSlice({
  name: "groupedEntryList",
  initialState: initialState,
  reducers: {
    setDateGroupedEntries: (state, action) => {
      state.dateGroupedEntries = action.payload.dateGroupedEntries;
    },
    updateTEDescription: (state, action) => {
      const { dateGroupId, gId, id, description } = action.payload;

      updateTEGroupData(state.dateGroupedEntries, dateGroupId, gId, id, {
        name: "description",
        description: description,
      });
    },
    updateGEDescription: (state, action) => {
      const { dateGroupId, gId, description } = action.payload;
      const groupedEntry = findGroupedEntryByGId(
        state.dateGroupedEntries[dateGroupId].groupedEntries,
        gId
      );
      updateAllTEGroupDateInGE(groupedEntry, {
        name: "description",
        description: description,
      });
    },
    updateTETags: (state, action) => {
      const { dateGroupId, gId, id, tags } = action.payload;
      updateTEGroupData(state.dateGroupedEntries, dateGroupId, gId, id, {
        name: "tags",
        tags: tags,
      });
    },
    updateGETags: (state, action) => {
      const { dateGroupId, gId, tags } = action.payload;
      const groupedEntry = findGroupedEntryByGId(
        state.dateGroupedEntries[dateGroupId].groupedEntries,
        gId
      );
      updateAllTEGroupDateInGE(groupedEntry, {
        name: "tags",
        tags: tags,
      });
    },
    updateTEProjectId: (state, action) => {
      const { dateGroupId, gId, id, projectId } = action.payload;
      updateTEGroupData(state.dateGroupedEntries, dateGroupId, gId, id, {
        name: "projectId",
        projectId: projectId,
      });
    },
    updateGEProjectId: (state, action) => {
      const { dateGroupId, gId, projectId } = action.payload;
      const groupedEntry = findGroupedEntryByGId(
        state.dateGroupedEntries[dateGroupId].groupedEntries,
        gId
      );
      updateAllTEGroupDateInGE(groupedEntry, {
        name: "projectId",
        projectId: projectId,
      });
    },
    updateTEDateInfo: (state, action) => {
      const { dateGroupId, gId, id, dateInfo } = action.payload;
      updateTimeEntryDateInfo(
        state.dateGroupedEntries,
        dateGroupId,
        gId,
        id,
        dateInfo
      );
    },

    deleteTE: (state, action) => {
      const { dateGroupId, gId, id } = action.payload;
      removeBatchTEFromGE(state.dateGroupedEntries, dateGroupId, gId, [id]);
    },
    deleteGE: (state, action) => {
      // Delete group entry from the dateGroup with id = dategroupId
      const { dateGroupId, gId } = action.payload;
      removeBatchTEFromGE(state.dateGroupedEntries, dateGroupId, gId, []);
    },

    deleteDGE: (state, action) => {
      // extract dateGroupId
      const { dateGroupId } = action.payload;
      // delete dateGroupEntry with dateGroupId
      removeDateGroupedEntry(state.dateGroupedEntries, dateGroupId);
    },
    deleteBatchTE: (state, action) => {
      const { dateGroupId, idList } = action.payload;
      removeBatchTEFromDGE(state.dateGroupedEntries, dateGroupId, idList);
    },
  },
});

export const {
  setDateGroupedEntries,

  updateTEDescription,
  updateGEDescription,
  updateTETags,
  updateGETags,
  updateTEProjectId,
  updateGEProjectId,
  updateTEDateInfo,

  deleteTE,
  deleteGE,

  deleteBatchTE,

  deleteDGE,
} = groupedEntryListSlice.actions;
export default groupedEntryListSlice.reducer;