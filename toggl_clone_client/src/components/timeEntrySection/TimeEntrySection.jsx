import styled from "@emotion/styled";
import React, { useReducer } from "react";
import TimeEntryHeader from "./TimeEntryHeader";
import {
  getIntialTimeEntryCheckedData,
  timeEntryCheckedReducer,
} from "./TimeEntryCheckedReducer";
import TimeEntryItemRecord from "./TimeEntryItemRecord";
import { useSelector } from "react-redux";

const TimeEntryList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  marginBottom: theme.spacing(4),
}));

const TimeEntrySection = ({ sectionData, ...other }) => {
  const tagList = useSelector((state) => state.currentEntry.tags);

  const { dateHeading, timeEntries, totalTime } = sectionData;
  const [timeEntryChecked, timeEntryCheckedDispatch] = useReducer(
    timeEntryCheckedReducer,
    getIntialTimeEntryCheckedData()
  );

  const timeEIdList = timeEntries.map((timeEntry) => timeEntry.id);

  return (
    <TimeEntryList className="TimeEntryList-root">
      <TimeEntryHeader
        dateHeading={dateHeading}
        timeEIdList={timeEIdList}
        totalTime={totalTime}
        timeEntryChecked={timeEntryChecked}
        timeEntryCheckedDispatch={timeEntryCheckedDispatch}
      />
      {timeEntries.map((timeEntry) => (
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
        />
      ))}
    </TimeEntryList>
  );
};

export default TimeEntrySection;
