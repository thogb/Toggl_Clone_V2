import React, { memo, useMemo } from "react";
import TTBarGraph from "../ttBarGraph/TTBarGraph";
import { addSeconds, format } from "date-fns";
import { getDatesOfWeek } from "../../utils/TTDateUtil";

const resolutions = {
  DAY: "day",
};

const rowHeight = 40;
const rowCount = 7;
const axisContainerHeight = rowHeight * rowCount;

const TimeBarGraph = ({ data }) => {
  const segmentCount = 6;

  const graphData = useMemo(() => {
    const maxSeconds = data.graph.reduce((p, c) => {
      return Math.max(p, c.seconds);
    }, Number.MIN_VALUE);
    const maxHour = Math.ceil(maxSeconds / 3600 / segmentCount) * segmentCount;
    const graphData = data.graph;
    const barData = graphData.map((item) => {
      return {
        indicator: {
          value: item.seconds / 3600,
          label: format(addSeconds(new Date(0, 0), item.seconds), "H:mm"),
        },
      };
    });
    if (data.resolution === resolutions.DAY) {
      const dates = getDatesOfWeek(Date.now());
      console.log(dates);
      barData.forEach((item, index) => {
        item.label = {
          main: format(dates[index], "E"),
          secondary: format(dates[index], "M/d"),
        };
        item.tooltip = {
          main: format(dates[index], "EEEE, MMMM do"),
          secondary: `Total:    ${format(
            addSeconds(new Date(0, 0), graphData[index].seconds),
            "H:mm:ss"
          )}`,
        };
      });
    }
    return {
      barData: barData,
      maxValue: maxHour,
    };
  }, []);

  return (
    <TTBarGraph
      axisUnit="h"
      axisMax={Math.max(graphData.maxValue, 10)}
      data={[
        ...graphData.barData,
        ...graphData.barData,
        ...graphData.barData,
        ...graphData.barData,
        ...[graphData.barData[0], graphData.barData[0], graphData.barData[0]],
      ]}
      data={graphData.barData}
    />
  );
};

export default memo(TimeBarGraph);
