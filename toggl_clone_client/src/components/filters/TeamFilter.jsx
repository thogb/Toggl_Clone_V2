import React, { useState } from "react";
import { FilterButton } from "./FilterButton";
import { Group } from "@mui/icons-material";
import TTPopper from "../ttPopper/TTPopper";
import ListFilter from "./ListFilter";
import { TTPopperActionSection } from "../ttPopper/TTPopperActionSection";
import SubjectStateFilter from "./SubjectStateFilter";
import { TEAM_STATE } from "../../utils/constants";

export const TeamFilterButton = (props) => {
  return (
    <FilterButton startIcon={<Group />} {...props}>
      Team
    </FilterButton>
  );
};

const TeamFilter = ({ workspaceId, onComplete }) => {
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);

  const team = [];
  return (
    <TTPopper
      anchorEl={popperAnchorEl}
      onClose={() => setPopperAnchorEl(null)}
      triggerComponent={
        <TeamFilterButton onClick={(e) => setPopperAnchorEl(e.currentTarget)} />
      }
    >
      <ListFilter
        searchPlaceholder={"Find members or groups..."}
        defaultText={""}
        defaultselected={false}
        itemList={team}
      />
      <TTPopperActionSection>
        <SubjectStateFilter
          subjectStates={Object.values(TEAM_STATE)}
          currentSubjectState={TEAM_STATE.active}
        />
      </TTPopperActionSection>
    </TTPopper>
  );
};

export default TeamFilter;
