import { alpha, createTheme } from "@mui/material";

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
        : {
            primary1: augmentColor({ color: { main: "#95899a" } }),
          }),
    },
    components: {
      MuiBackdrop: {
        styleOverrides: {
          root: ({ theme }) =>
            theme.unstable_sx({
              backgroundColor: alpha(theme.palette.primary.main, 0.7),
            }),
        },
      },
    },
  };
};
