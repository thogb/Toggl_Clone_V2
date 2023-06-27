import styled from "@emotion/styled";
import { Checkbox, Stack } from "@mui/material";
import classNames from "classnames";
import React from "react";
import StackBetween from "../stackBetween/StackBetween";
import { grey } from "@mui/material/colors";

const StyledListItem = styled("li")(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  // justifyContent: "space-between",
  alignItems: "center",
  fontSize: "1rem",
  minHeight: "50px",
  padding: theme.spacing(0, theme.ttSpacings.page.px),
  borderBottom: "1px solid",
  borderBottomColor: grey[300],
  overflow: "hidden",
  gap: theme.spacing(2),
  paddingTop: theme.spacing(1 / 2),

  "& > .MuiCheckbox-root": {
    marginLeft: theme.spacing(-1 * theme.ttSpacings.page.px),
    padding: 0,
    alignSelf: "stretch",
    width: "50px",
    minWidth: "50px",

    "& > .MuiSvgIcon-root": {
      fontSize: "1.1rem",
    },

    "&.Mui-checked,&.MuiCheckbox-indeterminate": {
      "& > .MuiSvgIcon-root": {
        color: theme.palette.secondary.main,
      },
    },
  },

  [theme.breakpoints.down("md")]: {
    alignItems: "start",

    "&>.TimeEntryLeftSection": {
      flexDirection: "column",
      paddingTop: theme.spacing(1 / 2),
      gap: 0,
      alignItems: "start",
      minWidth: 0,
    },
    "&>.TimeEntryRightSection": {
      flexDirection: "column",
      gap: 0,
      alignItems: "end",
    },
  },
}));

const TimeEntryItemBase = ({
  showCheckbox,
  checked,
  indeterminate,
  children,
  className,
  rightTools,
  onCheckBoxClick,
  ...others
}) => {
  return (
    <StyledListItem className={classNames("TimeEntryItemBase", className)}>
      {showCheckbox && (
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          disableRipple
          onClick={onCheckBoxClick}
        ></Checkbox>
      )}
      {children}
    </StyledListItem>
  );
};

export default TimeEntryItemBase;

export const RightTools = ({ children }) => {
  return (
    <StackBetween
      className="RightTools"
      direction={"row"}
      alignItems={"center"}
      justifyContent={"end"}
      minWidth={"70px"}
      my={0}
    >
      {children}
    </StackBetween>
  );
};

export const TimeEntryLeftSection = ({ children, ...others }) => {
  return (
    <Stack
      className="TimeEntryLeftSection"
      direction={"row"}
      alignItems={"center"}
      minWidth={200}
      {...others}
    >
      {children}
    </Stack>
  );
};

export const TimeEntryRightSection = ({ children, ...others }) => {
  return (
    <Stack
      className="TimeEntryRightSection"
      direction={"row"}
      // minWidth={0}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={2}
      {...others}
    >
      {children}
    </Stack>
  );
};

export const TimeEntryMainSection = ({ children, ...others }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      width={"100%"}
      // minWidth={0}
      justifyContent={"space-between"}
      {...others}
    >
      {children}
    </Stack>
  );
};
