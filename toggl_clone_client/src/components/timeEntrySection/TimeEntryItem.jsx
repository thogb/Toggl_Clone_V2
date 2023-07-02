import React, { memo, useMemo } from "react";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import { useDispatch } from "react-redux";
import {
  updateBatchTEDescription,
  updateTEDescription,
  updateTETags,
} from "../../state/groupedEntryListSlice";

export const itemMenuData = {
  DUPLICATE: {
    name: "Duplicate",
    label: "Duplicate",
  },
  SPLIT: {
    name: "Split",
    label: "Split",
    disabled: true,
  },
  PIN_AS_FAVORITE: {
    name: "Pin",
    label: "Pin",
    disabled: true,
  },
  COPY_START_LINK: {
    name: "Copy",
    label: "Copy",
  },
  DELETE: {
    name: "Delete",
    label: "Delete",
    style: {
      color: "red",
    },
  },
};

const itemMenuOptions = Object.values(itemMenuData);

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

  const onMenuClick = (option) => {
    console.log(option);
  };

  // const operations = useMemo(() => {
  //   return {
  //     onCheckBoxClick,
  //     onDescriptionEdit,
  //     onProjectEdit,
  //     onTagsCheckedEdit,
  //     onDateInfoChange,
  //     onDeleteClick,
  //   };
  // }, []);

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
      menuOptions={itemMenuOptions}
      operations={{
        onCheckBoxClick,
        onDescriptionEdit,
        onProjectEdit,
        onTagsCheckedEdit,
        onDateInfoChange,
        onDeleteClick,
        onMenuClick,
      }}
    />
  );
};

export default memo(TimeEntryItem);
