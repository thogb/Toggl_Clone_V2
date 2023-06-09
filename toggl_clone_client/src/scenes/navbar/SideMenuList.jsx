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
  },
  "& .MuiListItemButton-root:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: theme.spacing(1),
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
}));

export const TTListItemButton = ({ icon, label, to }) => {
  return (
    <ListItemButton
      LinkComponent={Link}
      to={to}
      sx={{
        py: 0,
        minHeight: 32,
        color: "white",
        "&.Mui-selected": { backgroundColor: "secondary.main" },
      }}
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
