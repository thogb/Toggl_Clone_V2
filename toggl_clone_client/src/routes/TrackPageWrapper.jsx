import { useTheme } from "@emotion/react";
import { ThemeProvider, createTheme, darken } from "@mui/material";
import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";

const TrackPageWrapper = () => {
  const theme = useTheme();
  const trackTheme = useMemo(
    () =>
      createTheme(theme, {
        palette: {
          secondary: {
            ...theme.palette.secondary,
            dark: darken(theme.palette.primary.light, 0.15),
          },
          buttonWhite: theme.palette.augmentColor({
            color: { main: "#fff" },
          }),
        },
      }),
    [theme]
  );
  return (
    <ThemeProvider theme={trackTheme}>
      <Outlet />
    </ThemeProvider>
  );
};

export default TrackPageWrapper;
