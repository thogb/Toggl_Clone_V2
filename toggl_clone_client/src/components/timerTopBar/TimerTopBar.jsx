import React, { useEffect, useRef, useState } from "react";
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
  deleteStartedTimer,
  endTimer,
  resetCurrentEntryInfo,
  resetDateInfo,
  setDateInfo,
  setTagsChecked,
  startTimer,
  updateDescription,
  updateWorkspaceId,
} from "../../state/currentEntrySlice";
import { getDiffInSeconds } from "../../utils/TTDateUtil";
import { TTMenu } from "../ttMenu/TTMenu";
import { TTMenuItem } from "../ttMenu/TTMenuItem";
import TTTimeTextField from "../ttTimeTextField/TTTimeTextField";
import {
  addTE,
  useAddTimeEntryMutation,
  usePatchTimeEntryMutation,
} from "../../state/groupedEntryListSlice";
import { addSeconds, differenceInSeconds } from "date-fns";
import { timeEntryUtil } from "../../utils/TimeEntryUtil";
import { createReplacePatch } from "../../utils/otherUtil";
import { listUtil } from "../../utils/listUtil";
import { useAddTagMutation } from "../../state/tagSlice";
import { Folder } from "@mui/icons-material";
import ProjectSelector from "../projectSelector/ProjectSelector";

const timerStates = Object.freeze({
  STARTED: "STARTED",
  IDLE: "IDLE",
  MANUAL: "MANUAL",
  CHECK: "CHECK",
});

const TimerTopBar = () => {
  const dispatch = useDispatch();
  const timeEntryId = useSelector((state) => state.currentEntry.id);
  const description = useSelector((state) => state.currentEntry.description);
  const duration = useSelector((state) => state.currentEntry.duration);
  const startDate = useSelector((state) => state.currentEntry.startDate);
  const stopDate = useSelector((state) => state.currentEntry.stopDate);
  const workspaceId = useSelector((state) => state.currentEntry.workspaceId);
  const projectId = useSelector((state) => state.currentEntry.projectId);
  const isTimerStarted = useSelector(
    (state) => state.currentEntry.timerStarted
  );
  const tagCheckedList = useSelector((state) => state.currentEntry.tagsChecked);
  const projects = useSelector((state) => state.projects.projects);
  const workspaces = useSelector((state) => state.workspaces.workspaces);
  const currentWorkspace = useSelector(
    (state) => state.workspaces.currentWorkspace
  );
  const tagList =
    useSelector((state) => state.tags.tagNames)[workspaceId] ?? [];

  const desciptionInput = useRef();
  const [isTimerMode, setIsTimerMode] = useState(true);
  const [projectAnchorEl, setProjectAnchorEl] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [addTimeEntry] = useAddTimeEntryMutation();
  const [patchTimeEntry] = usePatchTimeEntryMutation();
  const [addTag] = useAddTagMutation();

  const mw620 = useMediaQuery("(min-width:620px)");
  const theme = useTheme();

  const currentWorkspaceId = currentWorkspace.id ?? 0;

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

  useEffect(() => {
    desciptionInput.current.value = description;
  }, [description]);

  const getCurrentTimeEntry = () => {
    return {
      description: desciptionInput.current.value.trim(),
      projectId: null,
      tags: tagCheckedList,
      duration: duration,
      startDate: startDate,
      stopDate: addSeconds(startDate, duration).getTime(),
      workspaceId: workspaceId,
    };
  };

  const handleTimerButtonClick = async () => {
    switch (timerState) {
      case timerStates.IDLE:
        dispatch(startTimer({ timeEntry: getCurrentTimeEntry() }));
        desciptionInput.current.focus();
        return;
      case timerStates.STARTED:
        dispatch(endTimer());
        return;
      case timerStates.MANUAL:
      case timerStates.CHECK:
        try {
          const timeEntry = getCurrentTimeEntry();
          const payload = await addTimeEntry({
            timeEntry: timeEntryUtil.convertToApiDTO(timeEntry),
          }).unwrap();
          const responseTE = timeEntryUtil.createFromApiResponse(
            timeEntryUtil.cloneTimeEntry(payload)
          );
          dispatch(
            addTE({
              timeEntry: responseTE,
            })
          );
          dispatch(resetCurrentEntryInfo());
          dispatch(updateWorkspaceId({ workspaceId: currentWorkspaceId }));
        } catch (error) {}
        return;
      default:
        return;
    }
  };

  const handleDescriptionBlur = async (e) => {
    const newDescription = e.target.value.trim();
    if (description !== newDescription) {
      const oldDescription = description;
      dispatch(updateDescription({ description: newDescription }));
      if (isTimerStarted) {
        try {
          const patch = createReplacePatch({ description: newDescription });
          const payload = await patchTimeEntry({
            id: timeEntryId,
            patch: patch,
          }).unwrap();
        } catch (error) {
          dispatch(updateDescription({ description: oldDescription }));
        }
      }
    }
    desciptionInput.current.value = newDescription;
  };

  const handleTimeModeChange = () => {
    setIsTimerMode(!isTimerMode);
    dispatch(resetDateInfo());
  };

  const handleCreateTagClick = async (tagName) => {
    if (tagName) {
      try {
        const payload = await addTag({
          tagName: tagName,
          workspaceId: workspaceId,
        }).unwrap();
      } catch (error) {}
    }
  };

  const handleTimePopperClose = async (dateInfo) => {
    if (duration < 0) {
      dispatch(resetDateInfo());
    }

    const { initialDateInfo, finalDateInfo } = dateInfo;
    if (
      (dateInfo.duration >= 0 &&
        dateInfo.duration !== initialDateInfo.duration) ||
      Math.abs(dateInfo.startDate - initialDateInfo.startDate) > 60 * 1000
    ) {
      if (isTimerStarted) {
        if (
          Math.abs(
            differenceInSeconds(
              initialDateInfo.startDate,
              finalDateInfo.startDate
            )
          ) > 0
        ) {
          const patch = createReplacePatch({
            startDate: new Date(finalDateInfo.startDate),
          });
          try {
            await patchTimeEntry({ id: timeEntryId, patch: patch }).unwrap();
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
          } catch (error) {}
        }
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

  const handleProjectSelectionComplete = async (selectionData) => {
    console.log(selectionData);
    // if (selectionData.projectId !== projectId) {
    //   const oldProjectId = projectId;
    //   dispatch(setProjectId({ projectId: selectionData.projectId }));
    //   if (isTimerStarted) {
    //     try {
    //       const patch = createReplacePatch({ projectId: selectionData.projectId });
    //       await patchTimeEntry({ id: timeEntryId, patch: patch }).unwrap();
    //     } catch (error) {
    //       dispatch(setProjectId({ projectId: oldProjectId }));
    //     }
    //   }
    // }
  };

  const handleTagsSelectionComplete = async (tagsChecked) => {
    if (!listUtil.isListEqual(tagCheckedList, tagsChecked)) {
      const oldTags = [...tagCheckedList];
      dispatch(setTagsChecked({ tagsChecked: tagsChecked }));
      const patch = createReplacePatch({ tags: tagsChecked });
      if (isTimerStarted) {
        try {
          await patchTimeEntry({
            id: timeEntryId,
            patch: patch,
          }).unwrap();
        } catch (error) {
          dispatch(setTagsChecked({ tagsChecked: oldTags }));
        }
      }
    }
  };

  const handleMenuItemClick = (code) => {
    if (code === "DELETE") {
      dispatch(deleteStartedTimer());
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

  return (
    // <AppBar position="sticky" sx={{ height: APPBAR_HEIGHT }} color="background">
    <AppBar
      position="fixed"
      sx={{ height: APPBAR_HEIGHT, width: "auto" }}
      color="background"
    >
      <Toolbar disableGutters>
        <InputBase
          inputRef={desciptionInput}
          onBlur={handleDescriptionBlur}
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
        <TTIconButton
          style={{ margin: theme.spacing(0, 1) }}
          onClick={(e) => setProjectAnchorEl(e.currentTarget)}
        >
          <Folder />
        </TTIconButton>
        {projectAnchorEl && (
          <ProjectSelector
            currentProjectId={projectId}
            currentWorkspace={currentWorkspace}
            projects={projects}
            workspaces={Object.values(workspaces).reduce(
              (list, next) => [...list, ...next],
              []
            )}
            anchorEl={projectAnchorEl}
            onClose={() => setProjectAnchorEl(null)}
            onSelectionComplete={handleProjectSelectionComplete}
          />
        )}
        <TagsSelector
          tagList={tagList}
          onCreateTagClick={handleCreateTagClick}
          tagCheckedList={tagCheckedList}
          onSelectionComplete={handleTagsSelectionComplete}
        />
        <TTIconButton disabled style={{ margin: theme.spacing(0, 1) }}>
          <AttachMoneyIcon style={{ fontSize: "1.25rem" }} />
        </TTIconButton>
        {/* time Entries */}
        {isTimerMode ? (
          <EntryTimeTextField
            duration={duration}
            startDate={startDate}
            stopDate={isTimerStarted ? startDate + duration * 1000 : stopDate}
            disableStopInput={isTimerStarted}
            onPopperClose={handleTimePopperClose}
            renderTextField={(props) => {
              return <TTTimeTextField withPopOver={true} {...props} />;
            }}
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
