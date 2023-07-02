import React, { memo, useMemo, useState } from "react";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import TimeEntryItem, { itemMenuData } from "./TimeEntryItem";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import { useDispatch } from "react-redux";
import { deleteGE } from "../../state/groupedEntryListSlice";

const groupMenuData = {
  PIN_AS_FAVORITE: itemMenuData.PIN_AS_FAVORITE,
  COPY_START_LINK: itemMenuData.COPY_START_LINK,
  DELETE: itemMenuData.DELETE,
};

const groupMenuOptions = Object.values(groupMenuData);

const TimeEntryGroup = ({
  dateGroupId,

  groupedEntry,
  tagList,
  timeEntryChecked,
  timeEntryCheckedDispatch,
}) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [testBool, setTestBool] = useState(false);

  const checkedList = timeEntryChecked.checkedList;

  const checkboxInfo = useMemo(() => {
    let checked = !(groupedEntry.entries.length > checkedList.length);
    checked =
      checked &&
      groupedEntry.entries.every(
        (entry) => checkedList.indexOf(entry.id) !== -1
      );
    console.log("checked " + checked);
    const indeterminate =
      !checked &&
      checkedList.length > 0 &&
      groupedEntry.entries.some(
        (entry) => checkedList.indexOf(entry.id) !== -1
      );
    return {
      checked,
      indeterminate,
      isCheckOn: checked || indeterminate,
    };
  }, [checkedList]);

  // const checked = useMemo(() => {
  //   if (groupedEntry.entries.length > checkedList.length) return false;
  //   return groupedEntry.entries.every(
  //     (entry) => checkedList.indexOf(entry.id) !== -1
  //   );
  // }, [checkedList]);

  // const indeterminate = useMemo(() => {
  //   return (
  //     !checked &&
  //     checkedList.length > 0 &&
  //     groupedEntry.entries.some((entry) => checkedList.indexOf(entry.id) !== -1)
  //   );
  // }, [checkedList]);

  // const isCheckOn = checked || indeterminate;

  const onDescriptionEdit = (description) => {};

  const onProjectEdit = (projectInfo) => {};

  const onTagsCheckedEdit = (tagsChecked) => {};

  const onDateInfoChange = (dateInfo) => {};

  const onDeleteClick = (e) => {
    console.log("delte clciked group");
    dispatch(deleteGE({ dateGroupId, gId: groupedEntry.gId }));
  };

  const onCheckBoxClick = (e) => {
    console.log(" in box click + " + checkboxInfo.isCheckOn);
    const idList = groupedEntry.entries.map((entry) => entry.id);
    timeEntryCheckedDispatch({
      type: timeEntryCheckedActions.TOGGLE_FROM_GROUP,
      checkOn: checkboxInfo.isCheckOn,
      inList: idList,
    });
  };

  const onExpandButonClick = (e) => {
    setIsExpanded((isExpanded) => !isExpanded);
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
  //     onExpandButonClick,
  //   };
  // }, []);

  return (
    <>
      <TimeEntryItemRecord
        tagList={tagList}
        projectId={groupedEntry.projectId}
        description={groupedEntry.description}
        tagsChecked={groupedEntry.tags}
        duration={groupedEntry.totalDuration}
        startDate={groupedEntry.startDate}
        stopDate={groupedEntry.stopDate}
        checked={checkboxInfo.checked}
        indeterminate={checkboxInfo.indeterminate}
        isTypeHeader={true}
        isExpanded={isExpanded}
        groupSize={groupedEntry.entries.length}
        showCheckbox={timeEntryChecked.showCheckbox}
        timeEntryChecked={timeEntryChecked}
        timeEntryCheckedDispatch={timeEntryCheckedDispatch}
        menuOptions={groupMenuOptions}
        operations={{
          onCheckBoxClick,
          onDescriptionEdit,
          onProjectEdit,
          onTagsCheckedEdit,
          onDateInfoChange,
          onDeleteClick,
          onExpandButonClick,
          onMenuClick,
        }}
      />
      {isExpanded &&
        groupedEntry.entries.map((entry) => (
          <TimeEntryItem
            key={entry.id}
            dateGroupId={dateGroupId}
            gId={groupedEntry.gId}
            tagList={tagList}
            timeEntry={entry}
            isChildrenOfGroup={true}
            //   checked={timeEntryChecked.checkedList.indexOf(entry.id) !== -1}
            timeEntryChecked={timeEntryChecked}
            timeEntryCheckedDispatch={timeEntryCheckedDispatch}
          />
        ))}
    </>
  );
};

export default memo(TimeEntryGroup);
