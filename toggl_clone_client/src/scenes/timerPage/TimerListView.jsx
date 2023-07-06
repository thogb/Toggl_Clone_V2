import { Box, Stack } from "@mui/material";
import React, { useMemo } from "react";
import TimerPageToolBar from "./TimerPageToolBar";
import ToolBarLinkButton from "./ToolBarLinkButton";
import { useSelector } from "react-redux";
import { compareDesc } from "date-fns";
import TimeEntrySection from "../../components/timeEntrySection/TimeEntrySection";
import { formatSecondHMMSS } from "../../utils/TTDateUtil";
import { groupedEntryListSliceUtil } from "../../utils/groupedEntryListSliceUtil";

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
    return groupedEntryListSliceUtil.getTotalDurationOfADay(
      dateGroupEntries,
      Date.now()
    );
  };

  const getTotalDurationThisWeek = () => {
    return groupedEntryListSliceUtil.getTotalDurationOfAWeek(
      dateGroupEntries,
      Date.now()
    );
  };

  const durations = useMemo(() => {
    return {
      today: getTotalDurationToday(),
      thisWeek: getTotalDurationThisWeek(),
    };
  }, [dateGroupEntries]);

  return (
    <Box height={"100%"}>
      <TimerPageToolBar>
        <Stack direction={"row"} gap={4} alignItems={"center"} mx={4}>
          <ToolBarLinkButton
            title={"Today"}
            content={formatSecondHMMSS(durations.today + currentDuration)}
            to={"/testing"}
          />
          <ToolBarLinkButton
            title={"Week"}
            content={formatSecondHMMSS(durations.thisWeek + currentDuration)}
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
