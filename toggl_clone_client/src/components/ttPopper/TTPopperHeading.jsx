import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const TTPopperHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "uppercase",
  fontSize: "0.75rem",
  fontWeight: 500,
}));
