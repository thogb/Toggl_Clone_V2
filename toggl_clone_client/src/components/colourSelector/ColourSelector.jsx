import { Box, Stack, alpha, styled } from "@mui/material";
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  green,
  grey,
  indigo,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  teal,
} from "@mui/material/colors";
import React from "react";
import TTPopper from "../ttPopper/TTPopper";
import { Check } from "@mui/icons-material";

export const colourSelectorColours = [
  blue[500],
  purple[500],
  orange[500],
  brown[500],
  green[500],
  cyan[500],
  pink[500],
  indigo[500],
  teal[500],
  lime[500],
  lightGreen[500],
  blueGrey[500],
  deepOrange[500],
  amber[500],
];

export const ColourButton = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  minWidth: "24px",
  minHeight: "24px",
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(75%)",
  },
  "&:hover,&.TT-selected": {
    outline: "3px solid",
    outlineColor: alpha(theme.palette.primary.main, 0.15),
  },
}));

const ColourSelector = ({
  anchorEl,
  onClose,
  onComplete,
  selectedColour,
  ...others
}) => {
  const handleColourSelect = (colour) => {
    if (onComplete) onComplete(colour);
    onClose();
  };

  return (
    <TTPopper width={"auto"} anchorEl={anchorEl} onClose={onClose} {...others}>
      <Box
        p={1.5}
        display={"grid"}
        gridTemplateColumns={"repeat(5, 1fr)"}
        gap={3 / 4}
      >
        {colourSelectorColours.map((colour, ind) => (
          <ColourButton
            key={ind}
            className={selectedColour === colour ? "TT-selected" : null}
            style={{ backgroundColor: colour }}
            onClick={() => handleColourSelect(colour)}
          >
            {selectedColour === colour && (
              <Check style={{ width: "75%", color: "white" }} />
            )}
          </ColourButton>
        ))}
      </Box>
    </TTPopper>
  );
};

export default ColourSelector;
