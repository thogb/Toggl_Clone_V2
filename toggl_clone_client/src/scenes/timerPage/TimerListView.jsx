import { Box, Stack } from "@mui/material";
import React, { useMemo } from "react";
import TimerPageToolBar from "./TimerPageToolBar";
import ToolBarLinkButton from "./ToolBarLinkButton";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import TimeEntrySection from "../../components/timeEntrySection/TimeEntrySection";

const dateFormat = "EEE, dd MMM";

const TimerListView = () => {
  const timeEntries = useSelector((state) => state.entryList.timeEntries);

  const groupedTimeEntries = useMemo(() => {
    const grouped = {};
    timeEntries.forEach((timeEntry) => {
      const dateHeading = format(timeEntry.startDate, dateFormat);
      if (grouped[dateHeading] === undefined) {
        grouped[dateHeading] = {
          dateHeading: dateHeading,
          timeEntries: [],
        };
      }
      grouped[dateHeading].timeEntries.push(timeEntry);
    });

    const groupedList = Object.values(grouped);
    groupedList.sort((e1, e2) => e2.startDate - e1.startDate);
    groupedList.forEach((group) => {
      let totalTime = 0;
      group.timeEntries.forEach((entry) => {
        totalTime += entry.duration;
      });
      group["totalTime"] = totalTime;
    });
    return groupedList;
  }, [timeEntries]);
  return (
    <Box>
      <TimerPageToolBar>
        <Stack direction={"row"} gap={4} alignItems={"center"} mx={4}>
          <ToolBarLinkButton
            title={"TODAY"}
            content={"0:17:18"}
            to={"/testing"}
          />
          <ToolBarLinkButton title={"WEEK"} content={"0:27:45"} to={"/theme"} />
        </Stack>
      </TimerPageToolBar>
      {groupedTimeEntries.length === 0 ? (
        <div>None</div>
      ) : (
        groupedTimeEntries.map((sectionData) => {
          return (
            <TimeEntrySection
              key={sectionData.dateHeading}
              sectionData={sectionData}
            />
          );
        })
      )}
    </Box>
  );
};

export default TimerListView;
