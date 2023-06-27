export const getIntialTimeEntryCheckedData = () => {
  return {
    showCheckbox: false,
    checkedList: [],
  };
};

const actions = {
  TOGGLE_SHOW_CHECKBOX: "TOGGLE_SHOW_CHECKBOX",
  TOGGLE_CHECKED_LIST_ITEM: "TOGGLE_CHECKED_LIST_ITEM",
  RESET_CHECKED_LIST: "RESET_CHECKED_LIST",
  TOGGLE_AND_RESET_CHECKED_LIST: "TOGGLE_AND_RESET_CHECKED_LIST",
  SET_CHECKED_LIST: "SET_CHECKED_LIST",
};

export const timeEntryCheckedReducer = (state, action) => {
  switch (action.type) {
    case actions.TOGGLE_SHOW_CHECKBOX:
      return {
        ...state,
        showCheckbox: !state.showCheckbox,
      };
    case actions.TOGGLE_CHECKED_LIST_ITEM:
      const newList = [...state.checkedList];
      const ind = newList.indexOf(action.id);

      if (ind > -1) {
        newList.splice(ind, 1);
      } else {
        newList.push(action.id);
      }

      return {
        ...state,
        checkedList: newList,
      };
    case actions.RESET_CHECKED_LIST:
      return {
        ...state,
        checkedList: [],
      };
    case actions.TOGGLE_AND_RESET_CHECKED_LIST:
      return {
        showCheckbox: !state.showCheckbox,
        checkedList: [],
      };
    case actions.SET_CHECKED_LIST:
      return {
        ...state,
        checkedList: [...action.checkedList],
      };
    default:
      return state;
  }
};

export { actions as timeEntryCheckedActions };
