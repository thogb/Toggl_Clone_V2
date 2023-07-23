import { createSlice } from "@reduxjs/toolkit";
import { groupedEntryListSliceUtil as gelsUtil } from "../utils/groupedEntryListSliceUtil";
import { ttCloneApi } from "./apiSlice";
import { generateApiBatchIdString } from "../utils/otherUtil";
import { dateGroupEntryUtil } from "../utils/dateGroupEntryUtil";

const initialState = {
  dateGroupedEntries: {},
};

const name = "groupedEntryList";

export const groupedEntryListSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
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
  extraReducers: (builder) => {
    builder.addMatcher(
      ttCloneApi.endpoints.getTimeEntries.matchFulfilled,
      (state, action) => {
        state.dateGroupedEntries =
          dateGroupEntryUtil.generateDateGroupedEntries(action.payload);
      }
    );
  },
});

const allActions = {
  ...groupedEntryListSlice.actions,
};

export const timeEntryActions = groupedEntryListSlice.actions;

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
        // url: `time_entries/batch?${generateApiBatchIdString(ids)}`,
        url: `time_entries/${generateApiBatchIdString(ids)}`,
        method: "DELETE",
      }),
    }),
    batchRecoverTimeEntry: builder.mutation({
      query: ({ ids }) => ({
        // url: `time_entries/recover/batch?${generateApiBatchIdString(ids)}`,
        url: `time_entries/recover/${generateApiBatchIdString(ids)}`,
        method: "PATCH",
      }),
    }),
    batchPatchTimeEntry: builder.mutation({
      query: ({ ids, patch }) => ({
        // url: `time_entries/batch?${generateApiBatchIdString(ids)}`,
        url: `time_entries/${generateApiBatchIdString(ids)}`,
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
