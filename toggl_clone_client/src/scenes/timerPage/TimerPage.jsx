import {
  Box,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { grey, orange } from "@mui/material/colors";
import TimerTopBar from "../../components/timerTopBar/TimerTopBar";
import TimerListView from "./TimerListView";
import PageContainer from "../../components/pageContainer/PageContainer";

export const viewTypes = {
  LIST: "LIST",
  WEEK: "WEEK",
  DAY: "DAY",
};

const TimerPage = () => {
  const [BColor, setBColor] = useState(false);
  const mw620 = useMediaQuery("(min-width:620px)");
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
        <Box pt={2}>{/* tool bar */}</Box>
        {viewType === "LIST" && <TimerListView />}
      </ThemeProvider>
    </PageContainer>
  );
};

export default TimerPage;
