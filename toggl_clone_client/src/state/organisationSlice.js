import { createSlice } from "@reduxjs/toolkit";
import { ttCloneApi } from "./apiSlice";
import { enqueueSnackbar } from "notistack";
import { workspaceActions } from "./workspaceSlice";

const initialState = {
  //   organisations: [
  //     {
  //       id: 0,
  //       name: "",
  //     },
  //   ],
  organisations: [],
  currentOrganisation: {},
};

const organisationsSlice = createSlice({
  name: "organisations",
  initialState,
  reducers: {
    resetState: () => initialState,
    changeOrganisation: (state, action) => {
      const { organisationId } = action.payload;
      state.currentOrganisation = state.organisations.find(
        (o) => o.id === organisationId
      );
    },
    addOrganisation: (state, action) => {
      const { organisation } = action.payload;
      state.organisations.push(organisation);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ttCloneApi.endpoints.getOrganisations.matchFulfilled,
      (state, action) => {
        state.organisations = action.payload;
        state.currentOrganisation = action.payload[0];
      }
    );
  },
});

export const organisationActions = organisationsSlice.actions;
export default organisationsSlice.reducer;

const extendedApi = ttCloneApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganisations: builder.query({
      query: () => ({
        url: "me/organisations",
      }),
    }),
    addOrganisation: builder.mutation({
      query: ({ name, workspaceName }) => ({
        url: "organisations",
        method: "POST",
        body: { name, workspaceName },
      }),
      async onQueryStarted({ organisationData }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            organisationActions.addOrganisation({
              organisation: data.organisation,
            })
          );
          dispatch(
            workspaceActions.addWorkspace({ workspace: data.workspace })
          );
          enqueueSnackbar({
            message: "Successfully created organisation",
            variant: "success",
          });
        } catch (error) {
          enqueueSnackbar({
            message: error.error.data.message,
            variant: "error",
          });
        }
      },
    }),
  }),
});

export const { useGetOrganisationsQuery, useAddOrganisationMutation } =
  extendedApi;
