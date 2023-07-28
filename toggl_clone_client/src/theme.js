import { alpha, createTheme } from "@mui/material";

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
            yellowShade: augmentColor({ color: { main: "#FFDE91" } }),
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
      text: {
        placeholder: alpha("#2c1338", 0.8),
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
      popper: {
        px: 2,
      },
    },
    shape: {
      borderRadius: 8,
    },
    zIndex: {
      popper: 1050,
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
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: ({ theme }) =>
            theme.unstable_sx({
              textTransform: "capitalize",
            }),
        },
        // variants: [
        //   {
        //     props: { variant: "contained" },
        //     style: ({ theme }) => {
        //       return {
        //         backgroundColor: theme.palette.secondary.main,
        //       };
        //     },
        //   },
        // ],
      },
    },
  };
};
