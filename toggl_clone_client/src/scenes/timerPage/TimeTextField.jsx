import React, { useState } from "react";
import TTTimeTextField from "../../components/ttTimeTextField/TTTimeTextField";
import TTDateCalender from "../../components/TTDateCalender/TTDateCalender";
import {
  Badge,
  Box,
  Divider,
  Fade,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import TTTimeHMTextField from "../../components/ttTimeHMTextField/TTTimeHMTextField";
import { useTheme } from "@emotion/react";
import { formatDateMD, getDaysBetween } from "../../utils/TTDateUtil";
import TTPopper from "../../components/ttPopper/TTPopper";
import { entryDatesActions } from "./EntryDatesReducer";

const TimeTextField = ({
  entryDates,
  entryDatesDispatch,
  staticStop = true,
  onFocus,
  onPopperClose,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleFocus = (e) => {
    setAnchorEl(e.currentTarget);
    if (onFocus != null) onFocus(e);
  };

  const handleMinuteChange = (newMinute) => {
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_MINUTE,
      durationMin: newMinute,
      staticStop: staticStop,
    });
    // onDurationMinChange(newMinute);
    // if (staticStop) {
    //   onStartDateChange(new Date(stopDate.getTime() - newMinute * 60 * 1000));
    // } else {
    //   onStopDateChange(new Date(startDate.getTime() - newMinute * 60 * 1000));
    // }
  };

  const handleStartChange = (newDate) => {
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_START_TIME,
      startDate: newDate,
    });
    // onStartDateChange(newDate);
    // onDurationMinChange((stopDate.getTime() - newDate.getTime()) / (60 * 1000));
  };

  const handleStopChange = (newDate) => {
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_STOP_TIME,
      stopDate: newDate,
    });
    // onStopDateChange(newDate);
    // onDurationMinChange(
    //   (newDate.getTime() - startDate.getTime()) / (60 * 1000)
    // );
  };

  const handleCalenderChange = (newDate) => {
    entryDatesDispatch({
      type: entryDatesActions.UPDATE_START_DATE,
      startDate: newDate,
    });
    // onStartDateChange(newDate);
    // onStopDateChange(new Date(newDate.getTime() + durationMin * 60 * 1000));
  };

  const handlePopperClose = () => {
    if (onPopperClose) onPopperClose();
    setAnchorEl(null);
  };

  const daysBetween = getDaysBetween(entryDates.startDate, entryDates.stopDate);

  return (
    <>
      {/* duration inputting textfield */}
      <Badge
        badgeContent={daysBetween > 0 ? daysBetween : null}
        color="primary"
      >
        <TTTimeTextField
          withPopOver
          minute={entryDates.durationMin}
          onMinuteChange={handleMinuteChange}
          onFocus={handleFocus}
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
                  date={entryDates.startDate}
                  onDateChange={handleStartChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography color={"secondary"}>
                        {formatDateMD(entryDates.startDate)}
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
                    date={entryDates.stopDate}
                    onDateChange={handleStopChange}
                  />
                </Badge>
              </Box>
            </Stack>
            <Divider />
            <TTDateCalender
              views={["day"]}
              value={entryDates.startDate}
              onChange={handleCalenderChange}
            ></TTDateCalender>
          </TTPopper>
        </div>
      </Fade>
    </>
  );
};

export default TimeTextField;
