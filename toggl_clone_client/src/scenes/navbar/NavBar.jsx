import { useTheme } from "@emotion/react";
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { APPBAR_HEIGHT, DRAWER_WIDTH } from "../../utils/constants";
import SideNavBarButton from "./SideNavBarButton";
import HelpIcon from "@mui/icons-material/Help";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { grey, orange } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TTListItemButton, TTSideMenuList } from "./SideMenuList";
import { TTSectionHeading } from "./SectionHeading";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ArticleIcon from "@mui/icons-material/Article";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FolderIcon from "@mui/icons-material/Folder";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PowerIcon from "@mui/icons-material/Power";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import TTTimerIcon from "./TTTimerIcon";
import { useSelector } from "react-redux";
import { formatSecondHMMSS } from "../../utils/TTDateUtil";

const NavBar = () => {
  const timerStarted = useSelector((state) => state.currentEntry.timerStarted);
  const duration = useSelector((state) => state.currentEntry.duration);

  const [isMDrawerOpen, setIsMDrawerOpen] = useState(false);

  const theme = useTheme();
  const belowMd = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = DRAWER_WIDTH;
  const appbarHeight = APPBAR_HEIGHT;
  const leftDrawerWidth = 47;

  const username = "Tao Hu";

  const handleDrawerToggle = () => {
    setIsMDrawerOpen(!isMDrawerOpen);
  };

  const drawer = (
    <Box
      display={"flex"}
      flexDirection={"row"}
      position={"sticky"}
      top={0}
      left={0}
      // width={`${drawerWidth}px`}
      // width={{ xs: `${drawerWidth * 1.5}px`, md: `${drawerWidth}px` }}
      maxWidth={"100%"}
      height={"100vh"}
    >
      {/* Left sidebar */}
      <Box
        width={`${leftDrawerWidth}px`}
        bgcolor={"primary.dark"}
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"column"}
        alignItems={"center"}
        py={1}
      >
        {/* top */}
        <Box width={"100%"} display={"flex"} flexDirection={"column"}>
          {belowMd && (
            <SideNavBarButton onClick={() => setIsMDrawerOpen(false)}>
              <Box
                bgcolor={"primary.light"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"30px"}
                width={"30px"}
                borderRadius={"50%"}
              >
                <CloseIcon sx={{ color: "white", fontSize: "1rem" }} />
              </Box>
            </SideNavBarButton>
          )}
          <SideNavBarButton to="/timer">
            <TTTimerIcon />
          </SideNavBarButton>
        </Box>

        {/* bottom */}
        <Box width={"100%"} display={"flex"} flexDirection={"column"}>
          <SideNavBarButton>
            <Box display={"flex"} flexDirection={"column"}>
              <AccountCircleIcon
                fontSize="large"
                sx={{ color: orange[400], mb: 0.5 }}
              />
              <span style={{ fontSize: "8px", color: grey[500] }}>PROFILE</span>
            </Box>
          </SideNavBarButton>
          <SideNavBarButton>
            <Badge
              variant="dot"
              color="error"
              sx={{ "& .MuiBadge-badge": { top: 5, right: 5 } }}
            >
              <NotificationsIcon fontSize="small" sx={{ color: "white" }} />
            </Badge>
          </SideNavBarButton>
          <SideNavBarButton to="/where">
            <HelpIcon fontSize="small" sx={{ color: grey[500] }} />
          </SideNavBarButton>
        </Box>
      </Box>

      {/* Right sidebar */}
      <Box
        flexGrow={1}
        bgcolor={"primary.main"}
        minWidth={0}
        display={"flex"}
        flexDirection={"column"}
      >
        {/* workspace button */}
        <Box
          bgcolor={"primary.main"}
          borderBottom={2}
          borderColor={"primary.dark"}
          p={1.5}
          display={"flex"}
          justifyContent={"space-between"}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {}}
        >
          <Box minWidth={0}>
            <Typography
              noWrap
              variant="h6"
              sx={{ color: "white", fontSize: "1rem" }}
            >{`${username}'s workspaces`}</Typography>
            <Typography
              noWrap
              variant="body2"
              sx={{
                color: "primary1.main",
                fontSize: "0.75rem",
                textTransform: "uppercase",
              }}
            >{`${username}'s organisation`}</Typography>
          </Box>
          <KeyboardArrowDownIcon sx={{ color: "primary1.main" }} />
        </Box>

        {/* main nav list */}
        <Box overflow={"auto"} flexGrow={1}>
          <TTSectionHeading>track</TTSectionHeading>
          <TTSideMenuList>
            <TTListItemButton
              label={timerStarted ? formatSecondHMMSS(duration) : "Timer"}
              icon={<WatchLaterIcon />}
              to={"/timer"}
            />
          </TTSideMenuList>

          <TTSectionHeading>analyse</TTSectionHeading>
          <TTSideMenuList>
            <TTListItemButton
              label={"Reports"}
              icon={<ArticleIcon />}
              to={"/theme"}
            />
            <TTListItemButton
              label={"Insights"}
              icon={<AssessmentIcon />}
              to={"/insights"}
            />
          </TTSideMenuList>

          <TTSectionHeading>manage</TTSectionHeading>
          <TTSideMenuList>
            <TTListItemButton
              label={"Projects"}
              icon={<FolderIcon />}
              to={"/projects"}
            />
            <TTListItemButton
              label={"Clients"}
              icon={<AccountBoxIcon />}
              to={"/clients"}
            />
            <TTListItemButton
              label={"Team"}
              icon={<GroupIcon />}
              to={"/team"}
            />
            <TTListItemButton
              label={"Tags"}
              icon={<LocalOfferIcon />}
              to={"/tags"}
            />
            <TTListItemButton
              label={"Integerations"}
              icon={<PowerIcon />}
              to={"/integerations"}
            />
            <TTListItemButton
              label={"Testing"}
              icon={<PowerIcon />}
              to={"/testing"}
            />
          </TTSideMenuList>
        </Box>

        {/* bottom sticky nav list */}
        <Box>
          <TTSectionHeading>admin</TTSectionHeading>
          <TTSideMenuList>
            <TTListItemButton
              label={"Subscription"}
              icon={<CreditCardIcon />}
              to={"/subscription"}
            />
            <TTListItemButton
              label={"Organisation"}
              icon={<CorporateFareIcon />}
              to={"/organisation"}
            />
            <TTListItemButton
              label={"Settings"}
              icon={<SettingsIcon />}
              to={"/settings"}
            />
          </TTSideMenuList>
        </Box>
      </Box>
    </Box>
  );

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
            },
          }}
        >
          {drawer}
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
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Page */}
      <Box
        pl={{ xs: "0", md: `${drawerWidth}px` }}
        pt={{ xs: `${appbarHeight}px`, md: "0px" }}
        sx={{
          // minHeight: "100vh",
          // height: "100%",
          position: "relative",
          [theme.breakpoints.down("md")]: {
            "&>:nth-of-type(n+1) header:first-of-type": {
              top: `${appbarHeight}px`,
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

export default NavBar;
