import { useTheme } from "@emotion/react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

import { APPBAR_HEIGHT, DRAWER_WIDTH } from "../../utils/constants";
import NavBar from "../navbar/NavBar";

const DashBoard = () => {
  const [isMDrawerOpen, setIsMDrawerOpen] = useState(false);

  const theme = useTheme();
  const belowMd = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = DRAWER_WIDTH;
  const appbarHeight = APPBAR_HEIGHT;

  const handleDrawerToggle = () => {
    setIsMDrawerOpen(!isMDrawerOpen);
  };

  const onDrawerClose = () => {
    setIsMDrawerOpen(false);
  };

  return (
    <Box
    // height={"100%"}
    // minHeight={"100%"}
    // overflow={"hidden"}
    >
      {/* Drawer */}
      {belowMd && (
        <Drawer
          variant="temporary"
          open={isMDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: { xs: drawerWidth * 2.0, md: drawerWidth },
              overflow: "unset",
            },
          }}
        >
          <NavBar onClose={onDrawerClose} />
        </Drawer>
      )}
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: 0, md: drawerWidth },
            transition: "all 0.2s linear",
            borderRight: "none",
            overflow: "unset",
          },
        }}
      >
        <NavBar onClose={onDrawerClose} />
      </Drawer>

      {/* Main Page */}
      <Box
        pl={{ xs: "0", md: `${drawerWidth}px` }}
        pt={{ xs: `${appbarHeight}px`, md: "0px" }}
        sx={{
          // minHeight: "100vh",
          // height: "100%",
          position: "relative",
          "&>:nth-of-type(n+1) header:first-of-type": {
            left: `${DRAWER_WIDTH}px`,
            [theme.breakpoints.down("md")]: {
              top: `${appbarHeight}px`,
              left: 0,
            },
          },
        }}
      >
        {/* Topbar */}
        <AppBar position="fixed" sx={{ display: { xs: "block", md: "none" } }}>
          <Toolbar sx={{ height: `${appbarHeight}px` }}>
            <IconButton
              sx={{ color: "white", mr: (theme) => theme.spacing(1) }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h4"
              color={"secondary.light"}
              fontWeight={900}
              mr={1}
            >
              toggl
            </Typography>
            <Typography variant="h5" color={"secondary.light"}>
              track
            </Typography>
          </Toolbar>
        </AppBar>

        {/* main content */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashBoard;
