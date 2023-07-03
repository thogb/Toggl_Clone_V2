import { Box, Stack, Typography, alpha } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SubButton from "../subButton/SubButton";
import { formatDateHMA } from "../../utils/TTDateUtil";
import TimeEntryDateInfo from "./TimeEntryDateInfo";
import EntryTimeTextField from "../entryTimeTextField/EntryTimeTextField";
import TTTimeTextField from "../ttTimeTextField/TTTimeTextField";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

const StyledTTTimeTextField = styled(TTTimeTextField)(({ theme }) => ({
  width: "10ch",
  fontSize: theme.typography.body2.fontSize,
  color: alpha(theme.palette.primary.main, 0.8),
  padding: theme.spacing(1 / 2, 1),
  paddingLeft: theme.spacing(1.5),
  border: "1px solid",
  borderColor: "transparent",
  borderRadius: "8px",

  "&:focus-within": {
    borderColor: grey[300],
    backgroundColor: theme.palette.background.default,
  },

  "& > input": {
    padding: 0,
    textAlign: "end",
  },

  "& > input:focus": {
    color: alpha(theme.palette.primary.main, 0.7),
  },
}));

const TimeEntryDateInfoChanger = ({
  duration = 0,
  startDate,
  stopDate,
  onDateButtonClick,
  onDurationButtonClick,
  onEditComplete = (dateInfo) => {},
}) => {
  const [localDuration, setlocalDuration] = useState(duration);
  const [localStartDate, setlocalStartDate] = useState(startDate);
  const [localStopDate, setlocalStopDate] = useState(stopDate);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const durationTFRef = useRef(null);

  useEffect(() => {
    if (!isPopperOpen) {
      setlocalDuration(duration);
      setlocalStartDate(startDate);
      setlocalStopDate(stopDate);
    }
  }, [duration, startDate, stopDate]);

  const handlePopperOpen = () => {
    setIsPopperOpen(true);
  };

  const handlePopperClose = (dateInfo) => {
    setIsPopperOpen(false);
    onEditComplete(dateInfo);
  };

  const handleDateInfoChange = (dateInfo) => {
    console.log(dateInfo);
    setlocalDuration(dateInfo.duration);
    setlocalStartDate(dateInfo.startDate);
    setlocalStopDate(dateInfo.stopDate);
  };

  return (
    <EntryTimeTextField
      duration={duration}
      startDate={startDate}
      stopDate={stopDate}
      staticStop={false}
      fadeTimeOut={0}
      popperOffsety={10}
      onPopperOpen={handlePopperOpen}
      onPopperClose={handlePopperClose}
      onDateInfoChange={handleDateInfoChange}
      renderTextField={(props) => {
        return (
          <Box
            position={"relative"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <TimeEntryDateInfo
              duration={localDuration}
              startDate={localStartDate}
              stopDate={localStopDate}
              durationButtonStyle={{ visibility: isPopperOpen && "hidden" }}
              onDateButtonClick={() => {
                durationTFRef.current.focus();
              }}
              onDurationButtonClick={() => {
                durationTFRef.current.focus();
              }}
            />
            <Box position={"absolute"} right={0} zIndex={!isPopperOpen && -1}>
              <StyledTTTimeTextField
                inputRef={durationTFRef}
                withPopOver={true}
                {...props}
              />
            </Box>
          </Box>
        );
      }}
    />
  );
};

export default TimeEntryDateInfoChanger;
