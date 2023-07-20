import { createSlice } from "@reduxjs/toolkit";
import { ttCloneApi } from "./apiSlice";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

const extendedApi = ttCloneApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { email, password },
        validateStatus: (response, result) => {
          if (response.status === 200) {
            return true;
          }
          return false;
        },
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
        validateStatus: (response, result) => {
          if (response.status === 200) {
            return true;
          }
          return false;
        },
      }),
    }),
  }),
});

export default authSlice.reducer;
