import { Clear } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";
import TTIconButton from "../ttIconButton/TTIconButton";

const FilterGroup = ({
  showClearButton = false,
  onClearClick = () => {},
  children,
}) => {
  return (
    <Stack direction={"row"} gap={1} alignItems={"center"}>
      <Typography
        color={"primary"}
        variant="subtitle2"
        fontSize={"0.75rem"}
        mr={1}
        textTransform={"uppercase"}
      >
        filters:
      </Typography>
      {children}
      {showClearButton && (
        <TTIconButton onClick={onClearClick}>
          <Clear />
        </TTIconButton>
      )}
    </Stack>
  );
};

export default FilterGroup;
