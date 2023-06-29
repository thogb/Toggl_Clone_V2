import styled from "@emotion/styled";
import React, { useMemo, useReducer } from "react";
import TimeEntryHeader from "./TimeEntryHeader";
import {
  getIntialTimeEntryCheckedData,
  timeEntryCheckedReducer,
} from "./TimeEntryCheckedReducer";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import { useSelector } from "react-redux";
import TimeEntryItem from "./TimeEntryItem";
import TimeEntryGroup from "./TimeEntryGroup";

const TimeEntryList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  marginBottom: theme.spacing(4),
}));

const TimeEntrySection = ({ sectionData, ...other }) => {
  const tagList = useSelector((state) => state.currentEntry.tags);

  const { dateString, groupedEntries, totalDuration } = sectionData;
  const [timeEntryChecked, timeEntryCheckedDispatch] = useReducer(
    timeEntryCheckedReducer,
    getIntialTimeEntryCheckedData()
  );

  // const timeEIdList = timeEntries.map((timeEntry) => timeEntry.id);
  const timeEIdList = useMemo(() => {
    const list = [];
    groupedEntries.forEach((groupedEntry) => {
      if (groupedEntry.entries !== undefined) {
        groupedEntry.entries.forEach((entry) => {
          list.push(entry.id);
        });
      } else {
        list.push(groupedEntry.entry.id);
      }
    });
    return list;
  }, [groupedEntries]);

  return (
    <TimeEntryList className="TimeEntryList-root">
      <TimeEntryHeader
        key={"test"}
        dateString={dateString}
        timeEIdList={timeEIdList}
        totalDuration={totalDuration}
        timeEntryChecked={timeEntryChecked}
        timeEntryCheckedDispatch={timeEntryCheckedDispatch}
      />
      {/* {timeEntries.map((timeEntry) => (
        <TimeEntryItemRecord
          key={timeEntry.id}
          id={timeEntry.id}
          checked={timeEntryChecked.checkedList.indexOf(timeEntry.id) !== -1}
          showCheckbox={timeEntryChecked.showCheckbox}
          projectId={timeEntry.projectId}
          description={timeEntry.description}
          tagList={tagList}
          tagsChecked={timeEntry.tags}
          duration={timeEntry.duration}
          startDate={timeEntry.startDate}
          stopDate={timeEntry.stopDate}
          timeEntryChecked={timeEntryChecked}
          timeEntryCheckedDispatch={timeEntryCheckedDispatch}
          isTypeHeader={true}
        />
      ))} */}
      {groupedEntries.map((groupedEntry) => {
        if (groupedEntry.entry !== undefined) {
          // console.log(groupedEntry.entry);
          // console.log(groupedEntry.entries);
          return (
            <TimeEntryItem
              key={groupedEntry.entry.id}
              timeEntry={groupedEntry.entry}
              tagList={tagList}
              // checked={
              //   timeEntryChecked.checkedList.indexOf(groupedEntry.entry.id) !==
              //   -1
              // }
              timeEntryChecked={timeEntryChecked}
              timeEntryCheckedDispatch={timeEntryCheckedDispatch}
            />
          );
        } else {
          return (
            <TimeEntryGroup
              key={groupedEntry.gId}
              groupedEntry={groupedEntry}
              tagList={tagList}
              timeEntryChecked={timeEntryChecked}
              timeEntryCheckedDispatch={timeEntryCheckedDispatch}
            />
          );
        }
      })}
    </TimeEntryList>
  );
};

export default TimeEntrySection;
