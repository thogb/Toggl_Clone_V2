import React, { memo } from "react";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import { useDispatch } from "react-redux";
import {
  updateBatchTEDescription,
  updateTEDescription,
} from "../../state/groupedEntryListSlice";

const TimeEntryItem = ({
  dateGroupId,
  gId,

  timeEntry,
  isChildrenOfGroup = false,
  tagList,

  //   checked = false,
  timeEntryChecked,
  timeEntryCheckedDispatch,
}) => {
  console.log("rerender " + timeEntry.id);
  // console.log(true);
  const dispatch = useDispatch();

  const onDescriptionEdit = (description) => {
    // console.log(description);
    // console.log(dateGroupId);
    // console.log(gId);
    // console.log(timeEntry.description);
    dispatch(
      updateTEDescription({ dateGroupId, gId, id: timeEntry.id, description })
    );
    // dispatch(updateBatchTEDescription({}));
    // dispatch({ type: "none" });
  };

  const onProjectEdit = (projectInfo) => {};

  const onTagsCheckedEdit = (tagsChecked) => {};

  const onDateInfoChange = (dateInfo) => {};

  const onDeleteClick = (e) => {};

  const onCheckBoxClick = () => {
    timeEntryCheckedDispatch({
      type: timeEntryCheckedActions.TOGGLE_CHECKED_LIST_ITEM,
      id: timeEntry.id,
    });
  };

  return (
    <TimeEntryItemRecord
      id={timeEntry.id}
      projectId={timeEntry.projectId}
      description={timeEntry.description}
      tagsChecked={timeEntry.tags}
      duration={timeEntry.duration}
      startDate={timeEntry.startDate}
      stopDate={timeEntry.stopDate}
      tagList={tagList}
      isChildrenOfGroup={isChildrenOfGroup}
      checked={timeEntryChecked.checkedList.indexOf(timeEntry.id) !== -1}
      showCheckbox={timeEntryChecked.showCheckbox}
      timeEntryChecked={timeEntryChecked}
      timeEntryCheckedDispatch={timeEntryCheckedDispatch}
      operations={{
        onCheckBoxClick,
        onDescriptionEdit,
        onProjectEdit,
        onTagsCheckedEdit,
        onDateInfoChange,
        onDeleteClick,
      }}
    />
  );
};

export default memo(TimeEntryItem);
