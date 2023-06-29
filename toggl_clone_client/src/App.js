import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TimerPage from "./scenes/timerPage/TimerPage";
import { useEffect, useMemo } from "react";
import { themeSettings } from "./theme";
import ThemePage from "./scenes/themePage/ThemePage";
import "./App.css";
import HomePage from "./scenes/homePage/HomePage";
import NavBar from "./scenes/navbar/NavBar";
import TestingPage from "./scenes/testingPage/TestingPage";
import {
  generateDateGroupedEntries,
  setDateGroupedEntries,
} from "./state/groupedEntryListSlice";
import { getRawEntryList } from "./state/entryListSlice";
import { useDispatch } from "react-redux";

function App() {
  const mode = "light";
  // const mode = "dark";
  const dispatch = useDispatch();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    const dateGroupedEntries = generateDateGroupedEntries(getRawEntryList());
    // console.log("in app useeffect");
    // console.log(dateGroupedEntries);
    dispatch(setDateGroupedEntries({ dateGroupedEntries: dateGroupedEntries }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/timer" element={<TimerPage />} />
              <Route path="/theme" element={<ThemePage />} />
              <Route path="/testing" element={<TestingPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
