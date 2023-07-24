import React, { memo } from "react";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  addTE,
  deleteTE,
  updateTEDateInfo,
  updateTEDescription,
  updateTETags,
  useAddTimeEntryMutation,
  useDeleteTimeEntryMutation,
  usePatchTimeEntryMutation,
} from "../../state/groupedEntryListSlice";
import { startTimer } from "../../state/currentEntrySlice";
import { timeEntryUtil } from "../../utils/TimeEntryUtil";
import { listUtil } from "../../utils/listUtil";
import { compare } from "fast-json-patch";

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

  //   checked = false,
  timeEntryChecked,
  timeEntryCheckedDispatch,
}) => {
  const dispatch = useDispatch();
  const workspaceId = timeEntry.workspaceId;
  const tagList =
    useSelector((state) => state.tags.tagNames)[workspaceId] ?? [];

  const [patchTimeEntry] = usePatchTimeEntryMutation();
  const [deleteTimeEntry] = useDeleteTimeEntryMutation();
  const [addTimeEntry] = useAddTimeEntryMutation();

  const onDescriptionEdit = async (description) => {
    if (timeEntry.description !== description) {
      const oldDescription = timeEntry.description;
      dispatch(
        updateTEDescription({ dateGroupId, gId, id: timeEntry.id, description })
      );
      const diff = compare({ description: "" }, { description });
      try {
        await patchTimeEntry({
          id: timeEntry.id,
          patch: diff,
        }).unwrap();
      } catch (error) {
        dispatch(
          updateTEDescription({
            dateGroupId,
            gId,
            id: timeEntry.id,
            description: oldDescription,
          })
        );
      }
    }
  };

  const onProjectEdit = async (projectInfo) => {};

  const onTagsCheckedEdit = async (tagsChecked) => {
    if (!listUtil.isListEqual(tagsChecked, timeEntry.tags)) {
      const diff = compare({ tags: null }, { tags: tagsChecked });
      const oldTags = [...timeEntry.tags];
      dispatch(
        updateTETags({ dateGroupId, gId, id: timeEntry.id, tags: tagsChecked })
      );
      try {
        await patchTimeEntry({
          id: timeEntry.id,
          patch: diff,
        }).unwrap();
      } catch (error) {
        dispatch(
          updateTETags({
            dateGroupId,
            gId,
            id: timeEntry.id,
            tags: oldTags,
          })
        );
      }
    }
  };

  const onDateInfoChange = async (dateInfo) => {
    if (
      !timeEntryUtil.isDateInfoEqualBySeconds(
        dateInfo.initialDateInfo,
        dateInfo.finalDateInfo
      )
    ) {
      const diff = compare(
        timeEntryUtil.getInvalidDate(),
        dateInfo.finalDateInfo
      );
      dispatch(
        updateTEDateInfo({
          dateGroupId,
          gId,
          id: timeEntry.id,
          dateInfo: timeEntryUtil.convertDateInfoToIntDateInfo(
            dateInfo.finalDateInfo
          ),
        })
      );
      try {
        await patchTimeEntry({
          id: timeEntry.id,
          patch: diff,
        }).unwrap();
      } catch (error) {
        dispatch(
          updateTEDateInfo({
            dateGroupId,
            gId,
            id: timeEntry.id,
            dateInfo: timeEntryUtil.convertDateInfoToIntDateInfo(
              dateInfo.initialDateInfo
            ),
          })
        );
      }
    }
  };

  const onDeleteClick = async (e) => {
    const cloned = timeEntryUtil.cloneTimeEntry(timeEntry);
    dispatch(deleteTE({ dateGroupId, gId, id: timeEntry.id }));
    try {
      deleteTimeEntry({ id: timeEntry.id });
    } catch (error) {
      dispatch(addTE({ timeEntry: cloned }));
    }
  };

  const onCheckBoxClick = () => {
    timeEntryCheckedDispatch({
      type: timeEntryCheckedActions.TOGGLE_CHECKED_LIST_ITEM,
      timeEntry: timeEntry,
    });
  };

  const onStartButtonClick = async () => {
    // dispatch(startTimer({entryData:}));
    dispatch(startTimer({ timeEntry: timeEntry }));
  };

  const onMenuClick = (option) => {
    switch (option.name) {
      case itemMenuData.DUPLICATE.name:
        onDuplicateClick();
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

  const onDuplicateClick = async () => {
    try {
      const payload = await addTimeEntry({
        timeEntry: timeEntryUtil.convertToApiDTO(timeEntry),
      }).unwrap();
      const responseTE = timeEntryUtil.createFromApiResponse(
        timeEntryUtil.cloneTimeEntry(payload)
      );
      dispatch(addTE({ timeEntry: responseTE }));
    } catch (error) {}
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
      checked={
        timeEntryChecked.checkedList.findIndex(
          (te) => te.id === timeEntry.id
        ) !== -1
      }
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
