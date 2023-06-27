import React, { useState } from "react";
import SubButton from "../../components/subButton/SubButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Divider, Stack, Typography, alpha } from "@mui/material";
import TTPopper from "../../components/ttPopper/TTPopper";
import TTPopperContainer from "../../components/ttPopper/TTPopperContainer";
import TTPopperDivider from "../../components/ttPopper/TTPopperDivider";
import { TTPopperHeading } from "../../components/ttPopper/TTPopperHeading";
import { useTheme } from "@emotion/react";
import StackBetween from "../../components/stackBetween/StackBetween";
import styled from "@emotion/styled";
import { viewTypes } from "./TimerPage";
import { grey } from "@mui/material/colors";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";

const ViewTypeButton = styled("button")(({ theme }) => ({
  borderRadius: "8px",
  border: "1px solid",
  borderColor: grey[400],
  width: "100%",
  background: "transparent",
  padding: theme.spacing(1.5, 0),
  fontWeight: 600,
  color: theme.palette.primary.light,

  "&:hover": {
    cursor: "pointer",
    borderColor: grey[600],
  },

  "&:active": {
    backgroundColor: grey[200],
  },

  "&.ViewTypeButton-selected": {
    backgroundColor: alpha(theme.palette.secondary.light, 0.3),
    borderWidth: "2px",
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.dark,
  },
}));

const ViewTypeSelector = ({ viewType = viewTypes.LIST }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  return (
    <>
      <TTPopper
        size={"md"}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        triggerComponent={
          <SubButton
            style={{ textTransform: "uppercase" }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Stack direction={"row"} alignItems={"center"} gap={0.75}>
              <Typography variant="caption" fontWeight={"bold"} my={0.25}>
                {`${viewType} View`}
              </Typography>
              {Boolean(anchorEl) ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </Stack>
          </SubButton>
        }
      >
        <TTPopperContainer>
          <TTPopperHeading>Time Entry View</TTPopperHeading>
          <StackBetween gap={1.5} mb={2}>
            <ViewTypeButton
              className={
                viewType === viewTypes.LIST ? "ViewTypeButton-selected" : null
              }
            >
              <FormatListBulletedIcon />
              <Typography>List</Typography>
            </ViewTypeButton>
            <ViewTypeButton
              className={
                viewType === viewTypes.WEEK ? "ViewTypeButton-selected" : null
              }
            >
              <DateRangeIcon />
              <Typography>Week</Typography>
            </ViewTypeButton>
            <ViewTypeButton
              className={
                viewType === viewTypes.DAY ? "ViewTypeButton-selected" : null
              }
            >
              <TodayIcon />
              <Typography>Day</Typography>
            </ViewTypeButton>
          </StackBetween>
          <TTPopperDivider />
          <StackBetween>
            <TTPopperHeading>Extra Visualisations</TTPopperHeading>
            <SubButton noVerticalPadding={true}>
              <Typography
                fontSize={"small"}
                style={{ textDecoration: "underline" }}
              >
                Hidden
              </Typography>
              <KeyboardArrowDownIcon fontSize="none" />
            </SubButton>
          </StackBetween>
          <TTPopperDivider />
          <StackBetween mb={0}>
            <TTPopperHeading>Show Weekends</TTPopperHeading>
            <SubButton>test</SubButton>
          </StackBetween>
        </TTPopperContainer>
      </TTPopper>
    </>
  );
};

export default ViewTypeSelector;
