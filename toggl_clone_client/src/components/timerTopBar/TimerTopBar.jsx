import React, { useRef, useState } from "react";
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
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import CheckIcon from "@mui/icons-material/Check";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { grey } from "@mui/material/colors";
import TagsSelector from "../../scenes/timerPage/TagsSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  endTimer,
  incrementDuration,
  resetDateInfo,
  setDateInfo,
  setTagsChecked,
  startTimer,
  toggleTimerStarted,
} from "../../state/currentEntrySlice";
import { getDiffInSeconds } from "../../utils/TTDateUtil";
import { TTMenu } from "../ttMenu/TTMenu";
import { TTMenuItem } from "../ttMenu/TTMenuItem";

const timerStates = Object.freeze({
  STARTED: "STARTED",
  IDLE: "IDLE",
  MANUAL: "MANUAL",
  CHECK: "CHECK",
});

const TimerTopBar = () => {
  const dispatch = useDispatch();
  const duration = useSelector((state) => state.currentEntry.duration);
  const startDate = useSelector((state) => state.currentEntry.startDate);
  const stopDate = useSelector((state) => state.currentEntry.stopDate);
  const isTimerStarted = useSelector(
    (state) => state.currentEntry.timerStarted
  );
  const tagList = useSelector((state) => state.currentEntry.tags);
  const tagCheckedList = useSelector((state) => state.currentEntry.tagsChecked);

  const desciptionInput = useRef();
  const [isTimerMode, setIsTimerMode] = useState(true);

  const [menuAnchor, setMenuAnchor] = useState(null);

  //retrieved from redux for if timer is started

  const mw620 = useMediaQuery("(min-width:620px)");
  const theme = useTheme();

  // const [tagList, setTagList] = useState([
  //   "C#",
  //   "Java",
  //   "net core",
  //   "py",
  //   "py1",
  //   "py2",
  //   "py3",
  //   "py4",
  //   "py5",
  //   "py6",
  //   "py7sssssssssssssssssssssssssa",
  // ]);

  // const [tagCheckedList, setTagCheckedList] = useState(["Java", "net core"]);

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

  const timerState = !isTimerMode
    ? timerStates.MANUAL
    : isTimerStarted
    ? timerStates.STARTED
    : duration <= 0
    ? timerStates.IDLE
    : timerStates.CHECK;

  const handleTimerButtonClick = () => {
    console.log(timerState);
    console.log(isTimerStarted);
    switch (timerState) {
      case timerStates.MANUAL:
        return;
      case timerStates.STARTED:
        console.log(" end timer");
        dispatch(endTimer());
        return;
      case timerStates.IDLE:
        const timerInterval = setInterval(() => {
          dispatch(incrementDuration());
        }, 1000);
        dispatch(startTimer({ timerInterval: timerInterval }));
        desciptionInput.current.focus();
        return;
      case timerStates.CHECK:
        return;
      default:
        return;
    }
  };

  const toggleLocalTimerStarted = () => {
    if (isTimerMode) {
      // dispatch(setTimerStarted({ timerStarted: !isTimerStarted }));
      dispatch(toggleTimerStarted());
      if (isTimerStarted) {
        dispatch(endTimer());
      } else {
        const timerInterval = setInterval(() => {
          dispatch(incrementDuration());
        }, 1000);
        dispatch(startTimer({ timerInterval: timerInterval }));
        desciptionInput.current.focus();
      }
    }
  };

  const handleTimeModeChange = () => {
    setIsTimerMode(!isTimerMode);
    dispatch(resetDateInfo());
  };

  const handleTimePopperClose = (dateInfo) => {
    if (duration < 0) {
      dispatch(resetDateInfo());
    }

    const { initialDateInfo } = dateInfo;
    if (
      (dateInfo.duration >= 0 &&
        dateInfo.duration !== initialDateInfo.duration) ||
      Math.abs(dateInfo.startDate - initialDateInfo.startDate) > 60 * 1000
    ) {
      if (isTimerStarted) {
        dispatch(
          setDateInfo({
            dateInfo: {
              duration: getDiffInSeconds(
                initialDateInfo.stopDate.getTime(),
                dateInfo.startDate.getTime()
              ),
              startDate: dateInfo.startDate.getTime(),
              stopDate: initialDateInfo.stopDate.getTime(),
            },
          })
        );
      } else {
        dispatch(
          setDateInfo({
            dateInfo: {
              duration: dateInfo.duration,
              startDate: dateInfo.startDate.getTime(),
              stopDate: dateInfo.stopDate.getTime(),
            },
          })
        );
      }
    }
  };

  const handleTagsSelectionComplete = (tagsChecked) => {
    dispatch(setTagsChecked({ tagsChecked: tagsChecked }));
  };

  const handleMenuItemClick = (code) => {
    if (code === "DELETE") {
      console.log("delete clicked");
    }

    setMenuAnchor(null);
  };

  const getCircularButtonIcon = () => {
    switch (timerState) {
      case timerStates.MANUAL:
        return <AddIcon style={{ fontSize: "30px" }} />;
      case timerStates.STARTED:
        return <StopIcon style={{ fontSize: "30px" }} />;
      case timerStates.IDLE:
        return <PlayArrowIcon style={{ fontSize: "30px" }} />;
      default:
        return <CheckIcon style={{ fontSize: "30px" }} />;
    }
  };

  console.log("top bar render");

  return (
    <AppBar position="sticky" sx={{ height: APPBAR_HEIGHT }} color="background">
      <Toolbar disableGutters>
        <InputBase
          inputRef={desciptionInput}
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
            fontSize: "1.2rem",
            color: theme.palette.primary.main,
            "&>input:focus": {
              fontWeight: 500,
            },
            "&>input::placeholder": {
              color: theme.palette.primary.light,
              opacity: 0.6,
              fontWeight: 600,
            },
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
          tagList={tagList}
          tagCheckedList={tagCheckedList}
          onSelectionComplete={handleTagsSelectionComplete}
        />
        <TTIconButton disabled>
          <AttachMoneyIcon />
        </TTIconButton>
        {/* time Entries */}
        {isTimerMode ? (
          <EntryTimeTextField
            duration={duration}
            startDate={startDate}
            stopDate={isTimerStarted ? startDate + duration * 1000 : stopDate}
            disableStopInput={isTimerStarted}
            onPopperClose={handleTimePopperClose}
          />
        ) : (
          <EntryDateChanger />
        )}
        {/* timer button */}
        <CircularStartButton
          bgColor={isTimerStarted ? "timing" : "secondary"}
          onClick={handleTimerButtonClick}
          shadowHover={{ size: "3px" }}
          style={{ marginLeft: theme.spacing(2.5) }}
        >
          {getCircularButtonIcon()}
        </CircularStartButton>
        <Box
          minWidth={70}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
        >
          {timerState !== timerStates.STARTED ? (
            <Stack
              width={"fit-content"}
              direction={"column"}
              gap={1.5}
              mx={theme.ttSpacings.page.px}
              bgcolor={grey[200]}
              p={"5px"}
              borderRadius={"12px"}
            >
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
          ) : (
            <>
              <TTIconButton
                open={Boolean(menuAnchor)}
                style={{
                  padding: theme.spacing(1 / 4, 1 / 4),
                  fontSize: "1.8rem",
                }}
                onClick={(e) => setMenuAnchor(e.currentTarget)}
              >
                <MoreHorizIcon />
              </TTIconButton>
              <TTMenu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
              >
                <TTMenuItem
                  disabled={true}
                  onClick={() => handleMenuItemClick()}
                >
                  Split
                </TTMenuItem>
                <TTMenuItem
                  disabled={true}
                  onClick={() => handleMenuItemClick()}
                >
                  Pin as favorite
                </TTMenuItem>
                <TTMenuItem
                  style={{ color: "red" }}
                  onClick={() => handleMenuItemClick("DELETE")}
                >
                  Delete
                </TTMenuItem>
              </TTMenu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TimerTopBar;
