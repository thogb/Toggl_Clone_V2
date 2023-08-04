import React, { useState } from "react";
import TTPopper from "../ttPopper/TTPopper";
import { FilterButton } from "./FilterButton";
import { Folder } from "@mui/icons-material";
import ListFilter from "./ListFilter";
import { useSelector } from "react-redux";
import { TTPopperActionSection } from "../ttPopper/TTPopperActionSection";
import SubjectStateFilter from "./SubjectStateFilter";
import { PROJECT_STATE } from "../../utils/constants";

export const ProjectsFilterButton = (props) => {
  return (
    <FilterButton startIcon={<Folder />} {...props}>
      Project
    </FilterButton>
  );
};

export default function ProjectsFilter({ workspaceId, onComplete }) {
  const projects =
    useSelector((state) => state.projects.projects)[workspaceId] ?? [];

  const [popperAnchorEl, setPopperAnchorEl] = useState(null);

  return (
    <TTPopper
      anchorEl={popperAnchorEl}
      onClose={() => setPopperAnchorEl(null)}
      triggerComponent={
        <ProjectsFilterButton
          onClick={(e) => setPopperAnchorEl(e.currentTarget)}
        />
      }
    >
      <ListFilter
        searchPlaceholder={"Find project..."}
        defaultText={"Entries without project"}
        defaultselected={false}
        matchDescription={(project, searchText) =>
          project.name.toLowerCase().includes(searchText.toLowerCase().trim())
        }
        setDefaultSelect={() => {}}
        itemList={projects}
        checkedItemList={[]}
        setCheckedItemList={() => {}}
        renderListItem={({ value, onClick, checked }) => {}}
      />
      <TTPopperActionSection>
        <SubjectStateFilter
          subjectStates={Object.values(PROJECT_STATE)}
          currentSubjectState={PROJECT_STATE.active}
        />
      </TTPopperActionSection>
    </TTPopper>
  );
}
