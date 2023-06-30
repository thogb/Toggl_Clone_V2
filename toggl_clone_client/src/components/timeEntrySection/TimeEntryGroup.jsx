import React, { memo, useMemo, useState } from "react";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import TimeEntryItem from "./TimeEntryItem";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";

const TimeEntryGroup = ({
  dateGroupId,

  groupedEntry,
  tagList,
  timeEntryChecked,
  timeEntryCheckedDispatch,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const checkedList = timeEntryChecked.checkedList;

  const checked = useMemo(() => {
    if (groupedEntry.entries.length > checkedList.length) return false;
    return groupedEntry.entries.every(
      (entry) => checkedList.indexOf(entry.id) !== -1
    );
  }, [checkedList]);

  const indeterminate = useMemo(() => {
    return (
      !checked &&
      checkedList.length > 0 &&
      groupedEntry.entries.some((entry) => checkedList.indexOf(entry.id) !== -1)
    );
  }, [checkedList]);

  const isCheckOn = checked || indeterminate;

  const onDescriptionEdit = (description) => {};

  const onProjectEdit = (projectInfo) => {};

  const onTagsCheckedEdit = (tagsChecked) => {};

  const onDateInfoChange = (dateInfo) => {};

  const onDeleteClick = (e) => {};

  const onCheckBoxClick = () => {
    const idList = groupedEntry.entries.map((entry) => entry.id);
    if (isCheckOn) {
      timeEntryCheckedDispatch({
        type: timeEntryCheckedActions.TOGGLE_OFF_FROM_LIST,
        inList: idList,
      });
    } else {
      timeEntryCheckedDispatch({
        type: timeEntryCheckedActions.APPEND_TO_CHECK_LIST,
        inList: idList,
      });
    }
  };

  const onExpandButonClick = (e) => {
    setIsExpanded(!isExpanded);
  };

  const operations = useMemo(() => {
    return {
      onCheckBoxClick,
      onDescriptionEdit,
      onProjectEdit,
      onTagsCheckedEdit,
      onDateInfoChange,
      onDeleteClick,
      onExpandButonClick,
    };
  }, []);

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
        checked={checked}
        indeterminate={indeterminate}
        isTypeHeader={true}
        isExpanded={isExpanded}
        groupSize={groupedEntry.entries.length}
        showCheckbox={timeEntryChecked.showCheckbox}
        timeEntryChecked={timeEntryChecked}
        timeEntryCheckedDispatch={timeEntryCheckedDispatch}
        operations={operations}
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
