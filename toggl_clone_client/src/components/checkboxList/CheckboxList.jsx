import styled from "@emotion/styled";
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

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

const CheckboxList = ({ itemList, checkedList, setCheckedList }) => {
  const handleToggle = (value) => () => {
    const currentIndex = checkedList.indexOf(value);
    const newChecked = [...checkedList];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedList(newChecked);
  };

  if (itemList.length <= 0) {
    return (
      <Typography textAlign={"center"}>There aren't any items.</Typography>
    );
  }

  return (
    <List>
      {itemList.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <StyledListItem key={value} disableRipple>
            <ListItemButton onClick={handleToggle(value)} disableTouchRipple>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checkedList.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          </StyledListItem>
        );
      })}
    </List>
  );
};

export default CheckboxList;
