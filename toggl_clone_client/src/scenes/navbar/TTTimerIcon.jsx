import styled from "@emotion/styled";
import React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const TimerIcon = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: 30,
  width: 30,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  //   zIndex: 1,

  "&::before": {
    position: "absolute",
    content: '""',
    height: 22,
    width: 22,
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "50%",
    // zIndex: -1,
  },

  "& .MuiSvgIcon-root": {
    fontSize: "15px",
    color: theme.palette.primary.main,
    zIndex: 1,
  },
}));

const TTTimerIcon = () => {
  return (
    <TimerIcon>
      <PowerSettingsNewIcon />
    </TimerIcon>
  );
};

export default TTTimerIcon;
