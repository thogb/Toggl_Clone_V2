import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ttCloneApi = createApi({
  reducerPath: "ttCloneApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    // baseUrl: "https://localhost:7293/api/",
    isJsonContentType: () => true,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: () => ({}),
});
