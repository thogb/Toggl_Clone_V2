import { createSlice } from "@reduxjs/toolkit";
import { ttCloneApi } from "./apiSlice";
import { groupObj } from "../utils/otherUtil";

const initialState = {
  //   projects: {
  //     123: [
  //       {
  //         id: 0,
  //         workspaceId: 0,
  //         name: "",
  //         colour: "#ffffff",
  //         active: true,
  //         private: true,
  //       },
  //     ],
  //   },
  projects: {},
  currentProject: {},
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ttCloneApi.endpoints.getProjects.matchFulfilled,
      (state, action) => {
        const grouped = groupObj(action.payload, "workspaceId");
        state.projects = grouped;
        state.currentProject = action.payload[0];
      }
    );
  },
});

export default projectsSlice.reducer;

const extendedApi = ttCloneApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "me/projects",
      }),
    }),
  }),
});

export const { useGetProjectsQuery } = extendedApi;
