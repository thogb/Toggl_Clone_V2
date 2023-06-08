import { Button, useTheme } from "@mui/material";
import React from "react";

const TimerPage = () => {
  const theme = useTheme();
  console.log(theme.palette.primary);
  console.log(theme.palette.primary1);
  return (
    <div>
      TimerPage
      <Button variant="contained" color="primary">
        test
      </Button>
      <Button variant="contained" color="primary1">
        test
      </Button>
      <Button variant="contained" color="primary">
        test
      </Button>
      <Button variant="contained" color="primary">
        test
      </Button>
      <Button variant="contained" color="primary">
        test
      </Button>
      <Button variant="contained" color="secondary">
        test
      </Button>
      <div>test</div>
    </div>
  );
};

export default TimerPage;
