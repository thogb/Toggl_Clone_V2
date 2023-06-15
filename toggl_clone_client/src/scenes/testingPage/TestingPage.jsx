import { Box, Button, Popover, Typography } from "@mui/material";
import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format, isEqual, parse } from "date-fns";
import dayjs from "dayjs";
import React, { useState } from "react";
import { isDateToday } from "../../utils/TTDateUtil";
import TTPopOver from "../../components/ttPopOver/TTPopOver";
import TTDateCalender from "../../components/TTDateCalender/TTDateCalender";

const TestingPage = () => {
  const [testAnchor, setTestAnchor] = useState(null);
  const [date, setDate] = useState(format(Date.now(), "dd/MM/yyyy"));
  console.log(date);
  console.log(testAnchor);
  console.log(Boolean(testAnchor));
  return (
    <>
      <Button
        variant="contained"
        onClick={(e) => setTestAnchor(e.currentTarget)}
      >
        PopOver
      </Button>
      <TTPopOver anchorEl={testAnchor} onClose={() => setTestAnchor(null)}>
        <Box>test</Box>
      </TTPopOver>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          views={["day"]}
          onChange={(v) => {
            // console.log(dayjs("2022-04-17"));
            // console.log(Date.now());
            console.log(v);
            console.log(
              parse(
                format(new Date(), "dd/MM/yyyy"),
                "dd/MM/yyyy",
                new Date(1970, 0, 1, 0, 0, 0)
              )
            );
            console.log(isDateToday(v));
            console.log(format(v, "dd/MM/yyyy"));
          }}
        />
        <TTDateCalender views={["day"]}></TTDateCalender>
      </LocalizationProvider>
    </>
  );
};

export default TestingPage;
