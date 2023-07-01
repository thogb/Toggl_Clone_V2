import React, { memo } from "react";
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
  timeEIdList,
  totalDuration,
  timeEntryChecked,
  timeEntryCheckedDispatch,
}) => {
  const dateFormat = "EEE, dd MMM";
  const checked = timeEIdList.length === timeEntryChecked.checkedList.length;
  const indeterminate = !checked && timeEntryChecked.checkedList.length > 0;
  const isCheckOn = checked || indeterminate;

  const handleBulkEdit = () => {};

  const handleBulkDelete = () => {};

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
        checkedList: timeEIdList,
      });
    }
  };

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
              >{`${timeEntryChecked.checkedList.length}/${timeEIdList.length} items selected`}</Typography>
              <TTTextButton
                disabled={!isCheckOn}
                text={"Bulk edit"}
                onClick={handleBulkEdit}
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
