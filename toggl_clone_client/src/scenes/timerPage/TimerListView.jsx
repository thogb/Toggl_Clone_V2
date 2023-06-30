import { Box, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import TimerPageToolBar from "./TimerPageToolBar";
import ToolBarLinkButton from "./ToolBarLinkButton";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import TimeEntrySection from "../../components/timeEntrySection/TimeEntrySection";

const dateFormat = "EEE, dd MMM";

const TimerListView = () => {
  const dateGroupEntries = useSelector(
    (state) => state.groupedEntryList.dateGroupedEntries
  );

  const sortedDateGroupEntries = useMemo(() => {
    const dateGroupList = Object.values(dateGroupEntries);
    dateGroupList.sort((a, b) => a.dateString <= b.dateString);
    return dateGroupList;
  }, [dateGroupEntries]);

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
      {sortedDateGroupEntries.length === 0 ? (
        <div>None</div>
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
