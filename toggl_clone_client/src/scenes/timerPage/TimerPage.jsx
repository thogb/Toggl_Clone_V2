import { Box, ThemeProvider, createTheme, useTheme } from "@mui/material";
import React from "react";
import { grey, orange } from "@mui/material/colors";
import TimerTopBar from "../../components/timerTopBar/TimerTopBar";
import TimerListView from "./TimerListView";
import PageContainer from "../../components/pageContainer/PageContainer";
import { APPBAR_HEIGHT } from "../../utils/constants";

export const viewTypes = {
  LIST: "LIST",
  WEEK: "WEEK",
  DAY: "DAY",
};

const TimerPage = () => {
  const theme = useTheme();

  const viewType = "LIST";

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

  console.log("Start time: " + Date.now());

  return (
    <PageContainer minWidth={"720px"}>
      <ThemeProvider theme={newTheme}>
        {/* top bar */}
        <TimerTopBar />
        {/* views */}
        {/* <Box pt={`${APPBAR_HEIGHT}px`}>tool bar</Box> */}
        <Box mt={`${APPBAR_HEIGHT}px`}>{/* tool bar */}</Box>
        <Box pt={2}>{/* tool bar */}</Box>
        {viewType === "LIST" && <TimerListView />}
      </ThemeProvider>
    </PageContainer>
  );
};

export default TimerPage;
