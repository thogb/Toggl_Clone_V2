import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: "",
  projectId: null,
  projectName: null,
  tags: [],
  tagsChecked: [],
  duration: 0,
  startDate: new Date(),
  stopDate: new Date(),
  timerStarted: false,
};

const testState = {
  description: "",
  projectId: null,
  projectName: null,
  // tags: [
  //   "Java",
  //   "Python",
  //   "C",
  //   ".net Core",
  //   "React",
  //   "Web",
  //   "full stack",
  //   "font end",
  //   "back end",
  //   "srd",
  //   "cits1003",
  //   "icts",
  //   "osts",
  //   "leetcode",
  //   "brain training",
  // ],
  tags: [
    "backend",
    "Brain_training",
    "C#",
    "C#_Web",
    "Dual-n-back",
    "email",
    "frontend",
    "fullstack",
    "ISC",
    "ITCS",
    "java",
    "Leetcode",
    ".net_Core",
    ".net_Core_Web",
    "newtest",
    "OSTS",
    "project",
    "python",
    "reactjs",
    "Schulte_table",
    "SRD",
    "SRD_Assignment",
    "SRD_Book",
    "SRD_Lec",
    "testtag",
    "toggl_clone",
    "uni_work",
  ],
  tagsChecked: [],
  duration: 0,
  startDate: new Date(),
  stopDate: new Date(),
  timerStarted: false,
};

export const currentEntrySlice = createSlice({
  name: "currentEntry",
  initialState: testState,
  reducers: {
    updateDuration: (state, action) => {
      const { duration, staticStop = true } = action.payload;
      state.duration = duration;
      state.startDate = staticStop
        ? new Date(state.stopDate.getTime() - duration)
        : state.startDate;
      state.stopDate = !staticStop
        ? new Date(state.startDate.getTime() - duration)
        : state.stopDate;
    },
    updateStartTime: (state, action) => {
      let startDate = action.payload.startDate;
      if (state.stopDate.getTime() < startDate.getTime())
        startDate.setDate(startDate.getDate() - 1);
      state.startDate = startDate;
      state.duration = state.stopDate.getTime() - startDate.getTime();
    },
    updateStopTime: (state, action) => {
      let { stopDate } = action.payload;
      if (stopDate.getTime() < state.startDate.getTime())
        stopDate.setDate(stopDate.getDate() + 1);
      state.stopDate = stopDate;
      state.duration = stopDate.getTime() - state.startDate.getTime();
    },
    updateStartDate: (state, action) => {
      const startDate = action.payload.startDate;
      state.startDate = startDate;
      state.stopDate = new Date(startDate.getTime() + state.duration);
    },
    resetDateInfo: (state) => {
      const newDate = new Date();
      state.startDate = newDate;
      state.stopDate = new Date(newDate);
      state.duration = 0;
    },
    // tags
    setTagsChecked: (state, action) => {
      state.tagsChecked = [...action.payload.tagsChecked];
    },
  },
});

export const {
  updateDuration,
  updateStartTime,
  updateStopTime,
  updateStartDate,
  resetDateInfo,
  setTagsChecked,
} = currentEntrySlice.actions;
export default currentEntrySlice.reducer;
