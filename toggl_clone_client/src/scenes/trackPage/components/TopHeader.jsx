import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const topHeaderHeight = "30px";

const StyledLink = styled(Link)(({ theme }) => ({
  ...theme.typography.caption,
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const TopHeader = () => {
  return (
    <Stack
      height={topHeaderHeight}
      bgcolor={"secondary.light"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"end"}
      gap={3}
      px={(theme) => theme.ttSpacings.page.px * 2}
    >
      <StyledLink>Back to Toggl Global</StyledLink>
      <StyledLink>
        Products <ArrowDropDownIcon />
      </StyledLink>
      <StyledLink>Blog</StyledLink>
      <StyledLink>Our mission</StyledLink>
      <StyledLink>Working at Toggl</StyledLink>
    </Stack>
  );
};

export default TopHeader;
