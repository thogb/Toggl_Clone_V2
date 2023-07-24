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
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

import { APPBAR_HEIGHT, DRAWER_WIDTH } from "../../utils/constants";
import NavBar from "../navbar/NavBar";
import { useGetOrganisationsQuery } from "../../state/organisationSlice";
import { useGetWorkspacesQuery } from "../../state/workspaceSlice";
import { useGetTagsQuery } from "../../state/tagSlice";
import { useGetProjectsQuery } from "../../state/projectSlice";
import { useGetTimeEntriesQuery } from "../../state/groupedEntryListSlice";
import LoadingPage from "../LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import {
  createTimerInterval,
  setStartTimerData,
  startTimer,
} from "../../state/currentEntrySlice";
import { timeEntryUtil } from "../../utils/TimeEntryUtil";

const DashBoard = () => {
  const dispatch = useDispatch();
  const [isMDrawerOpen, setIsMDrawerOpen] = useState(false);

  const theme = useTheme();
  const belowMd = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector((state) => state.auth.user);

  const organisationQuery = useGetOrganisationsQuery();
  const workspaceQuery = useGetWorkspacesQuery();
  const tagsQuery = useGetTagsQuery();
  const projectsQuery = useGetProjectsQuery();
  const timeEntriesQuery = useGetTimeEntriesQuery();

  const userId = user?.id;

  useEffect(() => {
    const data = timeEntriesQuery.data;
    if (data) {
      const startedTimeEntry = data.find(
        (te) => te.duration <= -1 || te.stopDate === null
      );
      if (startedTimeEntry) {
        dispatch(
          startTimer({
            timeEntry: timeEntryUtil.createFromApiResponse(startedTimeEntry),
            fromServer: true,
          })
        );
      }
    }
  }, [timeEntriesQuery.isSuccess]);

  useEffect(() => {
    if (userId) {
      organisationQuery.refetch();
      workspaceQuery.refetch();
      tagsQuery.refetch();
      projectsQuery.refetch();
      timeEntriesQuery.refetch();
    }
  }, [userId]);

  const loading =
    organisationQuery.isLoading ||
    workspaceQuery.isLoading ||
    tagsQuery.isLoading ||
    projectsQuery.isLoading ||
    timeEntriesQuery.isLoading;

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
            overflow: belowMd ? "hidden" : "unset",
            // overflowY: belowMd ? "hidden" : "visible",
          },
        }}
      >
        <NavBar loading={loading} onClose={onDrawerClose} />
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
        {loading ? <LoadingPage /> : <Outlet />}
      </Box>
    </Box>
  );
};

export default DashBoard;
