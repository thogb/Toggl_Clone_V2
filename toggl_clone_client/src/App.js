import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TimerPage from "./scenes/timerPage/TimerPage";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import "./App.css";
import SignUpPage from "./scenes/trackPage/SignUpPage";
import LogInPage from "./scenes/trackPage/LogInPage";
import AuthorizedPageWrapper from "./routes/AuthorizedPageWrapper";
import TrackPageWrapper from "./routes/TrackPageWrapper";
import { ROUTES, anonRoutes, generateRoutes } from "./routes/Routes";
import DefaultRoute from "./routes/DefaultRoute";
import UnAuthorizedPageWrapper from "./routes/UnAuthorizedPageWrapper";
import DashBoard from "./scenes/dashBoard/DashBoard";
import TagsPage from "./scenes/tagsPage/TagsPage";

function App() {
  const mode = "light";
  // const mode = "dark";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const anonRouteComps = useMemo(() => generateRoutes(anonRoutes), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Routes>
          <Route element={<UnAuthorizedPageWrapper />}>
            {/* <Route element={<TrackPageWrapper />}>
              <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
              <Route path={ROUTES.LOGIN} element={<LogInPage />} />
            </Route> */}
            {anonRouteComps}
          </Route>
          <Route element={<AuthorizedPageWrapper />}>
            <Route element={<DashBoard />}>
              <Route path={ROUTES.TIMER} element={<TimerPage />} />
              <Route path="/tags" element={<TagsPage />} />
              {/* <Route path="/api" element={<ApiPage />} /> */}
            </Route>
          </Route>
          <Route path="*" element={<DefaultRoute />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
