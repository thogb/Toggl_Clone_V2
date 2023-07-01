import React, { memo, useMemo } from "react";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import { useDispatch } from "react-redux";
import {
  updateBatchTEDescription,
  updateTEDescription,
  updateTETags,
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
  const dispatch = useDispatch();

  const onDescriptionEdit = (description) => {
    dispatch(
      updateTEDescription({ dateGroupId, gId, id: timeEntry.id, description })
    );
  };

  const onProjectEdit = (projectInfo) => {};

  const onTagsCheckedEdit = (tagsChecked) => {
    dispatch(
      updateTETags({ dateGroupId, gId, id: timeEntry.id, tags: tagsChecked })
    );
  };

  const onDateInfoChange = (dateInfo) => {};

  const onDeleteClick = (e) => {};

  const onCheckBoxClick = () => {
    timeEntryCheckedDispatch({
      type: timeEntryCheckedActions.TOGGLE_CHECKED_LIST_ITEM,
      id: timeEntry.id,
    });
  };

  const operations = useMemo(() => {
    return {
      onCheckBoxClick,
      onDescriptionEdit,
      onProjectEdit,
      onTagsCheckedEdit,
      onDateInfoChange,
      onDeleteClick,
    };
  }, []);

  console.log("rerender " + timeEntry.id);

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
      operations={operations}
    />
  );
};

export default memo(TimeEntryItem);
