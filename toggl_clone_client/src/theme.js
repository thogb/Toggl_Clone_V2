import { alpha, createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const themeSettings = (mode) => {
  const spacing = 8;
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
      action: {
        ...theme.palette.action,
        // selected: alpha(red[500], 0.8),
        hover: alpha("#000", 0.1),
        // selected: alpha("#000", 0.9),
        hoverOpacity: 0.1,
        selectedOpacity: 0.2,
      },
    },
    spacing: spacing,
    ttSpacings: {
      page: {
        px: 2.5,
      },
      popOver: {
        px: 2,
      },
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
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) =>
            theme.unstable_sx({
              textTransform: "capitalize",
            }),
        },
      },
    },
  };
};
