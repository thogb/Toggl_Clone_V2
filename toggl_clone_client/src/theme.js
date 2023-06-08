import { createTheme } from "@mui/material";

export const themeSettings = (mode) => {
  const theme = createTheme();
  const { augmentColor } = theme.palette;
  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#220a2e",
            },
            secondary: {
              main: "#c95ebe",
            },
            primary1: augmentColor({ color: { main: "#2c1338" } }),
          }
        : {}),
    },
  };
};
