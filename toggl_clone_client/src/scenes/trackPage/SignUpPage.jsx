import React from "react";
import {
  AppBar,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import NameIcon from "../../fromTogglTrack/nameIcon";
import { amber, yellow } from "@mui/material/colors";
import { Link, Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import SignInForm from "../../components/signInForm/SignInForm";
import TrackFooter from "../../components/signInForm/components/TrackFooter";
import TrackCopyright from "../../components/signInForm/components/TrackCopyright";

const StyledLink = styled(Link)(({ theme }) => ({
  color: "inherit",

  "&:hover": {
    color: "var(--hover-color)",
  },
}));

const SignUpPage = () => {
  const theme = useTheme();

  return (
    <Box bgcolor={"primary.main"}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "transparent", py: 4 }}
      >
        <Toolbar>
          <NameIcon size="lg" />
        </Toolbar>
      </AppBar>
      <Stack maxWidth={{ xs: 800, lg: 1150 }} mx={"auto"}>
        <Box padding={theme.spacing(4, 3)}>
          <Typography variant="h2" fontWeight={500} color={"white"} sx={{
            fontSize: `calc(${theme.typography.h3.fontSize} + 2vw)`
          }}>
            Sign up for a <Typography color={"secondary"} component={"span"} sx={{fontSize: "inherit", WebkitTransform: "rotate(-90deg)"}}>free</Typography> Toggl Track account
          </Typography>
          <Typography variant="h6" color={amber[50]} mt={theme.spacing(3)}>
            All plans come with a free, 30-day trial of Toggl Track Premium—no
            credit card required. <br />
            Upgrade at the end of the trial or continue using Track for free.
          </Typography>
          <Typography variant="h6" color={amber[50]} mt={theme.spacing(2)}>
            Already have an account?&nbsp;
            <span style={{ color: theme.palette.secondary.light }}>
              <StyledLink
                to="/login"
                style={{
                  "--hover-color": amber[50],
                }}
              >
                Log in here
              </StyledLink>
            </span>
            .
          </Typography>
        </Box>
        <Stack
          direction={{xs: "column", lg: "row"}}
          pb={theme.spacing(12)}
          mt={theme.spacing(1)}
          alignItems={"center"}
          gap={2}
        >
          <Box px={theme.spacing(3)}>
            <SignInForm />
          </Box>
          <Box padding={4} flexBasis={"40%"}>
            <Typography
              variant="h5"
              sx={{
                color: "white",
                // "&::first-letter": {
                //   fontSize: theme.typography.h1.fontSize,
                //   display: "block",
                //   height: "10px",
                // },
                "& span:first-of-type": {
                  // fontSize: 60,
                  fontSize: theme.typography.h1.fontSize,
                  // display: "inline-block",
                  // height: 0
                  position: "absolute"
                }
              }}
            >
              <span>“</span>
              <br/><br/>
              Toggl Tracks has a very straightforward interface. It's
              easy to start, stop and edit time entries and to review your own
              work and the work of colleagues. <br />
              <br />
              It just works, even in a team where some members find new
              interfaces challenging.
            </Typography>
            <Typography sx={{ color: "white" }} mt={4}>
              — Verified G2Crowd review. 5/5 stars.
            </Typography>
            <Box my={8}>
              <img src="https://public-assets.toggl.com/b/static/6b5c09dd5baafcca069103cd517b38c9/2fffe/review-badges.png" />
            </Box>
          </Box>
        </Stack>
      </Stack>
      <TrackFooter>
        <TrackCopyright />
      </TrackFooter>
    </Box>
  );
};

export default SignUpPage;
