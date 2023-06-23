import React from "react";
import styled from "@emotion/styled";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,

  "&:hover": {
    backgroundColor: grey[200],
    borderRadius: "8px",
  },

  "& > .MuiListItemButton-root": {
    padding: theme.spacing(0.5, 1),

    "& > .MuiListItemIcon-root": {
      minWidth: 0,
      paddingRight: theme.spacing(1.5),

      "& > .MuiButtonBase-root": {
        padding: 0,
        fontSize: 10,
        margin: 0,

        "& > .MuiSvgIcon-root": {
          fontSize: "1.25rem",
          //   color: theme.palette.secondary.main,
        },
      },

      "& > .MuiButtonBase-root.Mui-checked > .MuiSvgIcon-root": {
        color: theme.palette.secondary.main,
      },
    },

    "& > .MuiListItemText-root": {
      margin: 0,
      overflow: "hidden",

      "& > .MuiTypography-root": {
        fontSize: "1rem",
        textOverflow: "ellipsis",
        overflow: "hidden",
      },
    },
  },
}));

const CheckboxListItem = ({ key, value, checked, itemText, onClick }) => {
  const labelId = `checkbox-list-label-${value}`;
  return (
    <StyledListItem key={key} disableRipple>
      <ListItemButton onClick={onClick} disableTouchRipple>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={itemText} />
      </ListItemButton>
    </StyledListItem>
  );
};

export default CheckboxListItem;
