import { InputAdornment, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import TTTimeHMTextField from "../../components/ttTimeHMTextField/TTTimeHMTextField";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { entryDatesActions } from "./EntryDatesReducer";
import { formatDateMD } from "../../utils/TTDateUtil";
import TTDateCalender from "../../components/TTDateCalender/TTDateCalender";
import TTPopper from "../../components/ttPopper/TTPopper";
import { grey } from "@mui/material/colors";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const StyledTextField = styled(TTTimeHMTextField)(({ theme }) => ({
  "& > input": {
    width: "8ch",
  },
}));

const EntryDateChanger = ({ entryDates, entryDatesDispatch }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const isPopperOpen = Boolean(anchorEl);

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
        date={entryDates.startDate}
        onFocus={(e) => setAnchorEl(e.currentTarget)}
        onDateChange={(newDate) =>
          entryDatesDispatch({
            type: entryDatesActions.UPDATE_START_TIME,
            startDate: newDate,
          })
        }
        endAdornment={
          <InputAdornment position="end">
            <Typography color={!isPopperOpen ? grey[800] : grey[500]}>
              {formatDateMD(entryDates.startDate)}
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
          value={entryDates.startDate}
          onChange={(newDate) =>
            entryDatesDispatch({
              type: entryDatesActions.UPDATE_START_DATE,
              startDate: newDate,
            })
          }
        />
      </TTPopper>
      <ArrowRightAltIcon />
      <StyledTextField
        date={entryDates.stopDate}
        onDateChange={(newDate) =>
          entryDatesDispatch({
            type: entryDatesActions.UPDATE_STOP_TIME,
            stopDate: newDate,
          })
        }
      />
    </Stack>
  );
};

export default EntryDateChanger;
