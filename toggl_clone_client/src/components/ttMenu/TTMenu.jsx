import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const TTMenu = styled((props) => (
  <Menu
    // keepMounted
    disableScrollLock
    // disablePortal
    slotProps={{
      paper: {
        style: {
          width: 170,
        },
      },
    }}
    transitionDuration={{
      enter: 100,
      exit: 0,
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backgroundColor: "transparent",
  },
  "& .MuiList-root": {
    padding: theme.spacing(1 / 2),
  },
  "& .MuiMenuItem-root": {
    fontSize: "0.95rem",
    padding: theme.spacing(1 / 2, 1),
    borderRadius: "8px",
    "&:hover": {
      opacity: 1,
    },
  },
  // backgroundColor: "green",
}));
