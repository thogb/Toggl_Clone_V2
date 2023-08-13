import { styled } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import React, { memo, useMemo } from "react";

const CenteredMetric = ({ label, centerX, centerY }) => {
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "0.875rem",
      }}
    >
      {label}
    </text>
  );
};

const PieWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  "& svg": {
    overflow: "visible",
  },
  "&:has(path:hover)": {
    "& path:not(:hover)": {
      opacity: 0.4,
    },
  },
  "& path": {
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(0.925)",
    },
  },
}));

const TTResponsivePie = ({ centerText, data, ...others }) => {
  const total = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data]);

  return (
    <PieWrapper>
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
        sortByValue={true}
        innerRadius={0.6}
        borderColor={{
          from: "color",
          modifiers: [["darker", "0"]],
        }}
        arcLinkLabel={(e) => `${Math.round((e.value / total) * 100)}%`}
        arcLinkLabelsTextOffset={0}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsOffset={15}
        arcLinkLabelsDiagonalLength={0}
        arcLinkLabelsStraightLength={0}
        arcLinkLabelsThickness={0}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        enableArcLabels={false}
        arcLabel={(e) => 3}
        arcLabelsRadiusOffset={0.8}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", "1.8"]],
        }}
        // tooltip={(e) => {
        //   let { datum: t } = e;
        //   // return n.createElement(
        //   //   l,
        //   //   { style: { color: t.color } },
        //   //   n.createElement(s, null, "id"),
        //   //   n.createElement(d, null, t.id),
        //   //   n.createElement(s, null, "value"),
        //   //   n.createElement(d, null, t.value),
        //   //   n.createElement(s, null, "formattedValue"),
        //   //   n.createElement(d, null, t.formattedValue),
        //   //   n.createElement(s, null, "color"),
        //   //   n.createElement(d, null, t.color)
        //   // );
        // }}
        // animate={false}
        legends={[]}
        layers={[
          "arcs",
          "arcLabels",
          "arcLinkLabels",
          "legends",
          (props) => <CenteredMetric label={centerText} {...props} />,
        ]}
        {...others}
      />
    </PieWrapper>
  );
};

export default memo(TTResponsivePie);
