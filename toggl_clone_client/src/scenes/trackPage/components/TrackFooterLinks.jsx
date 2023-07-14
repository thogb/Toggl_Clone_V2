import { useTheme } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import TTNameIcon from "../../../fromTogglTrack/TTNameIcon";
import styled from "@emotion/styled";
import { amber } from "@mui/material/colors";
import { Link } from "react-router-dom";

const linksMap = {
  "TOGGL GLOBAL": {
    headerName: "TOGGL GLOBAL",
    links: [
      { name: "Blog" },
      { name: "Our Mission" },
      { name: "Working at Toggl" },
      { name: "Legal Terms" },
    ],
  },
  PRODUCT: {
    headerName: "PRODUCT",
    links: [
      { name: "Features" },
      { name: "Pricing" },
      { name: "Integrations" },
      { name: "Case Studies" },
      { name: "API" },
    ],
  },
  "USE CASES": {
    headerName: "USE CASES",
    links: [
      { name: "Billing and Invoicing" },
      { name: "Employee Time Tracking" },
      { name: "Project Budgeting" },
      { name: "Reporting" },
      { name: "Payroll" },
      { name: "Work Hours Tracker" },
      { name: "Timesheet App" },
    ],
  },
  DOWNLOAD: {
    headerName: "DOWNLOAD",
    links: [
      { name: "Mobile Apps" },
      { name: "Desktop Apps" },
      { name: "Browser Extensions" },
    ],
  },
  HELP: {
    headerName: "HELP",
    links: [
      { name: "Support & Knowledge Base" },
      { name: "Request A Demo" },
      { name: "Contact Us" },
    ],
  },
  RESOURCES: {
    headerName: "RESOURCES",
    links: [
      { name: "Time Management Hub" },
      { name: "Work From Home Hub" },
      { name: "Business Resources" },
      { name: "Productivity Resources" },
      { name: "Timesheet Templates" },
      { name: "Time Card Calculator" },
      { name: "Media Kit" },
    ],
  },
};

const StyledUl = styled("ul")(({ theme }) => ({
  padding: 0,
  margin: 0,
  // paddingRight: 40,
  minWidth: (500 - theme.ttSpacings.page.px * 8 * 4) / 2,
}));
const StyledLi = styled("li")(({ theme }) => ({
  listStyle: "none",
  color: "white",
  "&>a": {
    ...theme.typography.subtitle2,
    lineHeight: 2,
    color: "inherit",
    fontWeight: 400,
    textDecoration: "none",
    transition: "color 0.3s ease-in-out",
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
}));

const TrackFooterLinks = () => {
  const theme = useTheme();

  return (
    <Box
      padding={theme.spacing(5, theme.ttSpacings.page.px * 2)}
      bgcolor={"primary.main"}
    >
      <TTNameIcon size="md" />
      <Stack
        my={2}
        flexWrap={"wrap"}
        direction={"row"}
        justifyContent={"start"}
      >
        {Object.values(linksMap).map((linkObj) => (
          <Box flexGrow={1}>
            <Typography
              my={1}
              variant="subtitle1"
              fontWeight={700}
              textTransform={"uppercase"}
              color={amber[100]}
              sx={{ opacity: 0.45 }}
            >
              {linkObj.headerName}
            </Typography>
            <StyledUl>
              {linkObj.links.map((link) => (
                <StyledLi>
                  <Link>{link.name}</Link>
                </StyledLi>
              ))}
            </StyledUl>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TrackFooterLinks;
