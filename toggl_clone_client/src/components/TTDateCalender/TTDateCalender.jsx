import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

const StyledDateCalender = styled(DateCalendar)(({ theme }) => ({
  "& .MuiPickersCalendarHeader-root": {
    "& .MuiPickersCalendarHeader-label": {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: 300,
    },
    "& .MuiPickersArrowSwitcher-root": {
      "& .MuiButtonBase-root": {
        borderRadius: "10px",
        borderWidth: 0.2,
        borderColor: grey[600],
        marginLeft: theme.spacing(0.1),
        borderStyle: "solid",
        fontSize: "20px",
      },
    },
  },
  "& .MuiPickersSlideTransition-root": {
    minHeight: 280,
  },
  "& .MuiDayCalendar-header": {
    "& .MuiTypography-root ": {
      alignItems: "end",
    },
  },
  "& .MuiDayCalendar-monthContainer": {
    "& .MuiDayCalendar-weekContainer": {
      // borderTop: "1px solid green",
      "&:after": {
        content: '""',
        position: "absolute",
        width: "85%",
        height: 1,
        backgroundColor: grey[400],
      },

      "& .MuiButtonBase-root": {
        height: 34,
        borderRadius: "8px",
        marginTop: 4,
        marginBottom: 1,
      },
      "& .MuiPickersDay-today": {
        borderColor: grey[500],
        backgroundColor: grey[300],
      },
      "& .Mui-selected": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
}));

const TTDateCalender = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledDateCalender
        slotProps={{
          day: { disableRipple: true },
          nextIconButton: { disableRipple: true },
          previousIconButton: { disableRipple: true },
        }}
        {...props}
      ></StyledDateCalender>
    </LocalizationProvider>
  );
};

export default TTDateCalender;
