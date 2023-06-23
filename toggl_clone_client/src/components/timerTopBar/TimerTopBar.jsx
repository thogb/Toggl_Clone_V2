import React, { useReducer, useState } from "react";
import CircularStartButton from "../circularStartButton/CircularStartButton";
import {
  AppBar,
  Box,
  Button,
  InputBase,
  Stack,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import EntryDateChanger from "../entryDateChanger/EntryDateChanger";
import EntryTimeTextField from "../entryTimeTextField/EntryTimeTextField";
import TTIconButton from "../ttIconButton/TTIconButton";
import { APPBAR_HEIGHT } from "../../utils/constants";
import { useTheme } from "@emotion/react";
import {
  entryDatesActions,
  entryDatesReducer,
  getIntialEntryDates,
} from "../entryDateChanger/EntryDatesReducer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import CheckIcon from "@mui/icons-material/Check";
import { grey } from "@mui/material/colors";
import TagsSelector from "../../scenes/timerPage/TagsSelector";

const TimerTopBar = () => {
  const [isTimerMode, setIsTimerMode] = useState(true);

  //retrieved from redux for if timer is started
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const [entryDates, entryDatesDispatch] = useReducer(
    entryDatesReducer,
    getIntialEntryDates()
  );

  const mw620 = useMediaQuery("(min-width:620px)");
  const theme = useTheme();

  const timerOptionStyle = {
    shadow: {
      size: "0px",
    },
    shadowHover: {
      size: "0px",
    },
    shadowFocus: {
      size: "5px",
      color: theme.palette.secondary.main,
      opacity: 0.5,
    },
  };

  const timerOptionSSelected = {
    shadow: {
      size: "0px",
    },
    shadowHover: {
      size: "0px",
    },
    shadowFocus: {
      size: "0px",
    },
  };

  const toggleTimerStarted = () => {
    if (isTimerMode) {
      setIsTimerStarted(!isTimerStarted);
    }
  };

  const handleTimeModeChange = () => {
    setIsTimerMode(!isTimerMode);
    entryDatesDispatch({ type: entryDatesActions.RESET_ENTRY_DATES });
  };

  const handleTimePopperClose = () => {
    if (entryDates.durationMin <= 0)
      entryDatesDispatch({ type: entryDatesActions.RESET_ENTRY_DATES });
  };

  return (
    <AppBar position="sticky" sx={{ height: APPBAR_HEIGHT }} color="background">
      <Toolbar disableGutters>
        <InputBase
          placeholder={
            isTimerStarted
              ? "(no description)"
              : isTimerMode
              ? "What are you working on?"
              : "What have you done?"
          }
          sx={{
            height: APPBAR_HEIGHT,
            pl: theme.spacing(2.5),
            flexGrow: 1,
            fontWeight: "bold",
            fontSize: theme.typography.h6.fontSize,
          }}
        />
        <Button
          variant="text"
          color="secondary"
          startIcon={<AddIcon fontSize="large" />}
          disableElevation
          disableRipple
          disableTouchRipple
          sx={{
            pl: 2.5,
            pr: 1.5,
            textTransform: "none",
            fontSize: 14,
            lineHeight: "1",
            fontWeight: "400",
            color: "black",
            minWidth: 0,
            borderRadius: "8px",
            "& .MuiSvgIcon-root": {
              fontSize: 16,
              color: theme.palette.secondary.main,
            },
          }}
        >
          {mw620 ? "Create a project" : ""}
        </Button>
        <TagsSelector
          tagList={[
            "C#",
            "Java",
            "net core",
            "py",
            "py1",
            "py2",
            "py3",
            "py4",
            "py5",
            "py6",
            "py7sssssssssssssssssssssssssa",
          ]}
          tagsCheckedList={["Java", "net core"]}
        />
        <TTIconButton disabled>
          <AttachMoneyIcon />
        </TTIconButton>
        {/* time Entries */}
        {isTimerMode ? (
          <EntryTimeTextField
            entryDates={entryDates}
            entryDatesDispatch={entryDatesDispatch}
            onPopperClose={handleTimePopperClose}
          />
        ) : (
          <EntryDateChanger
            entryDates={entryDates}
            entryDatesDispatch={entryDatesDispatch}
          />
        )}
        {/* timer button */}
        <CircularStartButton
          bgColor={isTimerStarted ? "timing" : "secondary"}
          onClick={toggleTimerStarted}
          shadowHover={{ size: "3px" }}
          style={{ marginLeft: theme.spacing(2.5) }}
        >
          {!isTimerMode ? (
            <AddIcon style={{ fontSize: "30px" }} />
          ) : isTimerStarted ? (
            <StopIcon style={{ fontSize: "30px" }} />
          ) : entryDates.durationMin <= 0 ? (
            <PlayArrowIcon style={{ fontSize: "30px" }} />
          ) : (
            <CheckIcon style={{ fontSize: "30px" }} />
          )}
        </CircularStartButton>
        <Box
          mx={theme.ttSpacings.page.px}
          bgcolor={grey[200]}
          p={"5px"}
          borderRadius={"12px"}
        >
          <Stack direction={"column"} gap={1.5}>
            <CircularStartButton
              disabled={true}
              size="16px"
              bgColor={isTimerMode ? "timerOptionSelected" : "timerOption"}
              onClick={() => {
                if (!isTimerMode) {
                  setIsTimerMode(true);
                  handleTimeModeChange();
                }
              }}
              {...(isTimerMode ? timerOptionSSelected : timerOptionStyle)}
            >
              <PlayArrowIcon sx={{ fontSize: "14px" }} />
            </CircularStartButton>
            <CircularStartButton
              size="16px"
              bgColor={!isTimerMode ? "timerOptionSelected" : "timerOption"}
              onClick={() => {
                if (isTimerMode) {
                  handleTimeModeChange();
                }
              }}
              {...(!isTimerMode ? timerOptionSSelected : timerOptionStyle)}
            >
              <AddIcon sx={{ fontSize: "14px" }} />
            </CircularStartButton>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TimerTopBar;
