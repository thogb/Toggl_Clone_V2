import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputBase,
  Stack,
  ThemeProvider,
  Toolbar,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { APPBAR_HEIGHT } from "../../utils/constants";
import CircularStartButton from "../../components/circularStartButton/CircularStartButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TTIconButton from "../../components/ttIconButton/TTIconButton";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import TTSecondaryButton from "../../components/ttSecondaryButton/TTSecondaryButton";
import { grey, orange } from "@mui/material/colors";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TimerPage = () => {
  //timer mode stored in localstorage, maybe redux
  const [isTimerMode, setIsTimerMode] = useState(true);

  //retrieved from redux for if timer is started
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const [BColor, setBColor] = useState(false);

  const mw620 = useMediaQuery("(min-width:620px)");

  const theme = useTheme();

  const newTheme = createTheme(theme, {
    palette: {
      timerOption: theme.palette.augmentColor({
        color: { main: grey[600], contrastText: "#fff" },
      }),
      timerOptionSelected: {
        light: grey[900],
        main: grey[900],
        dark: grey[900],
        contrastText: "#fff",
      },
      timing: theme.palette.augmentColor({
        color: { main: orange[700], contrastText: "#fff" },
      }),
    },
  });

  const toggleTimerStarted = () => {
    if (isTimerMode) {
      setIsTimerStarted(!isTimerStarted);
    }
  };

  const timerOptionStyle = {
    shadow: {
      size: "0px",
    },
    shadowHover: {
      size: "0px",
    },
    shadowFocus: {
      size: "5px",
      color: theme.palette.secondary.main,
      opacity: 0.5,
    },
  };

  const timerOptionSSelected = {
    shadow: {
      size: "0px",
    },
    shadowHover: {
      size: "0px",
    },
    shadowFocus: {
      size: "0px",
    },
  };

  return (
    <ThemeProvider theme={newTheme}>
      <Box>
        {/* top bar */}
        <AppBar
          position="sticky"
          sx={{ height: APPBAR_HEIGHT }}
          color="background"
        >
          <Toolbar disableGutters>
            <InputBase
              placeholder={
                isTimerStarted
                  ? "(no description)"
                  : isTimerMode
                  ? "What are you working on?"
                  : "What have you done?"
              }
              sx={{
                height: APPBAR_HEIGHT,
                pl: theme.spacing(2.5),
                flexGrow: 1,
                fontWeight: "bold",
                fontSize: theme.typography.h6.fontSize,
              }}
            />
            <Button
              variant="text"
              color="secondary"
              startIcon={<AddIcon fontSize="large" />}
              disableElevation
              disableRipple
              disableTouchRipple
              disableGutters
              sx={{
                pl: 2.5,
                pr: 1.5,
                textTransform: "none",
                fontSize: 14,
                lineHeight: "1",
                fontWeight: "400",
                color: "black",
                minWidth: 0,
                borderRadius: "8px",
                "& .MuiSvgIcon-root": {
                  fontSize: 16,
                  color: theme.palette.secondary.main,
                },
              }}
            >
              {mw620 ? "Create a project" : ""}
            </Button>
            <TTIconButton>
              <LocalOfferIcon />
            </TTIconButton>
            <TTIconButton disabled>
              <AttachMoneyIcon />
            </TTIconButton>
            <CircularStartButton
              bgColor={isTimerStarted ? "timing" : "secondary"}
              onClick={toggleTimerStarted}
              shadowHover={{ size: "3px" }}
            >
              {!isTimerMode ? (
                <AddIcon style={{ fontSize: "30px" }} />
              ) : isTimerStarted ? (
                <StopIcon style={{ fontSize: "30px" }} />
              ) : (
                <PlayArrowIcon style={{ fontSize: "30px" }} />
              )}
            </CircularStartButton>
            <Box
              mx={theme.ttSpacings.page.px}
              bgcolor={grey[200]}
              p={"5px"}
              borderRadius={"12px"}
            >
              <Stack direction={"column"} gap={1.5}>
                <CircularStartButton
                  disabled={true}
                  size="16px"
                  bgColor={isTimerMode ? "timerOptionSelected" : "timerOption"}
                  onClick={() => {
                    if (!isTimerMode) {
                      setIsTimerMode(true);
                    }
                  }}
                  {...(isTimerMode ? timerOptionSSelected : timerOptionStyle)}
                >
                  <PlayArrowIcon sx={{ fontSize: "14px" }} />
                </CircularStartButton>
                <CircularStartButton
                  size="16px"
                  bgColor={!isTimerMode ? "timerOptionSelected" : "timerOption"}
                  onClick={() => {
                    if (isTimerMode) {
                      setIsTimerMode(false);
                    }
                  }}
                  {...(!isTimerMode ? timerOptionSSelected : timerOptionStyle)}
                >
                  <AddIcon sx={{ fontSize: "14px" }} />
                </CircularStartButton>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        {/* end of top bar */}
        <Box>body</Box>
        <Button
          variant="contained"
          disableRipple
          disableTouchRipple
          disableElevation
          color="secondary"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "relative",
            p: 0,
            minWidth: "40px",
            minHeight: "40px",
            width: "40px",
            height: "40px",
            boxSizing: "content-box",
            boxShadow: "0px 0px 10px 4px gray",
            "&:hover": {
              boxShadow: "0px 0px 10px 2px gray",
            },
            "&::after": {
              content: '""',
              minWidth: "44px",
              minHeight: "44px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid gray",
              position: "absolute",
            },
            "&:hover::after": {
              minWidth: "42px",
              minHeight: "42px",
              width: "42px",
              height: "42px",
              border: "1px solid gray",
            },
            "&::before": {
              content: '""',
              borderWidth: "8px",
              borderStyle: "solid",
              borderLeftWidth: "12px",
              transform: "translateX(6px)",
              borderColor: "transparent transparent transparent white",
              position: "absolute",
            },
          }}
        ></Button>
        <CircularStartButton>
          <PlayArrowIcon />
        </CircularStartButton>
        <CircularStartButton>
          <StopIcon />
        </CircularStartButton>
        <Button
          variant="contained"
          disableRipple
          disableTouchRipple
          disableElevation
          color="secondary"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            position: "relative",
            p: 0,
            minWidth: "40px",
            minHeight: "40px",
            width: "40px",
            height: "40px",
            boxSizing: "content-box",
            boxShadow: "0px 0px 10px 4px gray",
            "&:hover": {
              boxShadow: "0px 0px 10px 2px gray",
            },
            "&::after": {
              content: '""',
              minWidth: "44px",
              minHeight: "44px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid gray",
              position: "absolute",
            },
            "&:hover::after": {
              minWidth: "42px",
              minHeight: "42px",
              width: "42px",
              height: "42px",
              border: "1px solid gray",
            },
            "&::before": {
              content: '""',
              borderWidth: "7px",
              borderStyle: "solid",
              borderColor: "white",
              position: "absolute",
            },
          }}
        ></Button>

        <Box
          width={200}
          height={60}
          bgcolor={"green"}
          borderRadius={"50%"}
        ></Box>
        <div>test</div>
        <div>test</div>
        <div>test</div>

        <Box bgcolor={"green"} flexDirection={"row"} gap={2} display={"flex"}>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </Box>

        <Button
          variant="contained"
          color={BColor ? "secondary" : "primary"}
          onBlur={() => setBColor(false)}
          onFocus={() => setBColor(true)}
        >
          test
        </Button>
        <Button disableRipple autoCapitalize="F">
          test
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default TimerPage;
