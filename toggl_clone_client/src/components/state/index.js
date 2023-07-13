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

// https://track.toggl.com/api/v9/me/location
const location = {
  city: "Perth",
  city_lat_long: "-31.952312,115.861309",
  state: "AUWA",
  country_code: "AU",
  country_name: "Australia",
};

// https://track.toggl.com/api/v9/me/time_entries
const timeEntry = {
  id: 3040393305,
  workspace_id: 7169665,
  project_id: null,
  task_id: null,
  billable: false,
  start: "2023-07-08T05:58:20+00:00",
  stop: "2023-07-08T05:59:42Z",
  duration: 82,
  description: "asd",
  tags: ["backend", "Brain_training", "C#"],
  tag_ids: [14070570, 14054839, 14008047],
  duronly: true,
  at: "2023-07-08T06:06:15+00:00",
  server_deleted_at: null,
  user_id: 9280720,
  uid: 9280720,
  wid: 7169665,
};

// https://track.toggl.com/api/v9/me/tags
const tag = {
  id: 14070570,
  workspace_id: 7169665,
  name: "backend",
  at: "2023-04-04T08:42:25.788347Z",
};

// https://track.toggl.com/api/v9/me/workspaces
const workspace = {
  id: 7169665,
  organization_id: 7141828,
  name: "Tao Hu's workspace",
  profile: 0,
  premium: false,
  business_ws: false,
  admin: true,
  role: "",
  suspended_at: null,
  server_deleted_at: null,
  default_hourly_rate: null,
  rate_last_updated: null,
  default_currency: "USD",
  only_admins_may_create_projects: false,
  only_admins_may_create_tags: false,
  only_admins_see_billable_rates: false,
  only_admins_see_team_dashboard: false,
  projects_billable_by_default: true,
  reports_collapse: true,
  rounding: 1,
  rounding_minutes: 0,
  api_token: "38414900fab955065fc38c65b63e6e25",
  at: "2023-03-24T05:39:31+00:00",
  logo_url: "https://assets.track.toggl.com/images/workspace.jpg",
  ical_url: "/ical/workspace_user/16ef1e00f9ffe4e17f096133073f64b0",
  ical_enabled: true,
  csv_upload: null,
  subscription: null,
  working_hours_in_minutes: null,
};

// https://track.toggl.com/api/v9/me/organisations
const organisation = {
  id: 7141828,
  name: "Tao Hu's organization",
  pricing_plan_id: 0,
  created_at: "2023-03-24T05:39:31.043774Z",
  at: "2023-03-24T05:39:31.043774Z",
  server_deleted_at: null,
  is_multi_workspace_enabled: false,
  suspended_at: null,
  user_count: 1,
  trial_info: {
    trial: false,
    trial_available: false,
    trial_end_date: "2023-04-23T00:00:00Z",
    next_payment_date: "2023-04-23T00:00:00Z",
    last_pricing_plan_id: null,
  },
  is_unified: true,
  max_workspaces: 20,
  admin: true,
  owner: true,
};

// https://track.toggl.com/api/v9/me/projects
// get
const project = {
  id: 193144570,
  workspace_id: 7169665,
  client_id: null,
  name: "toggl_track_clone",
  is_private: true,
  active: true,
  at: "2023-06-21T09:17:42+00:00",
  created_at: "2023-06-21T09:17:42+00:00",
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
  actual_hours: 0,
  wid: 7169665,
  cid: null,
};

const me = {
  id: 9280720,
  api_token: "8668d9aafdf2eb7f743ce1f0f2942d16",
  email: "taohu2222@gmail.com",
  fullname: "Tao Hu",
  timezone: "Australia/Perth",
  default_workspace_id: 7169665,
  beginning_of_week: 1,
  image_url: "https://assets.track.toggl.com/images/profile.png",
  created_at: "2023-03-24T05:39:31.043774Z",
  updated_at: "2023-03-24T05:39:44.859209Z",
  openid_email: null,
  openid_enabled: true,
  country_id: 14,
  has_password: false,
  at: "2023-07-11T02:50:34.457729Z",
  intercom_hash:
    "dd7d459087702b21bc7884a4342cd99ecff0df78f7ef125ec735e079f630c587",
  oauth_providers: ["google"],
};
