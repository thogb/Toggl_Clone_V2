import React, { useState } from "react";
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
import { Box, IconButton, InputBase, Stack, Typography } from "@mui/material";
import GrowingInput from "../growingInput/GrowingInput";
import { timeEntryCheckedActions } from "./TimeEntryCheckedReducer";
import TTIconButton from "../ttIconButton/TTIconButton";
import SubButton from "../subButton/SubButton";
import { formatDateHMA } from "../../utils/TTDateUtil";
import TagsSelector from "../../scenes/timerPage/TagsSelector";

const StyledTimeEntryItemBase = styled(TimeEntryItemBase)(({ theme }) => ({
  "&:hover": {
    backgroundColor: grey[100],
    "& .TT-hidden": {
      visibility: "visible",
    },
  },
}));

const inputPlaceHolder = "Add description";

const TimeEntryItemRecord = ({
  id,
  projectId,
  description,
  tagList,
  tagsChecked,
  duration,
  startDate,
  stopDate,
  showCheckbox = false,
  checked = false,
  timeEntryChecked,
  timeEntryCheckedDispatch,
}) => {
  const [teDescription, setTeDescription] = useState(description);
  const [tagSelectorAnchor, setTagSelectorAnchor] = useState(null);

  const handleTeDescriptionChange = (e) => {
    setTeDescription(e.target.value);
  };

  const handleTeDescriptionInputComplete = (e) => {
    // Api call to update description of entry
    console.log(e.target.value);
  };

  const handleCheckboxClick = () => {
    timeEntryCheckedDispatch({
      type: timeEntryCheckedActions.TOGGLE_CHECKED_LIST_ITEM,
      id: id,
    });
  };

  const handleTagsSelectorClose = (newCheckedList) => {
    setTagSelectorAnchor(null);
  };

  const hasTags = tagsChecked.length > 0;

  return (
    <StyledTimeEntryItemBase
      showCheckbox={showCheckbox}
      checked={checked}
      onCheckBoxClick={handleCheckboxClick}
    >
      {/* <TimeEntryMainSection> */}
      <TimeEntryLeftSection gap={1}>
        <GrowingInput
          value={teDescription}
          placeholder={inputPlaceHolder}
          onChange={handleTeDescriptionChange}
          onInputComplete={handleTeDescriptionInputComplete}
          // style={{ overflow: "hidden", minWidth: 0 }}
        />
        <TTIconButton colorStrength={5} className={"TT-hidden"}>
          <FolderIcon />
        </TTIconButton>
      </TimeEntryLeftSection>
      <Stack
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
            onClose={() => setTagSelectorAnchor(null)}
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
                  <Typography noWrap color={"primary.main"}>
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
              color={"primary.light"}
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

export default TimeEntryItemRecord;
