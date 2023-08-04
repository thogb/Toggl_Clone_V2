import React, { useState } from "react";
import TTPopper from "../ttPopper/TTPopper";
import { FilterButton } from "./FilterButton";
import { LocalOffer } from "@mui/icons-material";
import ListFilter from "./ListFilter";
import { useSelector } from "react-redux";
import CheckboxListItem from "../checkboxList/CheckboxListItem";

export const TagsFilterButton = (props) => {
  return (
    <FilterButton startIcon={<LocalOffer />} {...props}>
      Tag
    </FilterButton>
  );
};

const TagsFilter = ({ workspaceId, onComplete }) => {
  const tags = useSelector((state) => state.tags.tags)[workspaceId] ?? [];

  const [popperAnchorEl, setPopperAnchorEl] = useState(null);
  const [checkedTags, setCheckedTags] = useState([]);
  const [defaultSelected, setDefaultSelected] = useState(false);

  const handleTagButtonClick = (e) => {
    setPopperAnchorEl(e.currentTarget);
  };

  return (
    <TTPopper
      anchorEl={popperAnchorEl}
      onClose={() => setPopperAnchorEl(null)}
      triggerComponent={<TagsFilterButton onClick={handleTagButtonClick} />}
    >
      <ListFilter
        searchPlaceholder={"Find tags..."}
        defaultText={"Without Tag"}
        defaultselected={defaultSelected}
        matchDescription={(item, searchText) =>
          item.name.toLowerCase().includes(searchText.toLowerCase().trim())
        }
        setDefaultSelect={setDefaultSelected}
        itemList={tags}
        checkedItemList={checkedTags}
        setCheckedItemList={setCheckedTags}
        renderListItem={({ value, onClick, checked }) => {
          return (
            <CheckboxListItem
              key={value.name}
              value={value.name}
              onClick={onClick}
              itemText={value.name}
              checked={checked}
            />
          );
        }}
      />
    </TTPopper>
  );
};

export default TagsFilter;
