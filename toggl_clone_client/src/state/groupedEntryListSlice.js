import { createSlice } from "@reduxjs/toolkit";
import { formatDateEEddMMMyyyy } from "../utils/TTDateUtil";
import {
  isInnerGroupEqual,
  isTagDescriptionEqual,
} from "../utils/TimeEntryUtil";

const exampleState = {
  dateGroupedEntries: {
    "Wed, 21 Jun 2023": {
      dateString: "Wed, 21 Jun 2023",
      totalDuration: 0,
      groupCount: 0,
      groupedEntries: [
        //sorted by {}.startDate
        {
          gId: 1, // from groupCount
          description: "desc",
          projectId: 1234123,
          tags: ["tag1", "tag2"], //sorted as string
          startDate: new Date(),
          stopDate: new Date(),
          totalDuration: 12,
          entries: [
            //sorted by {}.startDate
            {
              id: 3004659064,
              workspace_id: 7169665,
              startDate: new Date(),
              stopDate: new Date(),
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
              startDate: new Date(),
              stopDate: new Date(),
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
        {
          description: "desc",
          tags: ["tag1", "tag2"], //sorted as string
          startDate: new Date(),
          stopDate: new Date(),
          totalDuration: 12,
          entry: {
            id: 3004659064,
            workspace_id: 7169665,
            startDate: new Date(),
            stopDate: new Date(),
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
          entries: undefined,
        },
      ],
    },
    "Tue, 20 Jun": {
      dateString: "Tue, 20 Jun",
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
    const dateString = formatDateEEddMMMyyyy(timeEntry.startDate);
    timeEntry.tags.sort();

    // Date group not created
    if (grouped[dateString] === undefined) {
      // Create the date group and entry
      grouped[dateString] = {
        dateString: dateString,
        totalDuration: timeEntry.duration,
        groupCount: 1,
        groupedEntries: [
          {
            gId: 1,
            description: timeEntry.description,
            tags: timeEntry.tags,
            startDate: new Date(timeEntry.startDate),
            stopDate: new Date(timeEntry.stopDate),
            totalDuration: timeEntry.duration,
            entry: timeEntry,
          },
        ],
      };
    } else {
      const dateGroup = grouped[dateString];
      // const descTagGroup = dateGroup.groupedEntries.find((v) =>
      //   isTagDescriptionEqual(v, timeEntry)
      // );
      const descTagGroup = dateGroup.groupedEntries.find((v) =>
        isInnerGroupEqual(v, timeEntry)
      );
      //   console.log(dateGroup.groupedEntries);
      //   console.log(timeEntry);
      //   console.log(descTagGroup);
      // Desc tag group not found
      if (descTagGroup === undefined) {
        dateGroup.groupCount++;
        dateGroup.groupedEntries.push({
          gId: dateGroup.groupCount,
          description: timeEntry.description,
          projectId: timeEntry.projectId,
          tags: timeEntry.tags,
          startDate: new Date(timeEntry.startDate),
          stopDate: new Date(timeEntry.stopDate),
          totalDuration: timeEntry.duration,
          entry: timeEntry,
        });
      } else {
        console.log("found group");
        let entries = descTagGroup.entries;
        if (entries === undefined) {
          descTagGroup.entries = [timeEntry, descTagGroup.entry];
          delete descTagGroup.entry;
        } else {
          entries.push(timeEntry);
        }
        // Update desc tag group data
        if (timeEntry.startDate.getTime() < descTagGroup.startDate.getTime()) {
          descTagGroup.startDate = new Date(timeEntry.startDate);
        }
        if (timeEntry.stopDate.getTime() > descTagGroup.stopDate.getTime()) {
          descTagGroup.stopDate = new Date(timeEntry.stopDate);
        }
        descTagGroup.totalDuration += timeEntry.duration;
      }
      dateGroup.totalDuration += timeEntry.duration;
    }
  });

  for (let dateString in grouped) {
    const groupedEntries = grouped[dateString].groupedEntries;
    groupedEntries.sort((a, b) => b.startDate - a.startDate);
    groupedEntries.forEach((groupedEntry) => {
      if (groupedEntry.entries !== undefined) {
        groupedEntry.entries.sort((a, b) => b.startDate - a.startDate);
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
      console.log("in reducer set date grouped");
      console.log(action.dateGroupedEntries);
      state.dateGroupedEntries = action.payload.dateGroupedEntries;
    },
  },
});

export const { setDateGroupedEntries } = groupedEntryListSlice.actions;
export default groupedEntryListSlice.reducer;
