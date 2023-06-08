import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const ThemePage = () => {
  const theme = useTheme();
  console.log(theme.palette.primary);
  console.log(theme.palette.primary1);
  return (
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
    </Stack>
  );
};

export default ThemePage;
