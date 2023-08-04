import React, { memo, useEffect, useState } from "react";
import TTPopper from "../ttPopper/TTPopper";
import { FilterButton } from "./FilterButton";
import { LocalOffer } from "@mui/icons-material";
import ListFilter from "./ListFilter";
import { useSelector } from "react-redux";
import CheckboxListItem from "../checkboxList/CheckboxListItem";
import { filterUtils } from "../../utils/filtersUtil";

export const TagsFilterButton = (props) => {
  return (
    <FilterButton startIcon={<LocalOffer />} {...props}>
      Tag
    </FilterButton>
  );
};

const TagsFilter = ({
  workspaceId,
  selected = false,
  tagFilterData,
  onComplete,
}) => {
  const tags = useSelector((state) => state.tags.tags)[workspaceId] ?? [];

  const [popperAnchorEl, setPopperAnchorEl] = useState(null);
  const [checkedTags, setCheckedTags] = useState([]);
  const [defaultSelected, setDefaultSelected] = useState(false);

  useEffect(() => {
    setDefaultSelected(tagFilterData.defaultSelected);
    setCheckedTags([...tagFilterData.tags]);
  }, [tagFilterData]);

  const handleTagButtonClick = (e) => {
    setPopperAnchorEl(e.currentTarget);
  };

  const handlePopperClose = () => {
    if (onComplete) {
      onComplete({
        defaultSelected: defaultSelected,
        tags: checkedTags,
      });
    }
    setPopperAnchorEl(null);
  };

  const handleCheckedTagsChange = (newCheckedTags) => {
    setCheckedTags(newCheckedTags.sort((a, b) => a.name.localeCompare(b.name)));
  };

  return (
    <TTPopper
      anchorEl={popperAnchorEl}
      onClose={handlePopperClose}
      triggerComponent={
        <TagsFilterButton
          selected={selected}
          count={
            tagFilterData.tags.length + Number(tagFilterData.defaultSelected)
          }
          onClick={handleTagButtonClick}
        />
      }
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
        setCheckedItemList={handleCheckedTagsChange}
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

export default memo(TagsFilter);
