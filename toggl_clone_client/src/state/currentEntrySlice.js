import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { addDays, addSeconds, differenceInSeconds, subDays } from "date-fns";
import { addTE, addTimeEntry } from "./groupedEntryListSlice";
import { timeEntryUtil } from "../utils/TimeEntryUtil";
import { ttCloneApi } from "./apiSlice";
import { compare } from "fast-json-patch";
import { workspaceActions } from "./workspaceSlice";

export const getInitialCurrentEntryState = () => {
  const newDate = Date.now();
  return {
    id: -1,
    description: "",
    // project: {
    //   id: 1,
    //   name: ""
    // }
    projectId: null,
    tagsChecked: [],
    duration: 0,
    workspaceId: -1,
    startDate: newDate,
    stopDate: newDate,
    timerStarted: false,
  };
};

const getTEFromCurrentEntry = (currentEntry) => {
  return {
    id: currentEntry.id,
    description: currentEntry.description,
    projectId: currentEntry.projectId,
    tags: [...currentEntry.tagsChecked],
    duration: currentEntry.duration,
    startDate: currentEntry.startDate,
    stopDate: currentEntry.stopDate,
    workspaceId: currentEntry.workspaceId,
  };
};

const name = "currentEntry";

export const createTimerInterval = (dispatch) => {
  return setInterval(() => {
    dispatch(incrementDuration());
  }, 1000);
};

export const currentEntrySlice = createSlice({
  name: name,
  initialState: getInitialCurrentEntryState(),
  reducers: {
    updateDescription: (state, action) => {
      const { description } = action.payload;
      state.description = description.trim();
    },
    updateWorkspaceId: (state, action) => {
      const { workspaceId } = action.payload;
      state.workspaceId = workspaceId;
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
      let startDate = new Date(action.payload.startDate).getTime();
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
    addTagsChecked: (state, action) => {
      state.tagsChecked = [...state.tagsChecked, action.payload.tagChecked];
    },
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
        ...getInitialCurrentEntryState(),
      };
    },
    resetEntryDataAndTimer: (state) => {
      return {
        ...state,
        ...getInitialCurrentEntryState(),
        timerStarted: false,
        timerInterval: null,
      };
    },
    setStartTimerData: (state, action) => {
      const { timeEntry, timerInterval } = action.payload;
      state.id = timeEntry.id;
      state.description = timeEntry.description;
      state.projectId = timeEntry.projectId;
      state.tagsChecked = [...timeEntry.tags];
      state.startDate = timeEntry.startDate;
      // state.duration = -1;
      // state.stopDate = null;
      state.workspaceId = timeEntry.workspaceId;
      state.duration = timeEntry.duration;
      state.stopDate = timeEntry.startDate;
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
    changeProject: (state, action) => {
      const { projectId, workspaceId } = action.payload;
      if (workspaceId) {
        currentEntrySlice.caseReducers.changeWorkspace(state, {
          payload: {
            newWorkspaceId: workspaceId,
          },
        });
        state.projectId = projectId;
      }
    },
    changeWorkspace: (state, action) => {
      console.log(action);
      const { newWorkspaceId } = action.payload;
      console.log(state.workspaceId);
      console.log(newWorkspaceId);
      if (state.workspaceId !== newWorkspaceId) {
        console.log("Chaning workspaceid");
        state.projectId = null;
        state.tagsChecked = [];
        state.workspaceId = newWorkspaceId;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(workspaceActions.changeWorkspace, (state, action) => {
      if (
        !state.timerStarted &&
        state.projectId === null &&
        state.tagsChecked?.length === 0
      ) {
        state.workspaceId = action.payload.workspaceId;
      }
    });
    builder.addMatcher(
      ttCloneApi.endpoints.getWorkspaces.matchFulfilled,
      (state, action) => {
        if (!state.timerStarted) {
          state.workspaceId = action.payload[0].id;
        }
      }
    );
  },
});

const createExtraActions = () => {
  const startTimer = () => {
    return createAsyncThunk(
      `${name}/startTimer`,
      async function (
        { timeEntry, fromServer = false },
        { getState, dispatch }
      ) {
        const state = getState();
        const currentEntry = state.currentEntry;
        if (currentEntry.timerStarted) {
          try {
            await dispatch(reducers.endTimer());
          } catch (error) {
            return;
          }
        }
        const cloned = timeEntryUtil.cloneTimeEntry(timeEntry);
        let responseTE = timeEntry;

        if (!fromServer) {
          try {
            cloned.startDate = Date.now();
            cloned.duration = -1;
            cloned.stopDate = null;
            const { data } = await dispatch(
              ttCloneApi.endpoints.addTimeEntry.initiate({
                timeEntry: timeEntryUtil.convertToApiDTO(cloned),
              })
            );
            responseTE = timeEntryUtil.createFromApiResponse(
              timeEntryUtil.cloneTimeEntry(data)
            );
            responseTE.duration = 0;
          } catch (error) {}
        } else {
          responseTE.duration = Math.abs(
            differenceInSeconds(responseTE.startDate, Date.now())
          );
        }
        const timerInterval = createTimerInterval(dispatch);
        dispatch(setStartTimerData({ timeEntry: responseTE, timerInterval }));
      }
    );
  };

  const endTimer = () => {
    return createAsyncThunk(
      `${name}/endTimer`,
      async (arg, { getState, dispatch }) => {
        const state = getState();
        const currentEntry = state.currentEntry;
        const stopDate = Date.now();
        const duration = Math.abs(
          differenceInSeconds(stopDate, currentEntry.startDate)
        );
        const patch = compare(
          {
            duration: null,
          },
          { duration: duration }
        );
        const timeEntry = {
          ...getTEFromCurrentEntry(currentEntry),
          duration: duration,
          stopDate: stopDate,
        };
        try {
          const { data } = await dispatch(
            ttCloneApi.endpoints.patchTimeEntry.initiate({
              id: timeEntry.id,
              patch: patch,
            })
          );
          clearInterval(currentEntry.timerInterval);
          dispatch(resetEntryDataAndTimer());
          dispatch(
            updateWorkspaceId({
              workspaceId: state.workspaces.currentWorkspace.id,
            })
          );
          dispatch(addTE({ timeEntry: timeEntry }));
        } catch (error) {}
      }
    );
  };

  const deleteStartedTimer = () => {
    return createAsyncThunk(
      `${name}/endTimer`,
      async (arg, { getState, dispatch }) => {
        const state = getState();
        const currentEntry = state.currentEntry;

        try {
          const { data } = await dispatch(
            ttCloneApi.endpoints.deleteTimeEntry.initiate({
              id: currentEntry.id,
            })
          );
          clearInterval(currentEntry.timerInterval);
          dispatch(resetEntryDataAndTimer());
          dispatch(
            updateWorkspaceId({
              workspaceId: state.workspaces.currentWorkspace.id,
            })
          );
        } catch (error) {}
      }
    );
  };

  const reducers = {
    startTimer: startTimer(),
    endTimer: endTimer(),
    deleteStartedTimer: deleteStartedTimer(),
  };

  return reducers;
};

const allActions = { ...currentEntrySlice.actions, ...createExtraActions() };

export const {
  updateWorkspaceId,
  updateDescription,
  updateDuration,
  updateStartTime,
  updateStopTime,
  updateStartDate,
  resetDateInfo,
  addTagsChecked,
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
  deleteStartedTimer,

  changeProject,
  changeWorkspace,
} = allActions;
export default currentEntrySlice.reducer;
