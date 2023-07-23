import React, { memo, useState } from "react";
import TimeEntryItemBase, {
  RightTools,
  TimeEntryLeftSection,
  TimeEntryRightSection,
} from "./TimeEntryItemBase";
import { Stack, Typography } from "@mui/material";
import TTTextButton from "../ttTextButton/TTTextButton";
import SubButton from "../subButton/SubButton";
import ChecklistIcon from "@mui/icons-material/Checklist";
import styled from "@emotion/styled";
import { grey, red } from "@mui/material/colors";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import { formatSecondHMMSS } from "../../utils/TTDateUtil";
import { useDispatch, useSelector } from "react-redux";
import {
  addTE,
  deleteBatchTE,
  deleteDGE,
  updateBatchTE,
  useBatchDeleteTimeEntryMutation,
  useBatchPatchTimeEntryMutation,
} from "../../state/groupedEntryListSlice";
import TimeEntryInputModal, {
  TEInputModalFromTEs,
} from "../timeEntryInputModal/TimeEntryInputModal";
import { timeEntryUtil } from "../../utils/TimeEntryUtil";
import { compare } from "fast-json-patch";

const OutlinedIconButton = styled("button")(({ theme }) => ({
  border: "1px solid",
  borderRadius: "8px",
  borderColor: grey[600],
  backgroundColor: "transparent",
  padding: theme.spacing(0.5, 0.75),
  color: grey[600],
  fontSize: "1.2rem",

  "&>svg": {
    fontSize: "1.2rem",
    marginBottom: "-4px",
  },

  "&.TTToggledOn": {
    backgroundColor: grey[300],
    borderColor: grey[300],
    color: theme.palette.secondary.main,
  },

  "&:hover": {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
}));

const StyledTimeEntryItemBase = styled(TimeEntryItemBase)(({ theme }) => ({
  border: "none",
}));

const DeleteTextButton = styled(TTTextButton)(({ theme }) => ({
  "&:enabled": {
    color: red[500],
    "&:hover": {
      color: red[900],
    },
  },
}));

const TimeEntryHeader = ({
  dateGroupId,
  sectionDate,
  checkedTEList,
  totalDuration,
  timeEntryChecked,
  timeEntryCheckedDispatch,
}) => {
  const dispatch = useDispatch();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const tagNames = useSelector((state) => state.tags.tagNames);

  const [batchDeleteTimeEntry] = useBatchDeleteTimeEntryMutation();
  const [batchPatchTimeEntry] = useBatchPatchTimeEntryMutation();

  // const dateFormat = "EEE, dd MMM";
  const checked = checkedTEList.length === timeEntryChecked.checkedList.length;
  const indeterminate = !checked && timeEntryChecked.checkedList.length > 0;
  const isCheckOn = checked || indeterminate;

  const handleBulkEdit = (e) => {
    setIsUpdateModalOpen(true);
  };

  const handleBulkDelete = async () => {
    let ids = timeEntryUtil.convertTEListToTEIdList(
      timeEntryChecked.checkedList
    );
    const timeEntries = timeEntryChecked.checkedList;
    if (checked) {
      dispatch(deleteDGE({ dateGroupId: dateGroupId }));
    } else {
      dispatch(
        deleteBatchTE({
          dateGroupId: dateGroupId,
          idList: timeEntryUtil.convertTEListToTEIdList(
            timeEntryChecked.checkedList
          ),
        })
      );
    }
    timeEntryCheckedDispatch({
      type: timeEntryCheckedActions.RESET_CHECKED_LIST,
    });
    try {
      const payload = await batchDeleteTimeEntry({ ids: ids }).unwrap();
      const { failure } = payload.failure;
      if (failure?.length > 0) {
        const failedIds = failure.map((f) => f.id);
        const failedTimeEntries = timeEntries.filter((t) =>
          failedIds.includes(t.id)
        );
        failedTimeEntries.forEach((failedTimeEntry) => {
          dispatch(addTE({ timeEntry: failedTimeEntry }));
        });
      }
    } catch (error) {}
  };

  const handleCheckBoxToggle = () => {
    timeEntryCheckedDispatch({
      type: timeEntryCheckedActions.TOGGLE_AND_RESET_CHECKED_LIST,
    });
  };

  const handleCheckBoxClick = () => {
    if (isCheckOn) {
      timeEntryCheckedDispatch({
        type: timeEntryCheckedActions.RESET_CHECKED_LIST,
      });
    } else {
      timeEntryCheckedDispatch({
        type: timeEntryCheckedActions.SET_CHECKED_LIST,
        checkedList: checkedTEList,
      });
    }
  };

  const handleInputModalComplete = async (editData) => {
    const { initialValues, finalValues, hasChanged } = editData;
    if (hasChanged) {
      timeEntryCheckedDispatch({
        type: timeEntryCheckedActions.TOGGLE_AND_RESET_CHECKED_LIST,
      });
      let ids = timeEntryUtil.convertTEListToTEIdList(
        timeEntryChecked.checkedList
      );
      const patch = compare(
        { description: "", tags: [], projectId: -1, startDate: null },
        finalValues
      );
      try {
        const { sucess, failure } = await batchPatchTimeEntry({
          ids: ids,
          patch: patch,
        }).unwrap();
        if (sucess?.length > 0) {
          dispatch(
            updateBatchTE({
              dateGroupId,
              idList: sucess,
              editData: {
                ...finalValues,
                startDate: new Date(finalValues.startDate).getTime(),
              },
            })
          );
        }
      } catch (error) {}
    }
  };

  const nSelected = timeEntryChecked.checkedList.length;

  return (
    <StyledTimeEntryItemBase
      className={"TimeEntryHeader"}
      showCheckbox={timeEntryChecked.showCheckbox}
      checked={checked}
      indeterminate={indeterminate}
      onCheckBoxClick={handleCheckBoxClick}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        gap={1}
      >
        <TimeEntryLeftSection gap={2}>
          <Typography fontSize={"0.95rem"} fontWeight={"600"} mr={"auto"}>
            {dateGroupId}
          </Typography>
          {timeEntryChecked.showCheckbox && (
            <>
              <Typography
                variant="body2"
                color={"GrayText"}
              >{`${nSelected}/${checkedTEList.length} items selected`}</Typography>
              <TTTextButton
                disabled={!isCheckOn}
                text={"Bulk edit"}
                onClick={handleBulkEdit}
              />
              <TEInputModalFromTEs
                tagList={
                  tagNames[timeEntryChecked.checkedList[0]?.workspaceId] ?? []
                }
                timeEntries={timeEntryChecked.checkedList}
                startDate={new Date(sectionDate)}
                open={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSave={handleInputModalComplete}
              />
              <DeleteTextButton
                disabled={!isCheckOn}
                text={"Delete"}
                className={"TTEntryHeader-deleteBtn"}
                onClick={handleBulkDelete}
              />
            </>
          )}
        </TimeEntryLeftSection>
        <TimeEntryRightSection>
          <SubButton noVerticalPadding={true} style={{ fontSize: "0.875rem" }}>
            {formatSecondHMMSS(totalDuration)}
          </SubButton>
          <RightTools>
            <OutlinedIconButton
              className={timeEntryChecked.showCheckbox && "TTToggledOn"}
              onClick={handleCheckBoxToggle}
            >
              <ChecklistIcon />
            </OutlinedIconButton>
          </RightTools>
        </TimeEntryRightSection>
      </Stack>
    </StyledTimeEntryItemBase>
  );
};

export default memo(TimeEntryHeader);
