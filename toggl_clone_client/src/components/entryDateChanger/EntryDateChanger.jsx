import { Badge, InputAdornment, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import TTTimeHMTextField from "../ttTimeHMTextField/TTTimeHMTextField";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { formatDateMD, getDaysBetween } from "../../utils/TTDateUtil";
import TTDateCalender from "../TTDateCalender/TTDateCalender";
import TTPopper from "../ttPopper/TTPopper";
import { grey } from "@mui/material/colors";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStartDate,
  updateStartTime,
  updateStopTime,
} from "../../state/currentEntrySlice";

const StyledTextField = styled(TTTimeHMTextField)(({ theme }) => ({
  "& > input": {
    width: "8ch",
  },
}));

const EntryDateChanger = () => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.currentEntry.startDate);
  const stopDate = useSelector((state) => state.currentEntry.stopDate);

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const isPopperOpen = Boolean(anchorEl);

  const daysBetween = getDaysBetween(startDate, stopDate);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={1.5}
      mx={theme.spacing(1)}
    >
      <StyledTextField
        withPopOver={true}
        style={!isPopperOpen ? { borderColor: grey[700] } : null}
        date={startDate}
        onFocus={(e) => setAnchorEl(e.currentTarget)}
        onDateChange={(newDate) =>
          dispatch(updateStartTime({ startDate: newDate }))
        }
        endAdornment={
          <InputAdornment position="end">
            <Typography color={!isPopperOpen ? grey[800] : grey[500]}>
              {formatDateMD(startDate)}
            </Typography>
          </InputAdornment>
        }
      />
      <TTPopper
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        placement={"bottom"}
        gap={theme.spacing(1)}
      >
        <TTDateCalender
          value={startDate}
          onChange={(newDate) =>
            dispatch(updateStartDate({ startDate: newDate }))
          }
        />
      </TTPopper>
      <ArrowRightAltIcon />
      <Badge
        badgeContent={daysBetween > 0 ? daysBetween : null}
        color="primary"
      >
        <StyledTextField
          date={stopDate}
          onDateChange={(newDate) =>
            dispatch(updateStopTime({ stopDate: newDate }))
          }
        />
      </Badge>
    </Stack>
  );
};

export default EntryDateChanger;
