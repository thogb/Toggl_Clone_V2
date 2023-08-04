import React, { useState } from "react";
import { FilterButton } from "./FilterButton";
import { Abc, MoreHoriz } from "@mui/icons-material";
import TTPopper from "../ttPopper/TTPopper";
import TTPopperContainer from "../ttPopper/TTPopperContainer";
import SearchTextField from "../searchTextField/SearchTextField";
import CheckboxListItem from "../checkboxList/CheckboxListItem";
import { useTheme } from "@mui/material";

export const DescriptionFilterButton = (props) => {
  return (
    <FilterButton startIcon={<Abc />} {...props}>
      Description
    </FilterButton>
  );
};

const DescriptionFilter = () => {
  const theme = useTheme();

  const [searchDesc, setSearchDesc] = useState("");
  const [withoutDescription, setWithoutDescription] = useState(false);
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);

  const handleSearchChange = (e) => {
    setWithoutDescription(false);
    setSearchDesc(e.target.value);
  };

  const handleWithoutDescriptionClick = () => {
    console.log("clicked");
    setWithoutDescription(!withoutDescription);
    setSearchDesc("");
  };

  return (
    <TTPopper
      anchorEl={popperAnchorEl}
      onClose={() => setPopperAnchorEl(null)}
      triggerComponent={
        <DescriptionFilterButton
          endIconChildren={searchDesc && <MoreHoriz />}
          onClick={(e) => setPopperAnchorEl(e.currentTarget)}
        />
      }
    >
      <TTPopperContainer
        padding={theme.spacing(
          theme.ttSpacings.popper.px,
          theme.ttSpacings.popper.px / 2
        )}
      >
        <SearchTextField
          value={searchDesc}
          onChange={handleSearchChange}
          onClear={() => setSearchDesc("")}
          style={{
            margin: theme.spacing(0, theme.ttSpacings.popper.px / 2),
            marginBottom: theme.spacing(theme.ttSpacings.popper.px / 2),
          }}
        />
        <CheckboxListItem
          showSelected={true}
          checked={withoutDescription}
          itemText={"Without Description"}
          onClick={handleWithoutDescriptionClick}
        />
      </TTPopperContainer>
    </TTPopper>
  );
};

export default DescriptionFilter;
