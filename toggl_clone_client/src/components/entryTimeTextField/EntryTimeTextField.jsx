import React, { useEffect, useReducer, useState } from "react";
import TTDateCalender from "../TTDateCalender/TTDateCalender";
import {
  Badge,
  Box,
  Divider,
  Fade,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import TTTimeHMTextField from "../ttTimeHMTextField/TTTimeHMTextField";
import { useTheme } from "@emotion/react";
import { formatDateMD, getDaysBetween } from "../../utils/TTDateUtil";
import TTPopper from "../ttPopper/TTPopper";

import {
  entryDatesActions,
  entryDatesReducer,
} from "../entryDateChanger/EntryDatesReducer";

const defaultDate = new Date();

const EntryTimeTextField = ({
  duration = 0,
  startDate = defaultDate,
  stopDate = defaultDate,

  fadeTimeOut = 200,

  staticStop = true,
  disableStopInput = false,
  resetDatesOnZeroDuration = true,

  renderTextField = ({ second, onSecondChange, onFocus, onBlur }) => null,

  onDateInfoChange, // (dateInfo) => {};

  popperOffsetx,
  popperOffsety,

  onFocus,
  onPopperOpen,
  onPopperClose,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const [initialDateInfo, setInitialDateInfo] = useState({
    duration: duration,
    startDate: new Date(startDate),
    stopDate: new Date(stopDate),
  });
  const [entryDatesData, entryDatesDispatch] = useReducer(entryDatesReducer, {
    duration,
    startDate,
    stopDate,
  });

  const localDuration = entryDatesData.duration;
  const localStartDate = new Date(entryDatesData.startDate);
  const localStopDate = new Date(entryDatesData.stopDate);

  useEffect(() => {
    if (anchorEl === null) {
      entryDatesDispatch({
        type: entryDatesActions.SET_DATE_INFO,
        dateInfo: {
          duration: duration,
          startDate: new Date(startDate).getTime(),
          stopDate: new Date(stopDate).getTime(),
        },
      });
    }
  }, [duration, startDate, stopDate]);

  useEffect(() => {
    if (onDateInfoChange)
      onDateInfoChange({
        duration: localDuration,
        startDate: localStartDate.getTime(),
        stopDate: localStopDate.getTime(),
      });
  }, [localDuration, localStartDate.getTime(), localStopDate.getTime()]);

  const handleFocus = (e) => {
    let newInitialDateInfo = {
      duration: duration,
      startDate: new Date(startDate),
      stopDate: new Date(stopDate),
    };
    if (resetDatesOnZeroDuration && localDuration === 0) {
      newInitialDateInfo = {
        duration: 0,
        startDate: new Date(),
        stopDate: new Date(),
      };
      entryDatesDispatch({
        type: entryDatesActions.RESET_ENTRY_DATES,
      });
    }
    setInitialDateInfo(newInitialDateInfo);
    setAnchorEl(e.currentTarget);
    if (onFocus != null) onFocus(e);
    if (onPopperOpen != null) onPopperOpen(e);
  };

  const handleBlur = (e) => {};

  const handleSecondChange = (newSecond) => {
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_DURATION,
      duration: newSecond,
      staticStop: staticStop,
    });
  };

  const handleStartChange = (newDate) => {
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_START_TIME,
      startDate: newDate.getTime(),
    });
  };

  const handleStopChange = (newDate) => {
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_STOP_TIME,
      stopDate: newDate.getTime(),
    });
  };

  const handleCalenderChange = (newDate) => {
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_START_DATE,
      startDate: newDate.getTime(),
    });
  };

  const handlePopperClose = () => {
    if (onPopperClose)
      onPopperClose({
        initialDateInfo: initialDateInfo,
        finalDateInfo: {
          duration: localDuration,
          startDate: localStartDate,
          stopDate: localStopDate,
        },
        duration: localDuration,
        startDate: localStartDate,
        stopDate: localStopDate,
      });
    setAnchorEl(null);
  };

  // const handleDurationEditComplete = (newDuration) => {
  //   if (onDateInfoChange) onDateInfoChange({
  //     duration: newDuration,
  //     startDate: localStartDate,
  //     stopDate: localStopDate,
  //   });
  // }

  // const handleStartDateEditComplete = (newStartDate) => {
  // }

  // const handleStopDateEditComplete = (newStopDate) => {
  // }

  const daysBetween = getDaysBetween(localStartDate, localStopDate);

  return (
    <>
      {/* duration inputting textfield */}
      <Badge
        badgeContent={daysBetween > 0 ? daysBetween : null}
        color="primary"
      >
        {renderTextField({
          second: localDuration,
          onSecondChange: handleSecondChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
        })}
        {/* <TTTimeTextField
          withPopOver
          second={localDuration}
          onSecondChange={handleSecondChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        /> */}
      </Badge>

      {/* popper */}
      <Fade in={Boolean(anchorEl)} timeout={fadeTimeOut}>
        <div>
          <TTPopper
            anchorEl={anchorEl}
            onClose={handlePopperClose}
            placement={"bottom"}
            offset={[popperOffsetx ?? -40, popperOffsety ?? 0]}
          >
            <Stack
              direction={"row"}
              gap={1.5}
              padding={theme.ttSpacings.popOver.px}
              mb={2}
            >
              <Box flexBasis={"50%"}>
                <Typography variant="caption">START</Typography>
                <TTTimeHMTextField
                  date={localStartDate}
                  onDateChange={handleStartChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography color={"secondary"}>
                        {formatDateMD(localStartDate)}
                      </Typography>
                    </InputAdornment>
                  }
                />
              </Box>
              <Box flexBasis={"50%"}>
                <Typography variant="caption">STOP</Typography>
                <Badge
                  badgeContent={daysBetween > 0 ? daysBetween : null}
                  color="primary"
                >
                  <TTTimeHMTextField
                    date={localStopDate}
                    onDateChange={handleStopChange}
                    disabled={disableStopInput}
                  />
                </Badge>
              </Box>
            </Stack>
            <Divider />
            <TTDateCalender
              views={["day"]}
              value={localStartDate}
              onChange={handleCalenderChange}
            ></TTDateCalender>
          </TTPopper>
        </div>
      </Fade>
    </>
  );
};

export default EntryTimeTextField;
