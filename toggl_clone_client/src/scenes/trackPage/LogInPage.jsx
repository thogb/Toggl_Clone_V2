import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import TopHeader from "./components/TopHeader";
import TrackAppBar from "./components/TrackAppBar";
import { useTheme } from "@emotion/react";
import SignInForm from "./components/SignInForm";
import TrackCopyright from "./components/TrackCopyright";
import TrackFooterLinks from "./components/TrackFooterLinks";
import TrackFooterTools from "./components/TrackFooterTools";
import TrackFooter from "./components/TrackFooter";
import { useNavigate } from "react-router-dom";
import { relativeURL } from "../../utils/constants";

const signInFormOffset = 70;

const LogInPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const below800 = useMediaQuery("(max-width:800px)");

  return (
    <Box minHeight={"100vh"} color={"white"}>
      {!below800 && <TopHeader />}
      <TrackAppBar position={below800 ? "fixed" : "sticky"} />
      <Box
        pb={`${30 + (!below800 ? signInFormOffset : 0)}px`}
        pt={10}
        position={"relative"}
      >
        <img
          src="https://public-assets.toggl.com/b/static/a848ad9070fcf959a459fa1e878d2abb/87513/hero-laptops.avif"
          style={{
            maxWidth: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: -1,
            filter: "brightness(0.55)",
          }}
          height={"auto"}
          alt=""
        />
        <Typography
          textAlign={"center"}
          sx={{
            color: "white",
            fontSize: `calc(${theme.typography.h6.fontSize} + 3vw)`,
          }}
        >
          Log in to your account
        </Typography>
        <Typography
          mt={2.5}
          mb={2}
          textAlign={"center"}
          variant="h6"
          color={"white"}
        >
          Let's get tracking!
        </Typography>
      </Box>
      <Box bgcolor={"primary.light"} pb={14}>
        <SignInForm
          loginMode={true}
          style={{
            width: below800 ? "100%" : "680px",
            paddingTop: theme.spacing(!below800 ? 10 : 5),
            marginLeft: below800 ? 0 : "auto",
            marginRight: below800 ? 0 : "auto",
            marginBottom: below800 ? theme.spacing(5) : 0,
            position: "relative",
            top: below800 ? 0 : -signInFormOffset,
          }}
        />
        <Typography textAlign={"center"} color={"inherit"} variant="subtitle1">
          Don't have an account?
        </Typography>
        <Stack direction={"row"} justifyContent={"center"} mt={4}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: 100, padding: theme.spacing(1.5, 3.5) }}
            onClick={() => {
              navigate(relativeURL.SIGN_UP);
            }}
          >
            Sign up for free
          </Button>
        </Stack>
      </Box>

      {/* Footer */}
      <TrackFooter>
        <TrackFooterLinks />
        <TrackFooterTools />
        <TrackCopyright showTerms={false} />
      </TrackFooter>
    </Box>
  );
};

export default LogInPage;
