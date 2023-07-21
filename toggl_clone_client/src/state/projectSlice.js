import { createSlice } from "@reduxjs/toolkit";

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
  extraReducers: (builder) => {},
});

export default projectsSlice.reducer;
