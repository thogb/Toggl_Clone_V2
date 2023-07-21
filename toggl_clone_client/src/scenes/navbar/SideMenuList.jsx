import styled from "@emotion/styled";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

export const TTSideMenuList = styled(List)(({ theme }) => ({
  "& .MuiListItemButton-root": {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: "white",
    minHeight: 32,
    paddingTop: 0,
    paddingBottom: 0,
    "&:not(.Mui-selected):not(.Mui-disabled):hover": {
      backgroundColor: theme.palette.primary.light,
    },
    "&.Mui-selected": { backgroundColor: theme.palette.secondary.main },
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: theme.spacing(1),
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
}));

export const TTListItemButton = ({
  icon,
  label,
  to,
  disabled = false,
  selected = false,
}) => {
  return (
    <ListItemButton
      disabled={disabled}
      selected={selected}
      LinkComponent={Link}
      to={to}
      disableRipple
    >
      <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
      />
    </ListItemButton>
  );
};
