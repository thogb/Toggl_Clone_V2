import React, { memo } from "react";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import { useDispatch } from "react-redux";
import {
  deleteTE,
  updateTEDateInfo,
  updateTEDescription,
  updateTETags,
} from "../../state/groupedEntryListSlice";
import { startTimer } from "../../state/currentEntrySlice";
import { timeEntryUtil } from "../../utils/TimeEntryUtil";

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

  const onDateInfoChange = (dateInfo) => {
    dispatch(
      updateTEDateInfo({
        dateGroupId,
        gId,
        id: timeEntry.id,
        dateInfo: {
          duration: dateInfo.duration,
          startDate: dateInfo.startDate.getTime(),
          stopDate: dateInfo.stopDate.getTime(),
        },
      })
    );
  };

  const onDeleteClick = (e) => {
    console.log("delete clicked");
    dispatch(deleteTE({ dateGroupId, gId, id: timeEntry.id }));
  };

  const onCheckBoxClick = () => {
    timeEntryCheckedDispatch({
      type: timeEntryCheckedActions.TOGGLE_CHECKED_LIST_ITEM,
      id: timeEntry.id,
    });
  };

  const onStartButtonClick = async () => {
    // dispatch(startTimer({entryData:}));
    dispatch(
      startTimer({ entryData: timeEntryUtil.cloneTimeEntry(timeEntry) })
    );
  };

  const onMenuClick = (option) => {
    switch (option.name) {
      case itemMenuData.DUPLICATE.name:
        break;
      case itemMenuData.SPLIT.name:
        break;
      case itemMenuData.PIN_AS_FAVORITE.name:
        break;
      case itemMenuData.COPY_START_LINK.name:
        break;
      case itemMenuData.DELETE.name:
        onDeleteClick();
        break;
      default:
        break;
    }
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

  // console.log("rerender " + timeEntry.id);

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
        onStartButtonClick,
      }}
    />
  );
};

export default memo(TimeEntryItem);
