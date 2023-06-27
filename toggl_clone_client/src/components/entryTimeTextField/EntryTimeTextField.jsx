import React, { useState } from "react";
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

const EntryTimeTextField = ({ staticStop = true, onFocus, onPopperClose }) => {
  const dispatch = useDispatch();
  const duration = useSelector((state) => state.currentEntry.duration);
  const startDate = useSelector((state) => state.currentEntry.startDate);
  const stopDate = useSelector((state) => state.currentEntry.stopDate);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleFocus = (e) => {
    setAnchorEl(e.currentTarget);
    if (onFocus != null) onFocus(e);
  };

  const handleSecondChange = (newSecond) => {
    dispatch(
      updateDuration({ duration: newSecond * 1000, staticStop: staticStop })
    );
  };

  const handleStartChange = (newDate) => {
    dispatch(updateStartTime({ startDate: newDate }));
  };

  const handleStopChange = (newDate) => {
    dispatch(updateStopTime({ stopDate: newDate }));
  };

  const handleCalenderChange = (newDate) => {
    dispatch(updateStartDate({ startDate: newDate }));
  };

  const handlePopperClose = () => {
    if (onPopperClose) onPopperClose();
    setAnchorEl(null);
  };

  const daysBetween = getDaysBetween(startDate, stopDate);

  return (
    <>
      {/* duration inputting textfield */}
      <Badge
        badgeContent={daysBetween > 0 ? daysBetween : null}
        color="primary"
      >
        <TTTimeTextField
          withPopOver
          second={Math.floor(duration / 1000)}
          onSecondChange={handleSecondChange}
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
                  date={startDate}
                  onDateChange={handleStartChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography color={"secondary"}>
                        {formatDateMD(startDate)}
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
                    date={stopDate}
                    onDateChange={handleStopChange}
                  />
                </Badge>
              </Box>
            </Stack>
            <Divider />
            <TTDateCalender
              views={["day"]}
              value={startDate}
              onChange={handleCalenderChange}
            ></TTDateCalender>
          </TTPopper>
        </div>
      </Fade>
    </>
  );
};

export default EntryTimeTextField;
