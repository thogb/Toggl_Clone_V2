import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
  extraReducers: (builder) => {},
});

export default workspacesSlice.reducer;
