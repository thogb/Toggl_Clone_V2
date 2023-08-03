import { Button, alpha, styled } from "@mui/material";
import classNames from "classnames";

export const FilterButton = styled(
  ({ selected = false, open = false, className, ...others }) => (
    <Button
      className={classNames(
        selected ? "TT-selected" : null,
        open ? "TT-open" : null,
        className
      )}
      {...others}
    />
  )
)(({ theme }) => ({
  alignItems: "center",
  lineHeight: 1,
  color: alpha(theme.palette.primary.dark, 0.8),

  "&:hover,&.TT-open": {
    backgroundColor: theme.palette.action.hover,
  },

  "& .MuiButton-startIcon": {
    marginLeft: 0,
    backgroundColor: alpha(theme.palette.primary.light, 0.8),
    borderRadius: "5px",
    padding: "3px 2px",
    "&>svg": {
      fontSize: "0.975rem",
      color: "white",
    },
  },

  "&.TT-selected": {
    color: alpha(theme.palette.secondary.dark, 0.8),
    backgroundColor: alpha(theme.palette.secondary.light, 0.2),
    "& .MuiButton-startIcon": {
      backgroundColor: theme.palette.secondary.main,
    },

    "&:hover,&.TT-open": {
      backgroundColor: alpha(theme.palette.secondary.light, 0.35),
    },

    "&:active": {
      backgroundColor: alpha(theme.palette.secondary.light, 0.5),
    },
  },
}));
