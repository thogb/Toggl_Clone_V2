import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: {
    uid: -1,
  },
  workspace: {
    wid: -1,
  },
  timeEntry: {
    description: "",
    duration: -1,
    startDate: new Date(),
    endDate: new Date(),
  },
};

export const togglSlice = createSlice({
  name: "track",
  initialState,
  reducers: {},
});

export const {} = togglSlice.actions;
export default togglSlice.reducer;

const projectPost = {
  id: 193144570,
  workspace_id: 7169665,
  client_id: null,
  name: "toggl_track_clone",
  is_private: true,
  active: true,
  at: "2023-06-21T09:17:42+00:00",
  server_deleted_at: null,
  color: "#06a893",
  billable: null,
  template: null,
  auto_estimates: null,
  estimated_hours: null,
  rate: null,
  rate_last_updated: null,
  currency: null,
  recurring: false,
  recurring_parameters: null,
  current_period: null,
  fixed_fee: null,
  actual_hours: null,
  wid: 7169665,
  cid: null,
};

const project_users = {
  id: 145760311,
  project_id: 193144570,
  user_id: 9280720,
  workspace_id: 7169665,
  manager: true,
  rate: null,
  rate_last_updated: null,
  at: "2023-06-21T09:17:42+00:00",
  group_id: null,
  gid: null,
  labour_cost: null,
};
