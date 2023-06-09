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
              main: "#2c1338",
              dark: "#220a2e",
            },
            secondary: {
              main: "#c95ebe",
            },
            primary1: augmentColor({ color: { main: "#95899a" } }),
          }
        : {}),
    },
  };
};
