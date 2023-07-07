import React, { memo, useEffect, useState } from "react";
import TimeEntryItemBase, {
  RightTools,
  TimeEntryLeftSection,
  TimeEntryRightSection,
} from "./TimeEntryItemBase";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import FolderIcon from "@mui/icons-material/Folder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Stack, Typography, alpha } from "@mui/material";
import GrowingInput from "../growingInput/GrowingInput";
import TTIconButton from "../ttIconButton/TTIconButton";
import SubButton from "../subButton/SubButton";
import TagsSelector from "../../scenes/timerPage/TagsSelector";
import TimeEntryExpandButton from "./TimeEntryExpandButton";
import classNames from "classnames";
import { useTheme } from "@emotion/react";
import { TTMenu } from "../ttMenu/TTMenu";
import { TTMenuItem } from "../ttMenu/TTMenuItem";
import TimeEntryDateInfo from "./TimeEntryDateInfo";
import TimeEntryDateInfoChanger from "./TimeEntryDateInfoChanger";

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
    backgroundColor: grey[100],
    "&:hover": {
      backgroundColor: grey[200],
    },

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
  // isTypeHeader = false,
  variant = "item",
  isExpanded = false,
  groupSize = 0,

  className,

  checked = false,
  indeterminate = false,
  showCheckbox = false,
  menuOptions = [], // [{label: "a", name: "a", style: {}}]
  operations = {
    onCheckBoxClick: () => {},
    onDescriptionEdit: (description) => {},
    onProjectEdit: (projectInfo) => {},
    onTagsCheckedEdit: (tagsChecked) => {},
    onDateButtonClick: (e) => {},
    onDateInfoChange: (dateInfo) => {},
    onDeleteClick: (e) => {},
    onExpandButonClick: (e) => {},
    onMenuClick: (option) => {},
    onStartButtonClick: (e) => {},
  },
}) => {
  const theme = useTheme();
  const [teDescription, setTeDescription] = useState(description);
  const [tagSelectorAnchor, setTagSelectorAnchor] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    setTeDescription(description);
  }, [description]);

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

  // console.log("End time: " + Date.now());

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
      {/* Group item expand button */}
      {variant === "group" && (
        <Box minWidth={"40px"}>
          <TimeEntryExpandButton
            isOpen={isExpanded}
            onClick={handleExpandedClick}
          >
            {groupSize}
          </TimeEntryExpandButton>
        </Box>
      )}

      {/* Left section */}
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

      {/* Right section */}
      <TimeEntryRightSection>
        <Stack direction={"row"} alignItems={"center"}>
          <TTIconButton
            disabled
            className={"TT-hidden"}
            style={{
              padding: 0,
              fontSize: "1.4rem",
              marginRight: theme.spacing(2),
            }}
          >
            <AttachMoneyIcon />
          </TTIconButton>
          {variant === "group" ? (
            <TimeEntryDateInfo
              duration={duration}
              startDate={startDate}
              stopDate={stopDate}
              onDateButtonClick={operations.onExpandButonClick}
              onDurationButtonClick={operations.onExpandButonClick}
            />
          ) : (
            <TimeEntryDateInfoChanger
              duration={duration}
              startDate={startDate}
              stopDate={stopDate}
              onEditComplete={operations.onDateInfoChange}
            />
          )}
        </Stack>

        {/* Tools */}
        <RightTools>
          <TTIconButton
            colorStrength={3}
            className={"TT-hidden"}
            style={{ padding: 0, fontSize: "1.8rem", marginRight: 8 }}
            onClick={operations.onStartButtonClick}
          >
            <PlayArrowIcon />
          </TTIconButton>
          <TTIconButton
            colorStrength={9}
            className={"TT-hidden"}
            open={Boolean(menuAnchor)}
            style={{ padding: 0, fontSize: "1.8rem" }}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
          >
            <MoreVertIcon />
          </TTIconButton>

          {/* if only comparing with menuOptions.length > 0 && it will be slow */}
          {/* The current comparision with a Boolean(menuAnchor) actually reduces */}
          {/* TimerPage rendering time by 50ms for around 58 entries */}
          {/* From 200ms to 150ms */}
          {Boolean(menuAnchor) && menuOptions.length > 0 && (
            <TTMenu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              {menuOptions.map((option) => (
                <TTMenuItem
                  key={option.name}
                  disabled={option.disabled}
                  selected={option.selected}
                  style={option.style}
                  onClick={(e) => {
                    if (operations.onMenuClick) operations.onMenuClick(option);
                    setMenuAnchor(null);
                  }}
                >
                  {option.label}
                </TTMenuItem>
              ))}
            </TTMenu>
          )}
        </RightTools>
      </TimeEntryRightSection>
      {/* </TimeEntryMainSection> */}
    </StyledTimeEntryItemBase>
  );
};

export default memo(TimeEntryItemRecord);
