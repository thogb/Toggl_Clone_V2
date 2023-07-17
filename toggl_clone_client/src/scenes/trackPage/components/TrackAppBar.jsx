import { useTheme } from "@emotion/react";
import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TTNameIcon from "../../../fromTogglTrack/TTNameIcon";
import styled from "@emotion/styled";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link, useNavigate } from "react-router-dom";
import { amber, grey } from "@mui/material/colors";
import { relativeURL } from "../../../utils/constants";

const AppBarItemList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(3.5),
  paddingLeft: theme.spacing(4),
}));
const AppBarItem = styled("li")(({ theme }) => ({
  // position: "relative",
  "&>button": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    border: "none",
  },
  "&>a": {
    textDecoration: "inherit",
  },
  "&>a,&>button": {
    fontSize: "inherit",
    color: "inherit",
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
}));
const DropDownItemList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
}));
const DropDownItem = styled("li")(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize,
  marginBottom: theme.spacing(2),
  "&>button": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    border: "none",
  },
  "&>a": {
    textDecoration: "none",
  },
  "&>a,&>button": {
    fontSize: "inherit",
    color: "inherit",
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  fontSize: "inherit",
  fontWeight: 500,
  "&:hover": {
    color: theme.palette.secondary.light,
  },
}));

const LoginLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  ...theme.typography.subtitle1,
  fontWeight: 700,
  color: theme.palette.primary.light,
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: theme.palette.secondary.light,
  },
}));

const AppBarExpandButton = ({
  label,
  isExpanded,
  onClick,
  upIcon,
  downIcon,
  style,
  ...others
}) => {
  const handleOnClick = () => {
    if (onClick) onClick(label);
  };
  return (
    <button
      onClick={handleOnClick}
      style={{
        borderBottom: isExpanded ? "1px solid #000" : "none",
        ...style,
      }}
      {...others}
    >
      {label}
      {isExpanded
        ? upIcon ?? <ArrowDropUpIcon />
        : downIcon ?? <ArrowDropDownIcon />}
    </button>
  );
};

const ItemNames = {
  USE_CASE: "Use cases",
  SOLUTIONS: "Solutions",
  PRICING: "Pricing",
  APPS: "Apps",
  CAREERS: "Careers",
  BOOK_A_DEMO: "Book a demo",
};

const signUpUrl = relativeURL.SIGN_UP;

const TrackAppBar = ({ position = "sticky" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const toolbarRef = useRef(null);
  const appbarRef = useRef(null);
  const belowLg = useMediaQuery(theme.breakpoints.down("lg"));
  const [expandedItem, setExpandedItem] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [collapsedToolBarHeight, setCollapsedToolBarHeight] = useState(0);
  const appBarTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleExpandItemClick = (label) => {
    setExpandedItem(label);
  };

  useEffect(() => {
    if (toolbarRef.current != null)
      setCollapsedToolBarHeight(toolbarRef.current.clientHeight);
  }, [toolbarRef.current]);

  return (
    <AppBar
      ref={appbarRef}
      position={position}
      elevation={belowLg || appBarTrigger ? 1 : 0}
      sx={{
        backgroundColor:
          expandedItem === null
            ? !belowLg && appBarTrigger
              ? "primary"
              : "transparent"
            : amber[50],
        transition: "background-color 0.3s cubic-bezier(0, 0, 0.2, 1)",
      }}
    >
      <ClickAwayListener onClickAway={() => setExpandedItem(null)}>
        {!belowLg ? (
          <Toolbar
            disableGutters
            sx={{
              position: "relative",
              px: theme.ttSpacings.page.px * 2,
              py: theme.spacing(2),
              fontSize: theme.typography.subtitle1.fontSize,
              color: expandedItem === null ? "white" : "black",
            }}
          >
            <TTNameIcon size="lg" />

            <AppBarItemList>
              <AppBarItem>
                <AppBarExpandButton
                  label={ItemNames.USE_CASE}
                  isExpanded={ItemNames.USE_CASE === expandedItem}
                  onClick={handleExpandItemClick}
                />
                {ItemNames.USE_CASE === expandedItem && (
                  <Box
                    position={"absolute"}
                    top={appbarRef.current.clientHeight}
                    left={0}
                    right={0}
                    height={"200px"}
                    bgcolor={amber[50]}
                  ></Box>
                )}
              </AppBarItem>
              <AppBarItem>
                <AppBarExpandButton
                  label={ItemNames.SOLUTIONS}
                  isExpanded={ItemNames.SOLUTIONS === expandedItem}
                  onClick={handleExpandItemClick}
                />
                {ItemNames.SOLUTIONS === expandedItem && (
                  <Box
                    position={"absolute"}
                    top={appbarRef.current.clientHeight}
                    left={0}
                    right={0}
                    height={"100px"}
                    bgcolor={amber[50]}
                  ></Box>
                )}
              </AppBarItem>
              <AppBarItem>
                <Link>{ItemNames.PRICING}</Link>
              </AppBarItem>
              <AppBarItem>
                <AppBarExpandButton
                  label={ItemNames.APPS}
                  isExpanded={ItemNames.APPS === expandedItem}
                  onClick={handleExpandItemClick}
                />
                {ItemNames.APPS === expandedItem && (
                  <Box
                    position={"absolute"}
                    top={appbarRef.current.clientHeight}
                    left={0}
                    right={0}
                    height={"150px"}
                    bgcolor={amber[50]}
                  ></Box>
                )}
              </AppBarItem>
              <AppBarItem>
                <AppBarExpandButton
                  label={ItemNames.CAREERS}
                  isExpanded={ItemNames.CAREERS === expandedItem}
                  onClick={handleExpandItemClick}
                />
                {ItemNames.CAREERS === expandedItem && (
                  <Box
                    position={"absolute"}
                    top={appbarRef.current.clientHeight}
                    left={0}
                    right={0}
                    height={"300px"}
                    bgcolor={amber[50]}
                  ></Box>
                )}
              </AppBarItem>
            </AppBarItemList>
            <Stack
              direction={"row"}
              alignItems={"center"}
              ml={"auto"}
              gap={2.5}
              color={expandedItem === null ? "white" : "black"}
            >
              <StyledLink>Book a demo</StyledLink>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderRightWidth: 2,
                  borderColor: expandedItem === null ? "white" : "black",
                  my: 1.5,
                }}
              />
              <StyledLink>Log in</StyledLink>
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  padding: "10px 20px",
                  borderRadius: 100,
                  color: theme.palette.secondary.light,
                  backgroundColor: amber[50],
                  fontSize: "inherit",
                  ...(expandedItem !== null
                    ? {
                        backgroundColor: theme.palette.secondary.light,
                        color: "inherit",
                      }
                    : {}),
                }}
                onClick={() => {
                  navigate(signUpUrl);
                }}
              >
                Try for free
              </Button>
            </Stack>
          </Toolbar>
        ) : (
          <Toolbar
            variant="dense"
            disableGutters
            ref={toolbarRef}
            sx={{
              position: "relative",
              px: theme.ttSpacings.page.px * 2,
              py: theme.spacing(1),
              fontSize: theme.typography.subtitle1.fontSize,
              backgroundColor: amber[50],
            }}
          >
            <TTNameIcon size="md" />
            <IconButton
              sx={{ ml: "auto", mr: theme.spacing(-2) }}
              onClick={() => setOpenMenu(!openMenu)}
            >
              {openMenu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            {openMenu && (
              <Box
                bgcolor={amber[50]}
                position={"absolute"}
                height={`calc(100vh - ${collapsedToolBarHeight}px)`}
                top={collapsedToolBarHeight}
                right={0}
                left={0}
                borderTop={`1px solid ${grey[300]}`}
                padding={theme.spacing(4, theme.ttSpacings.page.px)}
                color={"black"}
              >
                <DropDownItemList>
                  <DropDownItem>
                    <AppBarExpandButton
                      label={ItemNames.USE_CASE}
                      upIcon={<ArrowRightIcon />}
                      downIcon={<ArrowRightIcon />}
                    />
                  </DropDownItem>
                  <DropDownItem>
                    <AppBarExpandButton
                      label={ItemNames.SOLUTIONS}
                      upIcon={<ArrowRightIcon />}
                      downIcon={<ArrowRightIcon />}
                    />
                  </DropDownItem>
                  <DropDownItem>
                    <Link>{ItemNames.PRICING}</Link>
                  </DropDownItem>
                  <DropDownItem>
                    <AppBarExpandButton
                      label={ItemNames.APPS}
                      upIcon={<ArrowRightIcon />}
                      downIcon={<ArrowRightIcon />}
                    />
                  </DropDownItem>
                  <DropDownItem>
                    <AppBarExpandButton
                      label={ItemNames.CAREERS}
                      upIcon={<ArrowRightIcon />}
                      downIcon={<ArrowRightIcon />}
                    />
                  </DropDownItem>
                  <DropDownItem>
                    <Link>{ItemNames.BOOK_A_DEMO}</Link>
                  </DropDownItem>
                </DropDownItemList>
                <Stack alignItems={"center"} gap={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      borderRadius: 100,
                      color: "white",
                      padding: theme.spacing(2, 3),
                      fontSize: theme.typography.subtitle2.fontSize,
                    }}
                    onClick={() => {
                      navigate(signUpUrl);
                    }}
                  >
                    Try for free
                  </Button>
                  <LoginLink>Log in</LoginLink>
                </Stack>
              </Box>
            )}
          </Toolbar>
        )}
      </ClickAwayListener>
    </AppBar>
  );
};

export default TrackAppBar;
