import React, { memo, useMemo, useState } from "react";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import TimeEntryItem, { itemMenuData } from "./TimeEntryItem";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGE,
  updateGEDescription,
  updateGEProjectId,
  updateGETags,
  useBatchDeleteTimeEntryMutation,
  useBatchPatchTimeEntryMutation,
} from "../../state/groupedEntryListSlice";
import { listUtil } from "../../utils/listUtil";
import { timeEntryUtil } from "../../utils/TimeEntryUtil";
import { compare } from "fast-json-patch";
import { startTimer } from "../../state/currentEntrySlice";
import { groupedEntryUtil } from "../../utils/groupedEntryUtil";

const groupMenuData = {
  PIN_AS_FAVORITE: itemMenuData.PIN_AS_FAVORITE,
  COPY_START_LINK: itemMenuData.COPY_START_LINK,
  DELETE: itemMenuData.DELETE,
};

const groupMenuOptions = Object.values(groupMenuData);

const TimeEntryGroup = ({
  dateGroupId,

  groupedEntry,
  timeEntryChecked,
  timeEntryCheckedDispatch,
}) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const workspaceId = groupedEntry.workspaceId;
  const tagList =
    useSelector((state) => state.tags.tagNames)[workspaceId] ?? [];

  const [batchDeleteTimeEntry] = useBatchDeleteTimeEntryMutation();
  const [batchPatchTimeEntry] = useBatchPatchTimeEntryMutation();

  const checkedList = timeEntryChecked.checkedList;

  const checkboxInfo = useMemo(() => {
    const checkedIdList = timeEntryUtil.convertTEListToTEIdList(checkedList);
    let checked = !(groupedEntry.entries.length > checkedList.length);
    checked =
      checked &&
      groupedEntry.entries.every(
        (entry) => checkedIdList.indexOf(entry.id) !== -1
      );
    const indeterminate =
      !checked &&
      checkedList.length > 0 &&
      groupedEntry.entries.some(
        (entry) => checkedIdList.indexOf(entry.id) !== -1
      );
    return {
      checked,
      indeterminate,
      isCheckOn: checked || indeterminate,
    };
  }, [checkedList]);

  const onDescriptionEdit = async (description) => {
    if (description !== groupedEntry.description) {
      const entries = groupedEntry.entries;
      try {
        const ids = timeEntryUtil.convertTEListToTEIdList(entries);
        const patch = compare({ description: "" }, { description });
        const payload = await batchPatchTimeEntry({
          ids: ids,
          patch: patch,
        }).unwrap();
        dispatch(
          updateGEDescription({
            dateGroupId,
            gId: groupedEntry.gId,
            description,
          })
        );
      } catch (error) {}
    }
  };

  const onProjectEdit = (projectInfo) => {
    dispatch(
      updateGEProjectId({ dateGroupId, gId: groupedEntry.gId, projectInfo })
    );
  };

  const onTagsCheckedEdit = async (tagsChecked) => {
    if (!listUtil.isListEqual(tagsChecked, groupedEntry.tags)) {
      const entries = groupedEntry.entries;
      try {
        const ids = timeEntryUtil.convertTEListToTEIdList(entries);
        const patch = compare({ tags: null }, { tags: tagsChecked });
        const payload = await batchPatchTimeEntry({
          ids: ids,
          patch: patch,
        }).unwrap();
        dispatch(
          updateGETags({
            dateGroupId,
            gId: groupedEntry.gId,
            tags: tagsChecked,
          })
        );
      } catch (error) {}
    }
  };

  const onDateInfoChange = (dateInfo) => {};

  const onDeleteClick = async (e) => {
    const entries = groupedEntry.entries;
    dispatch(deleteGE({ dateGroupId, gId: groupedEntry.gId }));
    try {
      const ids = timeEntryUtil.convertTEListToTEIdList(entries);
      const payload = await batchDeleteTimeEntry({ ids: ids }).unwrap();
    } catch (error) {}
  };

  const onCheckBoxClick = (e) => {
    timeEntryCheckedDispatch({
      type: timeEntryCheckedActions.TOGGLE_FROM_GROUP,
      checkOn: checkboxInfo.isCheckOn,
      inList: groupedEntry.entries,
    });
  };

  const onStartButtonClick = (e) => {
    dispatch(
      startTimer({ timeEntry: groupedEntryUtil.getEntryData(groupedEntry) })
    );
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
        variant="group"
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
          onStartButtonClick,
        }}
      />
      {isExpanded &&
        groupedEntry.entries.map((entry) => (
          <TimeEntryItem
            key={entry.id}
            dateGroupId={dateGroupId}
            gId={groupedEntry.gId}
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
