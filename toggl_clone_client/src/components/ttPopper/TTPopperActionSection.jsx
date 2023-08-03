import { alpha, styled } from "@mui/material";

export const TTPopperActionSection = styled("div")(({theme}) => ({
    borderTop: "1px solid",
    borderTopColor: alpha(theme.palette.primary.main, 0.15),
    minHeight: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}))