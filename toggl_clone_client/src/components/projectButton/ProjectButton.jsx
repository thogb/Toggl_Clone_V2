import React from "react";
import { Typography, styled } from "@mui/material";
import SubButton from "../subButton/SubButton";
import { Circle } from "@mui/icons-material";

export const StyledButton = styled(SubButton)(({ theme }) => ({
  padding: theme.spacing(1 / 2, 1),
  color: "var(--ProjectButton-bgColor)",
  "&,&:focus": {
    backgroundColor:
      "color-mix(in srgb, var(--ProjectButton-bgColor) 25%, transparent)",
  },
  "&:hover": {
    backgroundColor:
      "color-mix(in srgb, var(--ProjectButton-bgColor) 32.5%, transparent)",
  },
  "&:active,&.TTPopper-open": {
    backgroundColor:
      "color-mix(in srgb, var(--ProjectButton-bgColor) 40%, transparent)",
  },
  "& svg": {
    fontSize: "0.6rem",
  },
}));

const ProjectButton = ({ colour = "grey", name, ...others }) => {
  return (
    <StyledButton style={{ "--ProjectButton-bgColor": colour }} {...others}>
      <Circle />
      <Typography ml={1} variant="subtitle2" component={"span"}>
        {name}
      </Typography>
    </StyledButton>
  );
};

export default ProjectButton;
