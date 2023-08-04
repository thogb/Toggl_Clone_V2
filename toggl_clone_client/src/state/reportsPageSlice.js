import { createSlice } from "@reduxjs/toolkit";
import { ttCloneApi } from "./apiSlice";
import { filterUtils } from "../utils/filtersUtil";

const getReportsFilterData = () => {
  return {
    teamFilterData: filterUtils.getDefaultTeamFilterData(),
    clientFilterData: filterUtils.getDefaultClientFilterData(),
    projectFilterData: filterUtils.getDefaultProjectFilterData(),
    tagFilterData: filterUtils.getDefaultTagFilterData(),
    descriptionFilter: "",
  };
};

const initialState = {
  ...getReportsFilterData(),
};

const reportsPageSlice = createSlice({
  name: "reportsPage",
  initialState: initialState,
  reducers: {
    setTeamFilterData: (state, action) => {
      state.teamFilterData = action.payload.teamFilterData;
    },
    setClientFilterData: (state, action) => {
      state.clientFilterData = action.payload.clientFilterData;
    },
    setProjectFilterData: (state, action) => {
      state.projectFilterData = action.payload.projectFilterData;
    },
    setTagFilterData: (state, action) => {
      state.tagFilterData = action.payload.tagFilterData;
    },
    setDescriptionFilter: (state, action) => {
      state.descriptionFilter = action.payload.descriptionFilter;
    },
    resetFilters: (state) => {
      return {
        ...state,
        ...getReportsFilterData(),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ttCloneApi.endpoints.deleteTag.matchFulfilled,
      (state, action) => {
        const deletedTagId = action.meta.arg.originalArgs.tagId;
        const currTagFilterData = state.tagFilterData;
        reportsPageSlice.caseReducers.setTagFilterData(state, {
          payload: {
            tagFilterData: {
              ...currTagFilterData,
              tags: currTagFilterData.tags.filter(
                (tag) => tag.id !== deletedTagId
              ),
            },
          },
        });
      }
    );
  },
});

export const reportsPageActions = reportsPageSlice.actions;
export default reportsPageSlice.reducer;
