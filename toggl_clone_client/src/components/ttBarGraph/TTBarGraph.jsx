import { Stack, Tooltip, Typography, alpha, styled } from "@mui/material";
import classNames from "classnames";
import React, { memo, useMemo } from "react";

const maxBarWidth = 120;

const GraphContainer = styled("div")(({ theme }) => ({
  width: "100%",
  position: "relative",
  margin: theme.spacing(2, 0),

  "&:has(.BarToolTipArea:hover)": {
    "& .BarIndicatorLabel,& .BarLabelContainer:not(:hover)": {
      opacity: 0,
    },
  },
}));

const AxisSegment = styled("div")(({ theme }) => ({
  height: "var(--axis-segment-height)",
  width: "100%",
  borderBottom: "1px solid",
  borderBottomColor: theme.palette.divider,
  position: "relative",
}));

const AxisLabel = styled("span")(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.primary.light,
  position: "absolute",
  right: "18px",
  bottom: "3px",
  userSelect: "none",
}));

const AxisContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
}));

const BarContainer = styled("div")(({ theme }) => ({
  paddingRight: "50px",
  paddingLeft: "15px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
}));

const Bar = styled("div")(({ theme }) => ({
  width: "0px",
  flexGrow: 1,
  maxWidth: `${maxBarWidth}px`,
}));

const BarMain = styled("div")(({ theme }) => ({
  height: "var(--axis-container-height)",
  position: "relative",
}));

const BarIndicator = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  position: "absolute",
  height: "var(--bar-indicator-height)",
  bottom: "0px",
  left: "var(--bar-indicator-horiz-gap)",
  right: "var(--bar-indicator-horiz-gap)",
}));

const BarIndicatorLabel = styled(({ className, ...props }) => (
  <span className={classNames(className, "BarIndicatorLabel")} {...props} />
))(({ theme }) => ({
  position: "absolute",
  ...theme.typography.caption,
  top: "-3.5ch",
  width: "100%",
  textAlign: "center",
}));

const BarLabelContainer = styled(
  ({ className, ...props }) => (
    <div className={classNames(className, "BarLabelContainer")} {...props} />
  ),
  { name: "BarLabelContainer" }
)(({ theme }) => ({
  padding: "6px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  ...theme.typography.caption,
  userSelect: "none",
  position: "relative",
  transition: theme.transitions.create(["opacity"]),
}));

const BarLabelMain = styled("span")(({ theme }) => ({}));

const BarLabelSecondary = styled("span")(({ theme }) => ({
  color: alpha(theme.palette.primary.light, 0.7),
  fontWeight: 700,
  lineHeight: 1,
}));

const BarToolTipArea = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: "0px",
  top: "calc(var(--bar-indicator-height) * -1)",
}));

const TTBarGraph = ({
  segmentHeight = 40,
  segmentCount = 6,
  axisMax = 10,
  axisUnit = "",
  data = [],
}) => {
  const axisContainerHeight = segmentHeight * segmentCount;
  const barIndicatorHorizGap = 22 - (data.length / 3.2).toFixed(2);
  const axisIncrement = Math.ceil(axisMax / segmentCount);

  const axisSegments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < segmentCount; i++) {
      segs.push(
        <AxisSegment key={i}>
          <AxisLabel>{`${i * axisIncrement} ${axisUnit}`}</AxisLabel>
        </AxisSegment>
      );
    }
    return segs.reverse();
  }, [segmentCount, axisUnit]);

  return (
    <GraphContainer
      style={{
        "--axis-segment-height": `${segmentHeight}px`,
        "--axis-container-height": `${axisContainerHeight}px`,
        "--bar-indicator-horiz-gap": `${barIndicatorHorizGap}%`,
      }}
    >
      <AxisContainer>{axisSegments}</AxisContainer>
      <BarContainer>
        {data?.map((item, ind) => {
          return (
            <Bar
              key={ind}
              style={{
                "--bar-indicator-height": `${
                  segmentHeight * (item?.indicator?.value / axisIncrement)
                }px`,
              }}
            >
              <BarMain>
                <BarIndicator>
                  {item?.indicator?.value > 0 && (
                    <BarIndicatorLabel>
                      {item?.indicator?.label}
                    </BarIndicatorLabel>
                  )}
                </BarIndicator>
              </BarMain>
              <BarLabelContainer>
                <BarLabelMain>{item?.label?.main}</BarLabelMain>
                <BarLabelSecondary>{item?.label?.secondary}</BarLabelSecondary>
                <Tooltip
                  enterNextDelay={500}
                  leaveDelay={50}
                  placement="top"
                  arrow
                  title={
                    <>
                      <Typography
                        variant="caption"
                        fontSize={"0.75rem"}
                        component={"h6"}
                        fontWeight={600}
                        mb={1}
                      >
                        {item?.tooltip?.main}
                      </Typography>
                      <Typography variant="caption" component={"p"}>
                        {item?.tooltip?.secondary}
                      </Typography>
                    </>
                  }
                >
                  <BarToolTipArea className="BarToolTipArea" />
                </Tooltip>
              </BarLabelContainer>
            </Bar>
          );
        })}
      </BarContainer>
    </GraphContainer>
  );
};

export default memo(TTBarGraph);
