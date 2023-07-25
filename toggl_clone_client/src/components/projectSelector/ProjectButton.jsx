import React from "react";
import TTPopperButton from "../ttPopper/TTPopperButton";
import { Typography } from "@mui/material";
import { Circle } from "@mui/icons-material";

const ProjectButton = ({ color, name }) => {
  return (
    <TTPopperButton style={{ color: color }}>
      <Circle />
      <Typography variant="subtitle2">{name}</Typography>
    </TTPopperButton>
  );
};

export default ProjectButton;
