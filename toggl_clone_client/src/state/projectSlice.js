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
  reducers: {
    resetState: () => initialState,
    addProject: (state, action) => {
      const { project } = action.payload;
      if (state.projects[project.workspaceId]) {
        state.projects[project.workspaceId].push(project);
      } else {
        state.projects[project.workspaceId] = [project];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ttCloneApi.endpoints.getProjects.matchFulfilled,
      (state, action) => {
        const grouped = groupObj(action.payload, "workspaceId");
        state.projects = grouped;
        state.currentProject = action.payload[0];
      }
    );
    builder.addMatcher(
      ttCloneApi.endpoints.addProject.matchFulfilled,
      (state, action) => {
        projectsSlice.caseReducers.addProject(state, {
          payload: {
            project: action.payload,
          },
        });
      }
    );
  },
});

export const projectActions = projectsSlice.actions;
export default projectsSlice.reducer;

const extendedApi = ttCloneApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "me/projects",
      }),
    }),
    addProject: builder.mutation({
      query: ({ project, workspaceId }) => ({
        url: `workspaces/${workspaceId}/projects`,
        method: "POST",
        body: project,
      }),
    }),
  }),
});

export const { useGetProjectsQuery, useAddProjectMutation } = extendedApi;
