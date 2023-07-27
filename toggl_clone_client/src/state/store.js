import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentEntryReducer from "./currentEntrySlice";
import groupedEntryListReducer from "./groupedEntryListSlice";
import authReducer, { authListenerMiddleware } from "./authSlice";
import { ttCloneApi } from "./apiSlice";
import workspacesReducer from "./workspaceSlice";
import organisationsReducer from "./organisationSlice";
import tagsReducer from "./tagSlice";
import projectsReducer from "./projectSlice";
import notificationsReducer from "./notificationSlice";

export const store = configureStore({
  reducer: combineReducers({
    currentEntry: currentEntryReducer,
    groupedEntryList: groupedEntryListReducer,
    auth: authReducer,
    organisations: organisationsReducer,
    workspaces: workspacesReducer,
    tags: tagsReducer,
    projects: projectsReducer,
    notifications: notificationsReducer,
    [ttCloneApi.reducerPath]: ttCloneApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(authListenerMiddleware.middleware)
      .concat(ttCloneApi.middleware),
  //   reducer: {
  //     currentEntry: currentEntryReducer,
  //   },
});
