import {
  Box,
  Button,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
  StaticDatePicker,
  TimeIcon,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  addSeconds,
  format,
  formatDuration,
  isEqual,
  isToday,
  isValid,
  parse,
} from "date-fns";
import dayjs from "dayjs";
import React, { useReducer, useState } from "react";
import { isDateToday } from "../../utils/TTDateUtil";
import TTPopOver from "../../components/ttPopOver/TTPopOver";
import TTDateCalender from "../../components/TTDateCalender/TTDateCalender";
import TTTimeTextField from "../../components/ttTimeTextField/TTTimeTextField";
import { useTheme } from "@emotion/react";
import { green, grey } from "@mui/material/colors";
import TTTimeHMTextField from "../../components/ttTimeHMTextField/TTTimeHMTextField";
import { REFERENCE_DATE } from "../../utils/constants";
import TTPopper from "../../components/ttPopper/TTPopper";
import {
  entryDatesReducer,
  getIntialEntryDates,
} from "../../components/entryDateChanger/EntryDatesReducer";
import EntryDateChanger from "../../components/entryDateChanger/EntryDateChanger";
import EntryTimeTextField from "../../components/entryTimeTextField/EntryTimeTextField";
import SearchTextField from "../../components/searchTextField/SearchTextField";
import TimeEntryItemBase from "../../components/timeEntrySection/TimeEntryItemBase";
import TTTextButton from "../../components/ttTextButton/TTTextButton";
import styled from "@emotion/styled";
import ChecklistIcon from "@mui/icons-material/Checklist";
import GrowingInput from "../../components/growingInput/GrowingInput";
import { TTMenuItem } from "../../components/ttMenu/TTMenuItem";

const StyledMenu = styled((props) => (
  <Menu
    disableScrollLock
    slotProps={{
      paper: {
        style: {
          width: 170,
          borderRadius: 8,
        },
      },
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backgroundColor: "transparent",
  },
  "& .MuiList-root": {
    padding: theme.spacing(1 / 2),
  },
  "& .MuiMenuItem-root": {
    padding: theme.spacing(1 / 2, 1),
    borderRadius: "8px",
    "&:hover": {
      opacity: 1,
    },
  },
}));

const OutlinedIconButton = styled("button")(({ theme }) => ({
  border: "1px solid",
  borderRadius: "8px",
  borderColor: grey[600],
  backgroundColor: "transparent",
  padding: theme.spacing(0.5, 0.75),
  color: grey[600],
  fontSize: "1.2rem",

  "&>svg": {
    fontSize: "1.2rem",
  },

  "&:hover": {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },

  "&.TTToggledOn": {
    backgroundColor: grey[300],
    borderColor: grey[300],
    color: theme.palette.secondary.main,
  },
}));

const TestingPage = () => {
  const [testAnchor, setTestAnchor] = useState(null);
  const [dateAnchor, setDateAnchor] = useState(null);
  const [popperAnchor, setPopperAnchor] = useState(null);
  const [date, setDate] = useState(format(Date.now(), "dd/MM/yyyy"));
  // console.log(date);
  // console.log(testAnchor);
  // console.log(Boolean(testAnchor));
  const [minute, setMinute] = useState(0);

  const [testDate, setTestDate] = useState(new Date());

  const [startDate, setStartDate] = useState(new Date());
  const [stopDate, setStopDate] = useState(new Date());
  const [durationMin, setDurationMin] = useState(0);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [newAnchor, setNewAnchor] = useState(null);
  const [popperWidth, setPopperWidth] = useState(0);

  const [entryDates, entryDatesDispatch] = useReducer(
    entryDatesReducer,
    getIntialEntryDates()
  );

  const theme = useTheme();
  return (
    <>
      <Stack direction={"row"} alignItems={"center"}>
        <Box flexGrow={1}>test</Box>
        <EntryDateChanger
          entryDates={entryDates}
          entryDatesDispatch={entryDatesDispatch}
        />
        <Box flexGrow={1}>test</Box>
        {/* <EntryTimeTextField
          entryDates={entryDates}
          entryDatesDispatch={entryDatesDispatch}
        /> */}
        <Box width={40} height={100} bgcolor={"red"}></Box>
        <Box width={40} height={""} bgcolor={"red"}>
          t
        </Box>
        <input style={{ textAlign: "center" }}></input>

        <TTTimeHMTextField
          date={testDate}
          onDateChange={(v) => setTestDate(v)}
          endAdornment={
            <InputAdornment position="end">
              <TimeIcon />
            </InputAdornment>
          }
        />

        <TTTimeTextField
          size={"sm"}
          height={"80px"}
          minute={minute}
          onFocus={(e) => {
            setDateAnchor(e.currentTarget);
          }}
          withPopOver
          // onMinuteChange={(newMinute) => setMinute(newMinute)}
        />

        <TTTimeTextField
          height={"80px"}
          minute={minute}
          onFocus={(e) => {
            setPopperAnchor(e.currentTarget);
            // setTestAnchor(e.currentTarget);
            // setDateAnchor(e.currentTarget);
          }}
          withPopOver
          // onMinuteChange={(newMinute) => setMinute(newMinute)}
        />

        <TTTimeTextField
          size={"sm"}
          height={"80px"}
          minute={minute}
          onFocus={(e) => {
            setDateAnchor(e.currentTarget);
          }}
          withPopOver
          // onMinuteChange={(newMinute) => setMinute(newMinute)}
        />

        <TTPopper anchorEl={popperAnchor} onClose={() => setPopperAnchor(null)}>
          <Box height={"200px"}>test</Box>
        </TTPopper>
        <TTPopOver anchorEl={dateAnchor} onClose={() => setDateAnchor(null)}>
          <Box height={"200px"}>test</Box>
        </TTPopOver>
        <EntryTimeTextField
          entryDates={entryDates}
          entryDatesDispatch={entryDatesDispatch}
        />
        <TTTimeTextField
          size={"sm"}
          height={"80px"}
          minute={minute}
          onFocus={(e) => {
            setDateAnchor(e.currentTarget);
          }}
          withPopOver
          // onMinuteChange={(newMinute) => setMinute(newMinute)}
        />
        <Button variant="contained">testbut</Button>
        <Button
          variant="contained"
          onClick={(e) => setTestAnchor(e.currentTarget)}
          // style={{ zIndex: theme.zIndex.modal + 1 }}
        >
          PopOver
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            // console.log(
            //   parse(
            //     format(new Date(), "dd/MM/yyyy"),
            //     "dd/MM/yyyy",
            //     new Date(1970, 0, 1, 0, 0, 0)
            //   )
            // );
            // setPopperAnchor(e.currentTarget);
            const newDate = addSeconds(
              new Date(1972, 0, 1, 0, 0, 0).getTime(),
              3666
            );
            console.log(newDate.getTime());
          }}
        >
          PopOver
        </Button>
        {/* <TTPopper anchorEl={popperAnchor} onClose={() => setPopperAnchor(null)}>
          tets
        </TTPopper> */}
      </Stack>
      <TTPopOver anchorEl={testAnchor} onClose={() => setTestAnchor(null)}>
        <Box>test</Box>
        <Box>test</Box>
        <Box>test</Box>
        <Box>test</Box>
      </TTPopOver>
      <SearchTextField />
      <GrowingInput></GrowingInput>
      <TTTextButton text={"delete"} />
      {/* <span value={"test"} placeholder="Add Description" contentEditable>
        test
      </span> */}
      <OutlinedIconButton
        className={toggleChecked && "TTToggledOn"}
        onClick={() => setToggleChecked(!toggleChecked)}
      >
        <ChecklistIcon />
      </OutlinedIconButton>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <TimeEntryItemBase></TimeEntryItemBase>
        <TimeEntryItemBase showCheckbox={true}></TimeEntryItemBase>
      </ul>
      <List>
        <ListItem disableGutters disablePadding>
          <ListItemText>test</ListItemText>
          <ListItemText>test</ListItemText>
        </ListItem>
      </List>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </ul>
      <Button
        variant="contained"
        onClick={(e) => setMenuAnchor(e.currentTarget)}
      >
        menu
      </Button>
      <StyledMenu
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <TTMenuItem>testasd</TTMenuItem>
        <MenuItem selected>test</MenuItem>
        <MenuItem disabled>test</MenuItem>
        <MenuItem>test</MenuItem>
      </StyledMenu>
      <Box width={"800px"} backgroundColor={grey[500]} ml={15} p={4}>
        {/* <Button
          variant="contained"
          fullWidth
          onClick={(e) => setNewAnchor(e.currentTarget)}
        >
          expand
        </Button> */}
        <TTPopper
          anchorEl={newAnchor}
          onClose={(e) => {
            setNewAnchor(null);
          }}
          sameWidthAsTrigger={true}
          triggerComponent={
            <Button
              onResize={(e) => console.log(e)}
              variant="contained"
              fullWidth
              onClick={(e) => {
                console.log(e);
                // console.log(e.target.clientWidth);
                // setPopperWidth(`${e.target.clientWidth}px`);
                setNewAnchor(e.currentTarget);
              }}
            >
              expand
            </Button>
          }
        >
          test
        </TTPopper>
      </Box>
      {/* <Menu
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        style={{ paddingTop: 10 }}
      >
        <MenuItem style={{ borderRadius: "10px" }} color="primary.main">
          test
        </MenuItem>
        <MenuItem>test</MenuItem>
        <MenuItem>test</MenuItem>
        <MenuItem>test</MenuItem>
      </Menu> */}
      {/* <Box
        bgcolor={green[500]}
        width={"400px"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box display={"flex"} flexDirection={"row"} gap={2}>
          <TextField></TextField>
          <TextField></TextField>
        </Box>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </Box> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/* <DateCalendar
          views={["day"]}
          // value={testDate}
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
            console.log(format(v, "h:mm a"));
            console.log(
              parse("13:30 PM", "h:mm a", new Date(1970, 0, 1, 0, 0, 0))
            );
            console.log(format(v, "dd/MM/yyyy"));
            // try {
            //   console.log(format("12", "h:mm a"));
            // } catch (e) {
            //   console.log("invalid");
            // }
            console.log(
              isValid(
                parse(
                  format(new Date(), "dd/MM/yyyy"),
                  "h:mm a",
                  new Date(1970, 0, 1, 0, 0, 0)
                )
              )
            );
            console.log(isToday(new Date()));
          }}
        /> */}
        <TTDateCalender views={["day"]}></TTDateCalender>
      </LocalizationProvider>
    </>
  );
};

export default TestingPage;
