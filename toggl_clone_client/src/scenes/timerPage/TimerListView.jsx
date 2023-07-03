import { Box, Stack } from "@mui/material";
import React, { useMemo } from "react";
import TimerPageToolBar from "./TimerPageToolBar";
import ToolBarLinkButton from "./ToolBarLinkButton";
import { useSelector } from "react-redux";
import { compareDesc, startOfWeek } from "date-fns";
import TimeEntrySection from "../../components/timeEntrySection/TimeEntrySection";
import { getTotalDurationOfADay } from "../../utils/TimeEntryUtil";
import { formatSecondHMMSS } from "../../utils/TTDateUtil";

const dateFormat = "EEE, dd MMM";

const TimerListView = () => {
  const dateGroupEntries = useSelector(
    (state) => state.groupedEntryList.dateGroupedEntries
  );
  const currentDuration = useSelector((state) => state.currentEntry.duration);

  const sortedDateGroupEntries = useMemo(() => {
    const dateGroupList = Object.values(dateGroupEntries);
    dateGroupList.sort((a, b) => compareDesc(a.date, b.date));
    return dateGroupList;
  }, [dateGroupEntries]);

  const getTotalDurationToday = () => {
    return (
      getTotalDurationOfADay(dateGroupEntries, Date.now()) + currentDuration
    );
  };

  const getTotalDurationThisWeek = () => {
    const startDate = startOfWeek(Date.now(), { weekStartsOn: 1 });
    let totalDuration = 0;
    for (let i = 0; i < 7; i++) {
      totalDuration += getTotalDurationOfADay(dateGroupEntries, startDate);
      startDate.setDate(startDate.getDate() + 1);
    }

    return totalDuration;
  };

  const formattedTotalDurationThisWeek = useMemo(() => {
    return formatSecondHMMSS(getTotalDurationThisWeek());
  }, [dateGroupEntries]);

  return (
    <Box>
      <TimerPageToolBar>
        <Stack direction={"row"} gap={4} alignItems={"center"} mx={4}>
          <ToolBarLinkButton
            title={"Today"}
            content={formatSecondHMMSS(getTotalDurationToday())}
            to={"/testing"}
          />
          <ToolBarLinkButton
            title={"Week"}
            content={formattedTotalDurationThisWeek}
            to={"/theme"}
          />
        </Stack>
      </TimerPageToolBar>
      {sortedDateGroupEntries.length === 0 ? (
        <Box sx={{ textAlign: "center" }}> Nothing left</Box>
      ) : (
        sortedDateGroupEntries.map((sectionData) => {
          return (
            <TimeEntrySection
              key={sectionData.dateGroupId}
              sectionData={sectionData}
            />
          );
        })
      )}
    </Box>
  );
};

export default TimerListView;
