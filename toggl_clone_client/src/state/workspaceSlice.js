import { createSlice } from "@reduxjs/toolkit";
import { ttCloneApi } from "./apiSlice";
import { groupObj } from "../utils/otherUtil";

const initialState = {
  //   workspaces: {
  //     123: [
  //       {
  //           id: 1,
  //           organisationId: 1,
  //           name: 'Workspace 1'
  //       }
  //   ]
  //   }
  workspaces: {},
  currentWorkspace: {},
};

const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ttCloneApi.endpoints.getWorkspaces.matchFulfilled,
      (state, action) => {
        const grouped = groupObj(action.payload, "organisationId");
        state.workspaces = grouped;
        state.currentWorkspace = action.payload[0];
      }
    );
  },
});

export const workspaceActions = workspacesSlice.actions;
export default workspacesSlice.reducer;

const extendedApi = ttCloneApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaces: builder.query({
      query: () => ({
        url: "me/workspaces",
      }),
    }),
  }),
});

export const { useGetWorkspacesQuery } = extendedApi;
