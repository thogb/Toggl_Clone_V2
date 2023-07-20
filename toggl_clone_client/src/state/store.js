import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentEntryReducer from "./currentEntrySlice";
import entryListReducer from "./entryListSlice";
import groupedEntryListReducer from "./groupedEntryListSlice";
import authReducer from "./authSlice";
import { ttCloneApi } from "./apiSlice";

export const store = configureStore({
  reducer: combineReducers({
    currentEntry: currentEntryReducer,
    entryList: entryListReducer,
    groupedEntryList: groupedEntryListReducer,
    auth: authReducer,
    [ttCloneApi.reducerPath]: ttCloneApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ttCloneApi.middleware),
  //   reducer: {
  //     currentEntry: currentEntryReducer,
  //   },
});
