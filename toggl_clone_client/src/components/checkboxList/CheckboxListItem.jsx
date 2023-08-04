import styled from "@emotion/styled";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";

export const CheckBoxListItemBase = styled(ListItem)(({ theme }) => ({
  padding: 0,
  borderRadius: "8px",

  "&:hover": {
    backgroundColor: grey[200],
  },

  "& > .MuiListItemButton-root": {
    borderRadius: "8px",
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
        ...theme.typography.subtitle2,
        fontSize: "0.975rem",
        fontWeight: 400,
        textOverflow: "ellipsis",
        overflow: "hidden",
        color: theme.palette.primary.main,
      },
    },
  },
}));

const CheckboxListItem = ({
  showSelected = false,
  value,
  checked,
  itemText,
  onClick,
}) => {
  const labelId = `checkbox-list-label-${value}`;
  return (
    <CheckBoxListItemBase>
      <ListItemButton
        selected={showSelected && checked}
        onClick={onClick}
        disableTouchRipple
      >
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
    </CheckBoxListItemBase>
  );
};

export default CheckboxListItem;
