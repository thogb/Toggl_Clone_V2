import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TimerPage from "./scenes/timerPage/TimerPage";
import { useEffect, useMemo } from "react";
import { themeSettings } from "./theme";
import ThemePage from "./scenes/themePage/ThemePage";
import "./App.css";
import HomePage from "./scenes/homePage/HomePage";
import TestingPage from "./scenes/testingPage/TestingPage";
import {
  generateDateGroupedEntries,
  setDateGroupedEntries,
} from "./state/groupedEntryListSlice";
import { getRawEntryList } from "./state/entryListSlice";
import { useDispatch } from "react-redux";
import SignUpPage from "./scenes/trackPage/SignUpPage";
import LogInPage from "./scenes/trackPage/LogInPage";
import AuthorizedPageWrapper from "./routes/AuthorizedPageWrapper";
import TrackPageWrapper from "./routes/TrackPageWrapper";
import { ROUTES } from "./routes/Routes";
import DefaultRoute from "./routes/DefaultRoute";
import UnAuthorizedPageWrapper from "./routes/UnAuthorizedPageWrapper";
import DashBoard from "./scenes/dashBoard/DashBoard";
import ApiPage from "./scenes/testingPage/ApiPage";
import LoadingPage from "./scenes/LoadingPage";

function App() {
  const mode = "light";
  // const mode = "dark";
  const dispatch = useDispatch();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // TODO: to be replaced with api calls
  // useEffect(() => {
  //   const dateGroupedEntries = generateDateGroupedEntries(getRawEntryList());

  //   dispatch(setDateGroupedEntries({ dateGroupedEntries: dateGroupedEntries }));
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Routes>
          <Route element={<UnAuthorizedPageWrapper />}>
            <Route element={<TrackPageWrapper />}>
              <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
              <Route path={ROUTES.LOGIN} element={<LogInPage />} />
            </Route>
          </Route>
          <Route element={<AuthorizedPageWrapper />}>
            <Route element={<DashBoard />}>
              <Route path="/" element={<HomePage />} />
              <Route path={ROUTES.TIMER} element={<TimerPage />} />
              <Route path="/theme" element={<ThemePage />} />
              <Route path="/testing" element={<TestingPage />} />
              {/* <Route path="/api" element={<LoadingPage />} /> */}
              <Route path="/api" element={<ApiPage />} />
            </Route>
          </Route>
          <Route path="*" element={<DefaultRoute />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
