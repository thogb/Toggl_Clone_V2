import {
  CssBaseline,
  ThemeProvider,
  alpha,
  createTheme,
  darken,
} from "@mui/material";
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
import SignUpPage from "./scenes/trackPage/SignUpPage";
import LogInPage from "./scenes/trackPage/LogInPage";

function App() {
  const mode = "light";
  // const mode = "dark";
  const dispatch = useDispatch();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const trackTheme = useMemo(
    () =>
      createTheme(theme, {
        palette: {
          secondary: {
            ...theme.palette.secondary,
            dark: darken(theme.palette.primary.light, 0.15),
          },
          buttonWhite: theme.palette.augmentColor({ color: { main: "#fff" } }),
        },
      }),
    [mode]
  );

  useEffect(() => {
    const dateGroupedEntries = generateDateGroupedEntries(getRawEntryList());

    dispatch(setDateGroupedEntries({ dateGroupedEntries: dateGroupedEntries }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        {/* <div className="mainContent"> */}
        {/* <ThemeProvider theme={trackTheme}>
          <Routes>
            <Route
              path="/track/signup"
              element={
                  <SignUpPage />
            }/>
          </Routes>
        </ThemeProvider> */}
        <Routes>
          <Route
            path="/track/signup"
            element={
              <ThemeProvider theme={trackTheme}>
                <SignUpPage />
              </ThemeProvider>
            }
          />
          <Route
            path="/track/login"
            element={
              <ThemeProvider theme={trackTheme}>
                <LogInPage />
              </ThemeProvider>
            }
          />
          <Route path="/" element={<NavBar />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/theme" element={<ThemePage />} />
            <Route path="/testing" element={<TestingPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
        {/* </div> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
