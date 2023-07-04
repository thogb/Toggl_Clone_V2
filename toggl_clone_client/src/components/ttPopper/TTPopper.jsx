import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Backdrop, Paper, Popper } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { grey } from "@mui/material/colors";
import classNames from "classnames/bind";

const SIZES = {
  sm: 238,
  md: 288,
  lg: 338,
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  // px: 1 / 2,
}));

const PopperRoot = styled("div")(({ theme }) => ({
  // height: "100%",
  "& .TTPopper-trigger-wrapper": {
    // height: "100%",
  },
  "&.TTPopper-open > TTPopper-trigger": {
    "& > TTPopper-trigger-button": {
      backgroundColor: grey[500],
    },
    "& > TTPopper-trigger-iconButton": {
      backgroundColor: grey[500],
    },
  },
}));

const TTPopper = ({
  anchorEl,
  onClose,
  placement,
  size = "lg",
  triggerComponent,
  triggerClassName,
  triggerTouchable = false,
  children,
  style,
  width,
  sameWidthAsTrigger = false,
  gap,
  offset,
  ...other
}) => {
  const theme = useTheme();

  const openPopper = Boolean(anchorEl);
  //   const id = open ? "simple-popper" : undefined;

  const contents = (
    <>
      <Popper
        // id={id}
        open={openPopper}
        disablePortal
        anchorEl={anchorEl}
        placement={placement ?? "bottom-start"}
        modifiers={[{ name: "offset", options: { offset: offset ?? [0, 8] } }]}
        style={{
          zIndex: theme.zIndex.modal + 2,
          ...(sameWidthAsTrigger ? { width: "100%" } : {}),
          ...style,
        }}
        {...other}
      >
        <StyledPaper
          elevation={8}
          style={{
            margin: gap,
            ...(size !== "none" ? { width: `${SIZES[size]}px` } : {}),
            ...(width ? { width: width } : {}),
            ...(sameWidthAsTrigger ? { width: "100%" } : {}),
          }}
        >
          {children}
        </StyledPaper>
      </Popper>
      <Backdrop
        style={{ backgroundColor: "transparent", zIndex: theme.zIndex.modal }}
        open={openPopper}
        onClick={() => onClose()}
      ></Backdrop>
    </>
  );

  if (triggerComponent) {
    return (
      <PopperRoot
        className={
          openPopper
            ? classNames("TTPopper-root", "TTPopper-open")
            : "TTPopper-root"
        }
        style={{
          position: sameWidthAsTrigger && "relative",
        }}
      >
        <div
          className={
            triggerClassName
              ? `TTPopper-trigger-wrapper ${triggerClassName}`
              : "TTPopper-trigger-wrapper"
          }
          style={
            triggerTouchable && Boolean(anchorEl)
              ? { zIndex: theme.zIndex.modal + 100, position: "relative" }
              : {}
          }
        >
          {React.cloneElement(triggerComponent, {
            className: classNames(
              triggerComponent.props.className,
              "TTPopper-trigger",
              openPopper ? "TTPopper-open" : null
            ),
          })}
        </div>
        {contents}
      </PopperRoot>
    );
  } else {
    return contents;
  }
};

TTPopper.propTypes = {
  triggerClassName: PropTypes.oneOf([
    "TTPopper-trigger-iconButton",
    "TTPopper-trigger-button",
  ]),
  size: PropTypes.oneOf(Object.keys(SIZES)),
};

export default TTPopper;
