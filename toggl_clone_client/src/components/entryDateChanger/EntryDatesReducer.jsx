export const getIntialEntryDates = () => {
  const newDate = new Date();
  return {
    durationMin: 0,
    startDate: newDate,
    stopDate: new Date(newDate),
  };
};

const actions = {
  UPDATE_MINUTE: "UPDATE_MINUTE",
  UPDATE_START_TIME: "UPDATE_START_TIME",
  UPDATE_STOP_TIME: "UPDATE_STOP_TIME",
  UPDATE_START_DATE: "UPDATE_START_DATE",
  RESET_ENTRY_DATES: "RESET_ENTRY_DATES",
};

export const entryDatesReducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_MINUTE:
      const newDuration = action.durationMin;
      return {
        ...state,
        durationMin: newDuration,
        startDate: action.staticStop
          ? new Date(state.stopDate.getTime() - newDuration * 60 * 1000)
          : state.startDate,
        stopDate: !action.staticStop
          ? new Date(state.startDate.getTime() - newDuration * 60 * 1000)
          : state.stopDate,
      };
    case actions.UPDATE_START_TIME:
      return {
        ...state,
        startDate: action.startDate,
        durationMin:
          (state.stopDate.getTime() - action.startDate.getTime()) / (60 * 1000),
      };
    case actions.UPDATE_STOP_TIME:
      let { stopDate } = action;
      if (stopDate.getTime() < state.startDate.getTime())
        stopDate.setDate(stopDate.getDate() + 1);
      return {
        ...state,
        stopDate: stopDate,
        durationMin:
          (stopDate.getTime() - state.startDate.getTime()) / (60 * 1000),
      };
    case actions.UPDATE_START_DATE:
      return {
        ...state,
        startDate: action.startDate,
        stopDate: new Date(
          action.startDate.getTime() + state.durationMin * 60 * 1000
        ),
      };
    case actions.RESET_ENTRY_DATES:
      return getIntialEntryDates();
    default:
      return state;
  }
};

export { actions as entryDatesActions };
