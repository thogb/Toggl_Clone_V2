import React, { useState } from "react";
import TTPopper from "../ttPopper/TTPopper";
import { FilterButton } from "./FilterButton";
import { Person } from "@mui/icons-material";
import ListFilter from "./ListFilter";
import { TTPopperActionSection } from "../ttPopper/TTPopperActionSection";
import SubjectStateFilter from "./SubjectStateFilter";
import { CLIENT_STATE } from "../../utils/constants";

export const ClientsFilterButton = (props) => {
  return (
    <FilterButton startIcon={<Person />} {...props}>
      Client
    </FilterButton>
  );
};

const ClientsFilter = ({ workspaceId, onComplete }) => {
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);

  const [subjectState, setSubjectState] = useState(CLIENT_STATE.active);

  const handleSubjectStateFilterComplete = (value) => {
    setSubjectState(value);
  };

  const clients = [];

  return (
    <TTPopper
      anchorEl={popperAnchorEl}
      onClose={() => setPopperAnchorEl(null)}
      triggerComponent={
        <ClientsFilterButton
          onClick={(e) => setPopperAnchorEl(e.currentTarget)}
        />
      }
    >
      <ListFilter
        searchPlaceholder={"Find client..."}
        defaultText={""}
        defaultselected={false}
        itemList={clients}
      />
      <TTPopperActionSection>
        <SubjectStateFilter
          onComplete={handleSubjectStateFilterComplete}
          subjectStates={Object.values(CLIENT_STATE)}
          currentSubjectState={subjectState}
        />
      </TTPopperActionSection>
    </TTPopper>
  );
};

export default ClientsFilter;
