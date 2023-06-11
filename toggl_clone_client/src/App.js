import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TimerPage from "./scenes/timerPage/TimerPage";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import ThemePage from "./scenes/themePage/ThemePage";
import "./App.css";
import HomePage from "./scenes/homePage/HomePage";
import NavBar from "./scenes/navbar/NavBar";

function App() {
  const mode = "light";
  // const mode = "dark";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

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
            </Route>
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
