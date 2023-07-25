import styled from "@emotion/styled";
import { MenuItem } from "@mui/material";

export const TTMenuItem = styled((props) => (
  <MenuItem disableRipple {...props} />
))(({ theme }) => ({
  minWidth: 170,
}));
