import { Box, Button } from "@mui/material";
import React from "react";
import { useAddTagMutation } from "../../state/tagSlice";
// import { getRawEntryList } from "../../state/entryListSlice";
import { useAddTimeEntryMutation } from "../../state/groupedEntryListSlice";

const workspaceId = 2002;
const tagNames = [
  "test",
  "test2",
  "tag1",
  "tag2",
  "tag3",
  "tag4",
  "python",
  "java",
  "html",
  "css",
  "javascript",
  "react",
  "mui",
  ".net core",
  "c#",
  ".net core api",
  "ef core",
  "RTK query",
  "redux",
  "react router",
  "R",
  "frontend",
  "backend",
  "server",
];

const ApiPage = () => {
  const [addTag] = useAddTagMutation();
  const [addTimeEntry] = useAddTimeEntryMutation();

  const handleAddTags = () => {
    for (let tagName of tagNames) {
      addTag({ workspaceId, tagName });
    }
  };

  const handleAddTimeEntries = () => {
    // const timeEntries = getRawEntryList();
    const timeEntries = [];
    const newTimeEntries = timeEntries.timeEntries.map((timeEntry) => {
      const startDate = new Date(timeEntry.startDate);
      const stopDate = new Date(timeEntry.stopDate);
      const times = Math.floor(Math.random() * tagNames.length);
      const tags = [...tagNames];
      for (let i = 0; i < times; i++) {
        tags.splice(tagNames[Math.floor(Math.random() * tagNames.length)], 1);
      }
      return {
        description: timeEntry.description,
        duration: timeEntry.duration,
        startDate: startDate,
        stopDate: stopDate,
        workspaceId: workspaceId,
        tags: tags,
        projectId: null,
      };
    });
    newTimeEntries.forEach((timeEntry) => {
      addTimeEntry({ timeEntry: timeEntry });
    });
  };

  return (
    <Box p={4} display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={2}>
      <Button variant="contained" onClick={null}>
        Add Tags
      </Button>
      <Button variant="contained" onClick={null}>
        Add Time Entry
      </Button>
    </Box>
  );
};

export default ApiPage;
