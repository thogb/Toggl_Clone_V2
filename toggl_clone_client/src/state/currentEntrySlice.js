import { createSlice } from "@reduxjs/toolkit";
import { addDays, addSeconds, subDays } from "date-fns";

const initialState = {
  description: "",
  projectId: null,
  projectName: null,
  tags: [],
  tagsChecked: [],
  duration: 0,
  startDate: new Date().getTime(),
  stopDate: new Date().getTime(),
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
  startDate: new Date().getTime(),
  stopDate: new Date().getTime(),
  timerStarted: false,
  timerInterval: null,
};

export const getInitialCurrentEntryState = () => {
  const newDate = Date.now();
  return {
    description: "",
    projectId: null,
    projectName: null,
    tags: [],
    tagsChecked: [],
    duration: 0,
    startDate: newDate,
    stopDate: newDate,
    timerStarted: false,
  };
};

export const currentEntrySlice = createSlice({
  name: "currentEntry",
  initialState: testState,
  reducers: {
    updateDuration: (state, action) => {
      const { duration, staticStop = true } = action.payload;
      state.duration = duration;
      state.startDate = staticStop
        ? state.stopDate - duration * 1000
        : state.startDate;
      state.stopDate = !staticStop
        ? state.startDate + duration * 1000
        : state.stopDate;
    },
    updateStartTime: (state, action) => {
      let startDate = action.payload.startDate;
      if (state.stopDate < startDate)
        startDate = subDays(startDate, 1).getTime();
      state.startDate = startDate;
      state.duration = Math.floor((state.stopDate - startDate) / 1000);
    },
    updateStopTime: (state, action) => {
      let { stopDate } = action.payload;
      if (stopDate < state.startDate) stopDate = addDays(stopDate, 1).getTime();
      state.stopDate = stopDate;
      state.duration = Math.floor((stopDate - state.startDate) / 1000);
    },
    updateStartDate: (state, action) => {
      const startDate = action.payload.startDate;
      state.startDate = startDate;
      state.stopDate = startDate + state.duration * 1000;
    },
    setDateInfo: (state, action) => {
      const { dateInfo } = action.payload;
      console.log(dateInfo);
      state.duration = dateInfo.duration;
      state.startDate = dateInfo.startDate;
      state.stopDate = dateInfo.stopDate;
    },
    resetDateInfo: (state) => {
      // const newDate = new Date().getTime();
      // state.startDate = newDate;
      // state.stopDate = newDate;
      // state.duration = 0;
      return getInitialCurrentEntryState();
    },
    // tags
    setTagsChecked: (state, action) => {
      state.tagsChecked = [...action.payload.tagsChecked];
    },
    setTimerStarted: (state, action) => {
      state.timerStarted = action.payload.timerStarted;
    },
    incrementDuration: (state) => {
      state.duration += 1;
    },
    startTimer: (state, action) => {
      state.startDate = new Date().getTime();
      state.timerStarted = true;
      state.timerInterval = action.payload.timerInterval;
    },
    endTimer: (state) => {
      clearInterval(state.timerInterval);
      state.stopDate = addSeconds(state.startDate, state.duration).getTime();

      // Maybe perform some stuff

      // Reset
      // state = { ...getInitialCurrentEntryState() };
      Object.assign(state, getInitialCurrentEntryState());
      console.log(state);
      // return getInitialCurrentEntryState();
    },
    toggleTimerStarted: (state, action) => {
      if (!state.timerStarted) {
      } else {
      }
      state.timerStarted = !state.timerStarted;
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
  setTimerStarted,
  toggleTimerStarted,
  incrementDuration,
  startTimer,
  endTimer,
  setDateInfo,
} = currentEntrySlice.actions;
export default currentEntrySlice.reducer;
