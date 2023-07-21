import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {} from "../utils/TTDateUtil";
import { compareDesc } from "date-fns";
import { groupedEntryListSliceUtil as gelsUtil } from "../utils/groupedEntryListSliceUtil";
import {
  GroupedEntrySingleton,
  groupedEntryUtil,
} from "../utils/groupedEntryUtil";
import { dateGroupEntryUtil } from "../utils/dateGroupEntryUtil";
import { ttCloneApi } from "./apiSlice";
import { generateApiBatchIdString } from "../utils/otherUtil";

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
    const dateGroupId = dateGroupEntryUtil.createDateGroupId(
      timeEntry.startDate
    );
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

const name = "groupedEntryList";

export const groupedEntryListSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {
    setDateGroupedEntries: (state, action) => {
      state.dateGroupedEntries = action.payload.dateGroupedEntries;
    },
    updateTEDescription: (state, action) => {
      const { dateGroupId, gId, id, description } = action.payload;
      gelsUtil.updateTEGroupingData(state, dateGroupId, gId, id, {
        description,
      });
    },
    updateGEDescription: (state, action) => {
      const { dateGroupId, gId, description } = action.payload;
      gelsUtil.updateGroupingDataInGE(state, dateGroupId, gId, { description });
    },
    updateTETags: (state, action) => {
      const { dateGroupId, gId, id, tags } = action.payload;
      gelsUtil.updateTEGroupingData(state, dateGroupId, gId, id, { tags });
    },
    updateGETags: (state, action) => {
      const { dateGroupId, gId, tags } = action.payload;
      gelsUtil.updateGroupingDataInGE(state, dateGroupId, gId, { tags });
    },
    updateTEProjectId: (state, action) => {
      const { dateGroupId, gId, id, projectId } = action.payload;
      gelsUtil.updateTEGroupingData(state, dateGroupId, gId, id, { projectId });
    },
    updateGEProjectId: (state, action) => {
      const { dateGroupId, gId, projectId } = action.payload;
      gelsUtil.updateGroupingDataInGE(state, dateGroupId, gId, { projectId });
    },
    updateTEDateInfo: (state, action) => {
      const { dateGroupId, gId, id, dateInfo } = action.payload;
      gelsUtil.updateTEDateInfo(state, dateGroupId, gId, id, dateInfo);
    },
    updateBatchTE: (state, action) => {
      const { dateGroupId, idList, editData } = action.payload;
      gelsUtil.updateBatchTEInDGE(state, dateGroupId, idList, editData);
    },

    deleteTE: (state, action) => {
      const { dateGroupId, gId, id } = action.payload;
      gelsUtil.removeBatchTimeEntryFromGE(state, dateGroupId, gId, [id]);
    },
    deleteGE: (state, action) => {
      const { dateGroupId, gId } = action.payload;
      gelsUtil.removeBatchTimeEntryFromGE(state, dateGroupId, gId, []);
    },

    deleteDGE: (state, action) => {
      const { dateGroupId } = action.payload;
      gelsUtil.removeDateGroupedEntry(state, dateGroupId);
    },
    deleteBatchTE: (state, action) => {
      const { dateGroupId, idList } = action.payload;
      gelsUtil.removeBatchTimeEntryFromDGE(state, dateGroupId, idList);
    },

    addTE: (state, action) => {
      const { timeEntry } = action.payload;
      gelsUtil.addTimeEntry(state, timeEntry);
    },
  },
});

const createExtraActions = () => {
  const addTimeEntry = () => {
    return createAsyncThunk(
      `${name}/addTimeEntry`,
      async function (arg, { getState, dispatch }) {
        console.log("start await");
        const entryData = arg?.entryData;
        if (!Boolean(entryData)) return;
        // Api put to the database, id should be contain in entryData.
        const result = await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 2000)
        );
        console.log("end await");
        entryData.id = Date.now();

        dispatch(addTE({ timeEntry: entryData }));
      }
    );
  };

  const reducers = {
    addTimeEntry: addTimeEntry(),
  };

  return reducers;
};

const allActions = {
  ...groupedEntryListSlice.actions,
  ...createExtraActions(),
};

export const {
  setDateGroupedEntries,

  updateTEDescription,
  updateGEDescription,
  updateTETags,
  updateGETags,
  updateTEProjectId,
  updateGEProjectId,
  updateTEDateInfo,

  updateBatchTE,

  deleteTE,
  deleteGE,

  deleteBatchTE,

  deleteDGE,

  addTE,

  // async
  addTimeEntry,
} = allActions;
export default groupedEntryListSlice.reducer;

const extendedApi = ttCloneApi.injectEndpoints({
  endpoints: (builder) => ({
    getTimeEntries: builder.query({
      query: () => "me/time_entries",
    }),
    addTimeEntry: builder.mutation({
      query: ({ timeEntry }) => ({
        url: `time_entries`,
        method: "POST",
        body: timeEntry,
      }),
    }),
    updateTimeEntry: builder.mutation({
      query: ({ timeEntry }) => ({
        url: `time_entries/${timeEntry.id}`,
        method: "PUT",
        body: timeEntry,
      }),
    }),
    deleteTimeEntry: builder.mutation({
      query: ({ id }) => ({
        url: `time_entries/${id}`,
        method: "DELETE",
      }),
    }),
    recoverTimeEntry: builder.mutation({
      query: ({ id }) => ({
        url: `time_entries/recover/${id}`,
        method: "PATCH",
      }),
    }),
    patchTimeEntry: builder.mutation({
      query: ({ id, patch }) => ({
        url: `time_entries/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    batchDeleteTimeEntry: builder.mutation({
      query: ({ ids }) => ({
        url: `time_entries/batch?${generateApiBatchIdString(ids)}`,
        method: "DELETE",
      }),
    }),
    batchRecoverTimeEntry: builder.mutation({
      query: ({ ids }) => ({
        url: `time_entries/recover/batch?${generateApiBatchIdString(ids)}`,
        method: "PATCH",
      }),
    }),
    batchPatchTimeEntry: builder.mutation({
      query: ({ ids, patch }) => ({
        url: `time_entries/batch?${generateApiBatchIdString(ids)}`,
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

export const {
  useGetTimeEntriesQuery,
  useAddTimeEntryMutation,
  useUpdateTimeEntryMutation,
  useDeleteTimeEntryMutation,
  useRecoverTimeEntryMutation,
  usePatchTimeEntryMutation,
  useBatchDeleteTimeEntryMutation,
  useBatchRecoverTimeEntryMutation,
  useBatchPatchTimeEntryMutation,
} = extendedApi;
