import { Box, Typography, alpha } from "@mui/material";
import React from "react";
import { popperClassNames } from "../ttPopper/TTPopper";
import { useTheme } from "@emotion/react";

const ProjectMessage = ({ title, description }) => {
  const theme = useTheme();
  const color = alpha(theme.palette.primary.main, 0.8);
  return (
    <Box px={theme.ttSpacings.popper.px / 2} py={2.5}>
      <Typography color={color} mb={1} variant="subtitle2" fontWeight={500}>
        {title}
      </Typography>
      <Typography color={color} variant="body2">
        {description}
      </Typography>
    </Box>
  );
};

export default ProjectMessage;
