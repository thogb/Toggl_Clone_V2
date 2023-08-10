import { Button, alpha, styled } from "@mui/material";
import classNames from "classnames";

export const FilterButtonEndIcon = styled("div")(({ theme }) => ({
  padding: "3px 4px",
  borderRadius: "4px",
  backgroundColor: theme.palette.primary.dark,
  marginLeft: theme.spacing(1),
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.9em",
  lineHeight: 0.95,
  "&>svg": {
    fontSize: "1.5em",
    margin: "-0.25ch",
  },
}));

export const FilterButton = styled(
  ({
    selected = false,
    open = false,
    count = 0,
    endIconChildren,
    children,
    className,
    ...others
  }) => (
    <Button
      className={classNames(
        selected ? "TT-selected" : null,
        open ? "TT-open" : null,
        className
      )}
      {...others}
    >
      {children}
      {count > 0 && (
        <FilterButtonEndIcon>
          <span>{count}</span>
        </FilterButtonEndIcon>
      )}
      {endIconChildren && (
        <FilterButtonEndIcon>{endIconChildren}</FilterButtonEndIcon>
      )}
    </Button>
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
    padding: "2px",
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
