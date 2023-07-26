import React from "react";
import TTPopperButton from "../ttPopper/TTPopperButton";
import { Typography } from "@mui/material";
import { Circle } from "@mui/icons-material";

const ProjectButton = ({ color, name, ...others }) => {
  return (
    <TTPopperButton style={{ color: color, marginBottom: 2 }} {...others}>
      <Circle style={{ fontSize: "0.6rem" }} />
      <Typography ml={1} variant="subtitle2">
        {name}
      </Typography>
    </TTPopperButton>
  );
};

export default ProjectButton;
