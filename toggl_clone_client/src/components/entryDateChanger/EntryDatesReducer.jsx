export const getIntialEntryDates = () => {
  const newDate = new Date();
  return {
    duration: 0,
    startDate: newDate,
    stopDate: new Date(newDate),
  };
};

const actions = {
  UPDATE_DURATION: "UPDATE_DURATION",
  UPDATE_START_TIME: "UPDATE_START_TIME",
  UPDATE_STOP_TIME: "UPDATE_STOP_TIME",
  UPDATE_START_DATE: "UPDATE_START_DATE",
  RESET_ENTRY_DATES: "RESET_ENTRY_DATES",
  SET_DURATION: "SET_DURATION",
  SET_START_DATE: "SET_START_DATE",
  SET_STOP_DATE: "SET_STOP_DATE",
  SET_DATE_INFO: "SET_DATE_INFO",
};

export const entryDatesReducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_DURATION:
      const newDuration = action.duration;
      return {
        ...state,
        duration: newDuration,
        startDate: action.staticStop
          ? new Date(state.stopDate.getTime() - newDuration * 1000)
          : state.startDate,
        stopDate: !action.staticStop
          ? new Date(state.startDate.getTime() - newDuration * 1000)
          : state.stopDate,
      };
    case actions.UPDATE_START_TIME:
      return {
        ...state,
        startDate: action.startDate,
        duration:
          (state.stopDate.getTime() - action.startDate.getTime()) / 1000,
      };
    case actions.UPDATE_STOP_TIME:
      let { stopDate } = action;
      if (stopDate.getTime() < state.startDate.getTime())
        stopDate.setDate(stopDate.getDate() + 1);
      return {
        ...state,
        stopDate: stopDate,
        duration: (stopDate.getTime() - state.startDate.getTime()) / 1000,
      };
    case actions.UPDATE_START_DATE:
      return {
        ...state,
        startDate: action.startDate,
        stopDate: new Date(action.startDate.getTime() + state.duration * 1000),
      };
    case actions.SET_DURATION:
      return {
        ...state,
        duration: action.duration,
      };
    case actions.SET_START_DATE:
      return {
        ...state,
        startDate: action.startDate,
      };
    case actions.SET_STOP_DATE:
      return {
        ...state,
        stopDate: action.stopDate,
      };
    case actions.SET_DATE_INFO:
      return {
        ...state,
        ...action.dateInfo,
      };
    case actions.RESET_ENTRY_DATES:
      return getIntialEntryDates();
    default:
      return state;
  }
};

export { actions as entryDatesActions };
