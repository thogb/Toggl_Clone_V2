import { createSlice } from "@reduxjs/toolkit";
import { formatDateEEddMMMyyyy } from "../utils/TTDateUtil";
import { createGroupId, isInnerGroupEqual } from "../utils/TimeEntryUtil";
import { compareAsc, compareDesc } from "date-fns";

const exampleState = {
  dateGroupedEntries: {
    "Wed, 21 Jun 2023": {
      dateGroupId: "Wed, 21 Jun 2023",
      totalDuration: 0,
      groupCount: 0,
      groupedEntries: [
        //sorted by {}.startDate
        {
          gId: 1, // from groupCount
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
    const dateGroupId = formatDateEEddMMMyyyy(timeEntry.startDate);
    timeEntry.tags.sort();

    // Date group not created
    if (grouped[dateGroupId] === undefined) {
      // Create the date group and entry
      grouped[dateGroupId] = {
        dateGroupId: dateGroupId,
        totalDuration: timeEntry.duration,
        groupCount: 1,
        groupedEntries: [
          {
            gId: createGroupId(dateGroupId, 1),
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
        isInnerGroupEqual(v, timeEntry)
      );

      // Desc tag group not found
      if (descTagGroup === undefined) {
        dateGroup.groupCount++;
        dateGroup.groupedEntries.push({
          gId: createGroupId(dateGroupId, dateGroup.groupCount),
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

      const group = state.dateGroupedEntries[dateGroupId].groupedEntries.find(
        (groupEntry) => groupEntry.gId === gId
      );
      const timeEntry = group.entries.find((entry) => entry.id === id);
      timeEntry.description = description;
    },
    updateBatchTEDescription: (state, action) => {},
  },
});

export const {
  setDateGroupedEntries,
  updateTEDescription,
  updateBatchTEDescription,
} = groupedEntryListSlice.actions;
export default groupedEntryListSlice.reducer;
