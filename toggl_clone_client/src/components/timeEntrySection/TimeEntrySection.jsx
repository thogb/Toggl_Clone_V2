import styled from "@emotion/styled";
import React, { memo, useMemo, useReducer } from "react";
import TimeEntryHeader from "./TimeEntryHeader";
import {
  getIntialTimeEntryCheckedData,
  timeEntryCheckedActions,
  timeEntryCheckedReducer,
} from "./TimeEntryCheckedReducer";
import TimeEntryItem from "./TimeEntryItem";
import TimeEntryGroup from "./TimeEntryGroup";
import { alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import withSelectorPW from "./withSelectorPW";

const TimeEntryItemWithSelector = withSelectorPW(TimeEntryItem);

const TimeEntryList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  marginBottom: theme.spacing(4),
  "--boxshadow-color": alpha(grey[500], 0.5),
  boxShadow: "0px 1px 2px var(--boxshadow-color)",
}));

const TimeEntrySection = ({ sectionData, ...other }) => {
  const { dateGroupId, groupedEntries, totalDuration } = sectionData;
  const sectionDate = sectionData.date;
  const [timeEntryChecked, timeEntryCheckedDispatch] = useReducer(
    timeEntryCheckedReducer,
    getIntialTimeEntryCheckedData()
  );

  const checkedTEList = useMemo(() => {
    const list = [];
    groupedEntries.forEach((groupedEntry) => {
      if (groupedEntry.entries !== undefined) {
        groupedEntry.entries.forEach((entry) => {
          list.push(entry);
        });
      } else {
        list.push(groupedEntry.entry);
      }
    });
    if (timeEntryChecked.checkedList.length > 0) {
      timeEntryCheckedDispatch({
        type: timeEntryCheckedActions.SYNC_AGAINST_LIST,
        inList: list,
      });
    }
    return list;
  }, [groupedEntries]);

  return (
    <TimeEntryList className="TimeEntryList-root">
      <TimeEntryHeader
        key={"test"}
        dateGroupId={dateGroupId}
        sectionDate={sectionDate}
        checkedTEList={checkedTEList}
        totalDuration={totalDuration}
        timeEntryChecked={timeEntryChecked}
        timeEntryCheckedDispatch={timeEntryCheckedDispatch}
      />

      {groupedEntries.map((groupedEntry) => {
        if (groupedEntry.entries.length === 1) {
          return (
            <TimeEntryItemWithSelector
              key={groupedEntry.entries[0].id}
              dateGroupId={sectionData.dateGroupId}
              gId={groupedEntry.gId}
              timeEntry={groupedEntry.entries[0]}
              timeEntryChecked={timeEntryChecked}
              timeEntryCheckedDispatch={timeEntryCheckedDispatch}
            />
          );
        } else {
          return (
            <TimeEntryGroup
              key={groupedEntry.gId}
              dateGroupId={sectionData.dateGroupId}
              groupedEntry={groupedEntry}
              timeEntryChecked={timeEntryChecked}
              timeEntryCheckedDispatch={timeEntryCheckedDispatch}
            />
          );
        }
      })}
    </TimeEntryList>
  );
};

export default memo(TimeEntrySection);
