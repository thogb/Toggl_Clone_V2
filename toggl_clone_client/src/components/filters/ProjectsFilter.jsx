import React, { useState } from "react";
import TTPopper from "../ttPopper/TTPopper";
import { FilterButton } from "./FilterButton";
import { Circle, Folder } from "@mui/icons-material";
import ListFilter from "./ListFilter";
import { useSelector } from "react-redux";
import { TTPopperActionSection } from "../ttPopper/TTPopperActionSection";
import SubjectStateFilter from "./SubjectStateFilter";
import { PROJECT_STATE } from "../../utils/constants";
import CheckboxListItem, {
  CheckBoxListItemBase,
} from "../checkboxList/CheckboxListItem";
import {
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

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
  const [subjectState, setSubjectState] = useState(PROJECT_STATE.active);
  const [defaultSelected, setDefaultSelected] = useState(false);
  const [checkedProjects, setCheckedProjects] = useState([]);

  const handleSubjectStateFilterComplete = (value) => {
    setSubjectState(value);
  };

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
        defaultselected={defaultSelected}
        matchDescription={(project, searchText) =>
          project.name.toLowerCase().includes(searchText.toLowerCase().trim())
        }
        setDefaultSelect={setDefaultSelected}
        itemList={projects}
        checkedItemList={checkedProjects}
        setCheckedItemList={setCheckedProjects}
        renderListItem={({ value, onClick, checked }) => {
          return (
            <CheckBoxListItemBase key={value.id}>
              <ListItemButton onClick={onClick} disableTouchRipple>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemIcon>
                  <Circle style={{ fontSize: "0.6rem", color: value.colour }} />
                </ListItemIcon>
                <ListItemText primary={value.name} />
              </ListItemButton>
            </CheckBoxListItemBase>
          );
        }}
      />
      <TTPopperActionSection>
        <SubjectStateFilter
          onComplete={handleSubjectStateFilterComplete}
          subjectStates={Object.values(PROJECT_STATE)}
          currentSubjectState={subjectState}
        />
      </TTPopperActionSection>
    </TTPopper>
  );
}
