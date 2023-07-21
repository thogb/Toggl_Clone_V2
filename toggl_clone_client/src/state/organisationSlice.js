import { createSlice } from "@reduxjs/toolkit";

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
  extraReducers: (builder) => {},
});

export default organisationsSlice.reducer;
