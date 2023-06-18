import React, { useState } from "react";
import TTTimeTextField from "../../components/ttTimeTextField/TTTimeTextField";
import TTDateCalender from "../../components/TTDateCalender/TTDateCalender";
import {
  Badge,
  Box,
  Fade,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import TTTimeHMTextField from "../../components/ttTimeHMTextField/TTTimeHMTextField";
import { useTheme } from "@emotion/react";
import { formatDateMD, getDaysBetween } from "../../utils/TTDateUtil";
import TTPopper from "../../components/ttPopper/TTPopper";

const TimeTextField = ({
  startDate,
  onStartDateChange,
  stopDate,
  onStopDateChange,
  durationMin,
  onDurationMinChange,
  staticStop = true,
  onFocus,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleFocus = (e) => {
    setAnchorEl(e.currentTarget);
    if (onFocus != null) onFocus(e);
  };

  const handleMinuteChange = (newMinute) => {
    onDurationMinChange(newMinute);
    if (staticStop) {
      onStartDateChange(new Date(stopDate.getTime() - newMinute * 60 * 1000));
    } else {
      onStopDateChange(new Date(startDate.getTime() - newMinute * 60 * 1000));
    }
  };

  const handleStartChange = (newDate) => {
    onStartDateChange(newDate);
    console.log((stopDate.getTime() - newDate.getTime()) / (60 * 1000));
    onDurationMinChange((stopDate.getTime() - newDate.getTime()) / (60 * 1000));
  };

  const handleStopChange = (newDate) => {
    onStopDateChange(newDate);
    onDurationMinChange(
      (newDate.getTime() - startDate.getTime()) / (60 * 1000)
    );
  };

  const handleCalenderChange = (newDate) => {
    onStartDateChange(newDate);
    onStopDateChange(new Date(newDate.getTime() + durationMin * 60 * 1000));
  };

  const daysBetween = getDaysBetween(startDate, stopDate);

  return (
    <>
      <Badge
        badgeContent={daysBetween > 0 ? daysBetween : null}
        color="primary"
      >
        <TTTimeTextField
          withPopOver
          minute={durationMin}
          onMinuteChange={handleMinuteChange}
          onFocus={handleFocus}
        />
      </Badge>

      <Fade in={Boolean(anchorEl)} timeout={200}>
        <div>
          <TTPopper
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            placement={"bottom"}
          >
            <Stack
              direction={"row"}
              gap={1.5}
              padding={theme.ttSpacings.popOver.px}
            >
              <Box>
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
              <Box>
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

export default TimeTextField;
