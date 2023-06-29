import React, { useEffect, useMemo, useReducer, useState } from "react";
import TTTimeTextField from "../ttTimeTextField/TTTimeTextField";
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
import { useDispatch, useSelector } from "react-redux";
import {
  updateDuration,
  updateStartDate,
  updateStartTime,
  updateStopTime,
} from "../../state/currentEntrySlice";
import {
  entryDatesActions,
  entryDatesReducer,
  getIntialEntryDates,
} from "../entryDateChanger/EntryDatesReducer";

const defaultDate = new Date();

const EntryTimeTextField = ({
  duration = 0,
  startDate = defaultDate,
  stopDate = defaultDate,
  staticStop = true,
  disableStopInput = false,
  onFocus,
  onPopperClose,
}) => {
  // const dispatch = useDispatch();
  // const duration = useSelector((state) => state.currentEntry.duration);
  // const startDate = useSelector((state) => state.currentEntry.startDate);
  // const stopDate = useSelector((state) => state.currentEntry.stopDate);
  // const [localDuration, setLocalDuration] = useState(0);
  // const [localStartDate, setLocalStartDate] = useState(new Date());
  // const [localStopDate, setLocalStopDate] = useState(new Date());
  // const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  // const [initialDateInfo, setInitialDateInfo] = useState(null);
  const [entryDatesData, entryDatesDispatch] = useReducer(entryDatesReducer, {
    duration,
    startDate,
    stopDate,
  });

  const localDuration = entryDatesData.duration;
  const localStartDate = entryDatesData.startDate;
  const localStopDate = entryDatesData.stopDate;

  const initialDateInfo = useMemo(() => {
    if (anchorEl != null) {
      return {
        duration,
        startDate,
        stopDate,
      };
    }
    return {};
  }, [anchorEl]);

  useEffect(() => {
    if (anchorEl === null) {
      // if (localDuration !== duration) {
      //   entryDatesDispatch({
      //     type: entryDatesActions.SET_DURATION,
      //     duration: duration,
      //   });
      // }
      // if (localStartDate !== startDate) {
      //   entryDatesDispatch({
      //     type: entryDatesActions.SET_START_DATE,
      //     startDate: startDate,
      //   });
      // }
      // if (localStopDate !== stopDate) {
      //   entryDatesDispatch({
      //     type: entryDatesActions.SET_STOP_DATE,
      //     stopDate: stopDate,
      //   });
      // }
      entryDatesDispatch({
        type: entryDatesActions.SET_DATE_INFO,
        dateInfo: {
          duration,
          startDate,
          stopDate,
        },
      });
    }
  }, [duration, startDate, stopDate]);

  const handleFocus = (e) => {
    setAnchorEl(e.currentTarget);
    if (onFocus != null) onFocus(e);
  };

  const handleBlur = (e) => {};

  const handleSecondChange = (newSecond) => {
    // dispatch(updateDuration({ duration: newSecond, staticStop: staticStop }));
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_DURATION,
      duration: newSecond,
      staticStop: staticStop,
    });
  };

  const handleStartChange = (newDate) => {
    // dispatch(updateStartTime({ startDate: newDate }));
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_START_TIME,
      startDate: newDate,
    });
  };

  const handleStopChange = (newDate) => {
    // dispatch(updateStopTime({ stopDate: newDate }));
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_STOP_TIME,
      stopDate: newDate,
    });
  };

  const handleCalenderChange = (newDate) => {
    // dispatch(updateStartDate({ startDate: newDate }));
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_START_DATE,
      startDate: newDate,
    });
  };

  const handlePopperClose = () => {
    if (onPopperClose)
      onPopperClose({
        initialDateInfo: initialDateInfo,
        duration: localDuration,
        startDate: localStartDate,
        stopDate: localStopDate,
      });
    setAnchorEl(null);
  };

  const daysBetween = getDaysBetween(localStartDate, localStopDate);

  return (
    <>
      {/* duration inputting textfield */}
      <Badge
        badgeContent={daysBetween > 0 ? daysBetween : null}
        color="primary"
      >
        <TTTimeTextField
          withPopOver
          second={localDuration}
          onSecondChange={handleSecondChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Badge>

      {/* popper */}
      <Fade in={Boolean(anchorEl)} timeout={200}>
        <div>
          <TTPopper
            anchorEl={anchorEl}
            onClose={handlePopperClose}
            placement={"bottom"}
            offset={[-40, 0]}
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
