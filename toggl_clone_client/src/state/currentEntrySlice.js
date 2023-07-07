import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDays, addSeconds, subDays } from "date-fns";
import { addTE, addTimeEntry } from "./groupedEntryListSlice";

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

const name = "currentEntry";
const getIntialEntryData = () => {
  return {
    description: "",
    projectId: null,
    projectName: null,
    tagsChecked: [],
    duration: 0,
    startDate: Date.now(),
    stopDate: Date.now(),
  };
};

const createTimerInterval = (dispatch) => {
  return setInterval(() => {
    dispatch(incrementDuration());
  }, 1000);
};

export const currentEntrySlice = createSlice({
  name: name,
  initialState: testState,
  reducers: {
    updateDescription: (state, action) => {
      const { description } = action.payload;
      state.description = description.trim();
    },
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
      state.duration = dateInfo.duration;
      state.startDate = dateInfo.startDate;
      state.stopDate = dateInfo.stopDate;
    },
    resetDateInfo: (state) => {
      const newDate = Date.now();
      state.startDate = newDate;
      state.stopDate = newDate;
      state.duration = 0;
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
    resetEntryData: (state) => {
      return {
        ...state,
        ...getIntialEntryData(),
      };
    },
    resetEntryDataAndTimer: (state) => {
      return {
        ...state,
        ...getIntialEntryData(),
        timerStarted: false,
        timerInterval: null,
      };
    },
    setStartTimerData: (state, action) => {
      const { entryData, timerInterval } = action.payload;
      if (entryData !== undefined) {
        state.description = entryData.description;
        state.projectId = entryData.projectId;
        state.tagsChecked = [...entryData.tags];
        // state.duration = entryData.duration;
        // state.startDate = entryData.startDate;
        // state.stopDate = entryData.startDate;
      }
      state.startDate = new Date().getTime();
      state.timerStarted = true;
      state.timerInterval = timerInterval;
    },
    // endTimer: (state) => {
    //   clearInterval(state.timerInterval);
    //   return {
    //     ...state,
    //     ...{
    //       description: "",
    //       projectId: null,
    //       projectName: null,
    //       tagsChecked: [],
    //       duration: 0,
    //       startDate: Date.now(),
    //       stopDate: Date.now(),
    //       timerStarted: false,
    //     },
    //   };
    // },
    resetCurrentEntryInfo: (state) => {
      return {
        ...state,
        ...{
          description: "",
          projectId: null,
          projectName: null,
          tagsChecked: [],
          duration: 0,
          startDate: Date.now(),
          stopDate: Date.now(),
          timerStarted: false,
        },
      };
    },
    completeCurrentEntr: (state) => {},
    toggleTimerStarted: (state, action) => {
      if (!state.timerStarted) {
      } else {
      }
      state.timerStarted = !state.timerStarted;
    },
  },
});

const createExtraActions = () => {
  const startTimer = () => {
    return createAsyncThunk(
      `${name}/startTimer`,
      async function (arg, { getState, dispatch }) {
        const state = getState();
        const currentEntry = state.currentEntry;
        const entryData = arg?.entryData;
        if (currentEntry.timerStarted) {
          dispatch(reducers.endTimer());
        }
        const timerInterval = createTimerInterval(dispatch);
        dispatch(setStartTimerData({ entryData: entryData, timerInterval }));
      }
    );
  };

  const endTimer = () => {
    return createAsyncThunk(
      `${name}/endTimer`,
      async (arg, { getState, dispatch }) => {
        const state = getState();
        const currentEntry = state.currentEntry;
        const entryData = {
          description: currentEntry.description,
          projectId: currentEntry.projectId,
          tags: [...currentEntry.tagsChecked],
          duration: currentEntry.duration,
          startDate: currentEntry.startDate,
          stopDate: addSeconds(
            currentEntry.startDate,
            currentEntry.duration
          ).getTime(),
        };
        clearInterval(currentEntry.timerInterval);
        dispatch(resetEntryDataAndTimer());
        dispatch(addTimeEntry({ entryData: entryData }));
      }
    );
  };

  const reducers = {
    startTimer: startTimer(),
    endTimer: endTimer(),
  };

  return reducers;
};

const allActions = { ...currentEntrySlice.actions, ...createExtraActions() };

export const {
  updateDescription,
  updateDuration,
  updateStartTime,
  updateStopTime,
  updateStartDate,
  resetDateInfo,
  setTagsChecked,
  setTimerStarted,
  toggleTimerStarted,
  incrementDuration,
  resetCurrentEntryInfo,
  setDateInfo,
  setStartTimerData,
  resetEntryDataAndTimer,
  resetEntryData,

  startTimer,
  endTimer,
} = allActions;
export default currentEntrySlice.reducer;
