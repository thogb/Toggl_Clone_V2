import { createSlice } from "@reduxjs/toolkit";
import { ttCloneApi } from "./apiSlice";

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
  reducers: {},
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

export default organisationsSlice.reducer;

const extendedApi = ttCloneApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganisations: builder.query({
      query: () => ({
        url: "me/organisations",
      }),
    }),
  }),
});

export const { useGetOrganisationsQuery } = extendedApi;
