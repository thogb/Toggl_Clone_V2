import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentEntryReducer from "./currentEntrySlice";
import entryListReducer from "./entryListSlice";
import groupedEntryListReducer from "./groupedEntryListSlice";

export const store = configureStore({
  reducer: combineReducers({
    currentEntry: currentEntryReducer,
    entryList: entryListReducer,
    groupedEntryList: groupedEntryListReducer,
  }),
  //   reducer: {
  //     currentEntry: currentEntryReducer,
  //   },
});
