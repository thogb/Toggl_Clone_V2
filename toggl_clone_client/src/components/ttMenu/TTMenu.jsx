import styled from "@emotion/styled";
import { Menu } from "@mui/material";

export const TTMenu = styled((props) => (
  <Menu
    disableScrollLock
    slotProps={{
      paper: {
        style: {
          width: 170,
        },
      },
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
    padding: theme.spacing(1 / 2, 1),
    borderRadius: "8px",
    "&:hover": {
      opacity: 1,
    },
  },
}));
