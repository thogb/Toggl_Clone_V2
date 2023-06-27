import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentEntryReducer from "./currentEntrySlice";
import entryListReducer from "./entryListSlice";

export const store = configureStore({
  reducer: combineReducers({
    currentEntry: currentEntryReducer,
    entryList: entryListReducer,
  }),
  //   reducer: {
  //     currentEntry: currentEntryReducer,
  //   },
});
