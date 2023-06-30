import React, { memo, useState } from "react";
import TimeEntryItemBase, {
  RightTools,
  TimeEntryLeftSection,
  TimeEntryMainSection,
  TimeEntryRightSection,
} from "./TimeEntryItemBase";
import styled from "@emotion/styled";
import { grey, red } from "@mui/material/colors";
import FolderIcon from "@mui/icons-material/Folder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  InputBase,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import GrowingInput from "../growingInput/GrowingInput";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import TTIconButton from "../ttIconButton/TTIconButton";
import SubButton from "../subButton/SubButton";
import { formatDateHMA } from "../../utils/TTDateUtil";
import TagsSelector from "../../scenes/timerPage/TagsSelector";
import TimeEntryExpandButton from "./TimeEntryExpandButton";
import classNames from "classnames";
import { useTheme } from "@emotion/react";

const StyledTimeEntryItemBase = styled(TimeEntryItemBase)(({ theme }) => ({
  "&:hover": {
    backgroundColor: grey[100],
    "& .TT-hidden": {
      visibility: "visible",
    },
  },

  [theme.breakpoints.down("md")]: {
    "& .TimeEntryItemRecord-tags": {
      alignSelf: "start",
    },
  },

  "&.TimeEntryItemRecord-isChildrenOfGroup": {
    "& .TimeEntryLeftSection": {
      marginLeft: "40px",
    },
  },
}));

const StyledGrowingInput = styled(GrowingInput)(({ theme }) => ({
  "&>input": {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: alpha(theme.palette.primary.main, 0.8),
    "&:focus": {
      color: theme.palette.primary.main,
    },
  },
}));

const inputPlaceHolder = "Add description";

const TimeEntryItemRecord = ({
  id,
  projectId,
  description,
  tagsChecked,
  duration,
  startDate,
  stopDate,

  tagList,

  isChildrenOfGroup = false,
  isTypeHeader = false,
  isExpanded = false,
  groupSize = 0,

  className,

  checked = false,
  indeterminate = false,
  showCheckbox = false,
  operations = {
    onCheckBoxClick: () => {},
    onDescriptionEdit: (description) => {},
    onProjectEdit: (projectInfo) => {},
    onTagsCheckedEdit: (tagsChecked) => {},
    onDateButtonClick: (e) => {},
    onDateInfoChange: (dateInfo) => {},
    onDeleteClick: (e) => {},
    onExpandButonClick: (e) => {},
  },
}) => {
  const theme = useTheme();
  const [teDescription, setTeDescription] = useState(description);
  const [tagSelectorAnchor, setTagSelectorAnchor] = useState(null);

  const handleTeDescriptionChange = (e) => {
    setTeDescription(e.target.value);
  };

  const handleTeDescriptionInputComplete = (e) => {
    // Api call to update description of entry
    // console.log(e.target.value);
    operations.onDescriptionEdit(e.target.value);
  };

  const handleCheckboxClick = () => {
    operations.onCheckBoxClick();
  };

  const handleTagsSelectorClose = (newCheckedList) => {
    setTagSelectorAnchor(null);
    console.log(newCheckedList);
    operations.onTagsCheckedEdit(newCheckedList);
  };

  const handleExpandedClick = (e) => {
    operations.onExpandButonClick(e);
  };

  const hasTags = tagsChecked.length > 0;
  const commonTextColor = alpha(theme.palette.primary.main, 0.7);
  return (
    <StyledTimeEntryItemBase
      className={classNames(
        "TimeEntryItemRecord",
        isChildrenOfGroup && "TimeEntryItemRecord-isChildrenOfGroup",
        className
      )}
      showCheckbox={showCheckbox}
      checked={checked}
      indeterminate={indeterminate}
      onCheckBoxClick={handleCheckboxClick}
    >
      {isTypeHeader && (
        <Box minWidth={"40px"}>
          <TimeEntryExpandButton
            isOpen={isExpanded}
            onClick={handleExpandedClick}
          >
            {groupSize}
          </TimeEntryExpandButton>
        </Box>
      )}
      {/* <TimeEntryMainSection> */}
      <TimeEntryLeftSection>
        <StyledGrowingInput
          value={teDescription}
          placeholder={inputPlaceHolder}
          onChange={handleTeDescriptionChange}
          onInputComplete={handleTeDescriptionInputComplete}
          // style={{ overflow: "hidden", minWidth: 0 }}
          style={{
            marginRight: "8px",
            marginLeft: "0px",
          }}
        />
        <TTIconButton colorStrength={5} className={"TT-hidden"}>
          <FolderIcon />
        </TTIconButton>
      </TimeEntryLeftSection>
      <Stack
        className="TimeEntryItemRecord-tags"
        direction={"row"}
        minWidth={200}
        flexShrink={0}
        flexGrow={1}
        flexBasis={"0px"}
      >
        <Box ml={"auto"} overflow={tagSelectorAnchor ? "none" : "hidden"}>
          <TagsSelector
            tagList={tagList}
            placement={hasTags ? "bottom-start" : "bottom-end"}
            tagCheckedList={tagsChecked}
            popperAnchorEl={tagSelectorAnchor}
            onClose={handleTagsSelectorClose}
            triggerTouchable={true}
            triggerComponent={
              hasTags ? (
                <SubButton
                  noVerticalPadding={true}
                  style={{
                    // paddingTop: "0px",
                    // paddingBottom: "0px",
                    // minWidth: 0,
                    // overflow: "hidden",
                    width: !tagSelectorAnchor ? "100%" : "auto",
                  }}
                  onClick={(e) => {
                    setTagSelectorAnchor(e.currentTarget);
                  }}
                >
                  <Typography
                    noWrap
                    color={commonTextColor}
                    variant="subtitle2"
                  >
                    {tagsChecked.join(", ")}
                  </Typography>
                </SubButton>
              ) : (
                <TTIconButton
                  className={"TT-hidden"}
                  selected={hasTags}
                  onClick={(e) => {
                    setTagSelectorAnchor(e.currentTarget);
                  }}
                >
                  <LocalOfferIcon />
                </TTIconButton>
              )
            }
          />
        </Box>
      </Stack>
      <TimeEntryRightSection>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <TTIconButton
            disabled
            className={"TT-hidden"}
            style={{ padding: 0, fontSize: "1.4rem" }}
          >
            <AttachMoneyIcon />
          </TTIconButton>
          <SubButton
            className="TimeEntryDateBtn"
            style={{ paddingTop: "4px", paddingBottom: "4px" }}
          >
            <Typography
              variant="body2"
              color={commonTextColor}
              fontWeight={"fontWeightMedium"}
              noWrap
            >
              {`${formatDateHMA(startDate)} - ${formatDateHMA(stopDate)}`}
            </Typography>
          </SubButton>
        </Stack>
        <RightTools>
          <TTIconButton
            colorStrength={3}
            className={"TT-hidden"}
            style={{ padding: 0, fontSize: "1.8rem", marginRight: 8 }}
          >
            <PlayArrowIcon />
          </TTIconButton>
          <TTIconButton
            colorStrength={9}
            className={"TT-hidden"}
            style={{ padding: 0, fontSize: "1.8rem" }}
          >
            <MoreVertIcon />
          </TTIconButton>
        </RightTools>
      </TimeEntryRightSection>
      {/* </TimeEntryMainSection> */}
    </StyledTimeEntryItemBase>
  );
};

export default memo(TimeEntryItemRecord);
