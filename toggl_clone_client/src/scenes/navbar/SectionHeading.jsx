import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const TTSectionHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary1.main,
  padding: `0px ${theme.spacing(2)}`,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  marginTop: theme.spacing(2),
}));
