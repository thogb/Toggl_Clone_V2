import {
  Box,
  Button,
  Dialog,
  Stack,
  ThemeProvider,
  Typography,
  alpha,
  createTheme,
  useTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";

const ThemePage = () => {
  const theme = useTheme();
  console.log(theme.palette.primary);
  console.log(theme.palette.primary1);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  const newTheme = createTheme(theme, {
    palette: {
      secondary: {
        main: red[500],
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) =>
            theme.unstable_sx({
              backgroundColor: red[500],
              borderRadius: 5,
            }),
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: ({ theme }) =>
            theme.unstable_sx({
              backgroundColor: alpha(theme.palette.primary.main, 0.5),
            }),
        },
      },
    },
  });

  return (
    <ThemeProvider theme={newTheme}>
      <Stack direction={"column"}>
        <Box mb={3}>
          <Typography variant="h6">buttons</Typography>
          <Button variant="contained" color="primary">
            primary
          </Button>
          <Button variant="contained" color="secondary">
            secondary
          </Button>
        </Box>
        <Stack direction={"row"}>
          <Box p={4} bgcolor="primary.light">
            primary.light
          </Box>
          <Box p={4} bgcolor="primary.main">
            primary
          </Box>
          <Box p={4} bgcolor="primary.dark">
            primary.dark
          </Box>
        </Stack>
        <Stack direction={"row"}>
          <Box p={4} bgcolor="primary1.light">
            primary1.light
          </Box>
          <Box p={4} bgcolor="primary1.main">
            primary1
          </Box>
          <Box p={4} bgcolor="primary1.dark">
            primary1.dark
          </Box>
        </Stack>
        <Button variant="contained" onClick={openDialog}>
          open dialog
        </Button>
        <Dialog onClose={() => setIsOpenDialog(false)} open={isOpenDialog}>
          test
        </Dialog>
      </Stack>
    </ThemeProvider>
  );
};

export default ThemePage;
