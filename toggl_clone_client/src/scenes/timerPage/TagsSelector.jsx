import React, { useEffect, useState } from "react";
import TTIconButton from "../../components/ttIconButton/TTIconButton";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTheme } from "@emotion/react";
import TTPopper from "../../components/ttPopper/TTPopper";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TTPopperDivider from "../../components/ttPopper/TTPopperDivider";
import CheckboxList from "../../components/checkboxList/CheckboxList";
import SearchTextField from "../../components/searchTextField/SearchTextField";
import { grey } from "@mui/material/colors";

const TagsSelector = ({
  tagList,
  tagCheckedList = [],
  onClose,
  onCreateTagClick,
  onPopperClose,
  onSelectionComplete,
  popperAnchorEl,
  triggerComponent,
  triggerTouchable,
  disableTrigerComponent = false,
  placement,
  offset = [40, 20],
  sameWidthAsTrigger,
  ...others
}) => {
  const [anchorEl, setAnchorEl] = useState(popperAnchorEl);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();

  const [localList, setLocalList] = useState([...tagList]);
  const [filteredLocalList, setFilteredLocalList] = useState([...tagList]);
  const [checkedList, setCheckedList] = useState([...tagCheckedList]);
  const [createdLocalList, setCreatedLocalList] = useState([]);

  useEffect(() => {
    // setCreatedLocalList([]);
    reOrderTagsList();
  }, [tagCheckedList, tagList]);

  const reOrderTagsList = () => {
    const newCheckedList = [...tagCheckedList, ...createdLocalList].sort();
    const filteredList = tagList
      .filter((v) => newCheckedList.indexOf(v) === -1)
      .sort();
    setLocalList([...newCheckedList, ...filteredList]);
    setFilteredLocalList([...newCheckedList, ...filteredList]);
    setCheckedList(newCheckedList);
  };

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    updateFilterList(newValue);
  };

  const handleSearchBlur = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const updateFilterList = (newValue) => {
    setFilteredLocalList(
      localList.filter((v) => v.toLowerCase().includes(newValue.toLowerCase()))
    );
  };

  const handleSearchClearClick = () => {
    setSearchValue("");
    updateFilterList("");
  };

  const handleCreateTagClick = () => {
    if (onCreateTagClick) onCreateTagClick(searchValue);
    if (searchValue) {
      setCreatedLocalList([...createdLocalList, searchValue]);
    }
    handleSearchClearClick();
  };
  const handlePopperClose = () => {
    const newCheckedList = [...checkedList].sort();
    if (onSelectionComplete) onSelectionComplete(newCheckedList);
    setAnchorEl(null);
    setCreatedLocalList([]);
    setCheckedList(newCheckedList);
    setSearchValue("");
  };
  const handlePopperOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const controlledClose = () => {
    const newCheckedList = [...checkedList].sort();
    if (onClose) onClose(newCheckedList);
    if (onSelectionComplete) onSelectionComplete(newCheckedList);
    setCheckedList(newCheckedList);
    setSearchValue("");
  };

  const searchIsNotEmpty = searchValue !== "";
  const canCreateTag =
    searchIsNotEmpty &&
    !tagList.some((tagName) => searchValue.trim() === tagName);
  // const hasTagsSelected = checkedList.length > 0;
  const hasTagsSelected = tagCheckedList.length > 0;

  return (
    <>
      <TTPopper
        size="sm"
        placement={placement ?? "bottom-end"}
        offset={offset}
        anchorEl={popperAnchorEl ?? anchorEl}
        onClose={popperAnchorEl ? controlledClose : handlePopperClose}
        sameWidthAsTrigger={sameWidthAsTrigger}
        triggerTouchable={triggerTouchable}
        triggerComponent={
          !disableTrigerComponent &&
          (triggerComponent ?? (
            <TTIconButton selected={hasTagsSelected} onClick={handlePopperOpen}>
              <LocalOfferIcon />
            </TTIconButton>
          ))
        }
      >
        <Box p={2}>
          <SearchTextField
            placeholder={"Add/filter tags."}
            value={searchValue}
            onBlur={handleSearchBlur}
            onChange={handleSearchChange}
            onClear={handleSearchClearClick}
          />
        </Box>
        <Box height={"200px"} maxHeight={"200px"} overflow={"auto"} px={0.5}>
          <CheckboxList
            checkedList={checkedList}
            // itemList={localList}
            itemList={filteredLocalList}
            setCheckedList={(v) => setCheckedList(v)}
          />
        </Box>
        <TTPopperDivider />
        <Button
          disabled={!canCreateTag}
          disableFocusRipple
          disableRipple
          onClick={handleCreateTagClick}
          startIcon={
            <AddIcon
              style={{
                color: canCreateTag ? theme.palette.secondary.main : grey[800],
              }}
            />
          }
          style={{
            justifyContent: "center",
            padding: theme.spacing(1.25, 1),
          }}
        >
          <Typography noWrap textTransform={"none"}>
            Create {searchIsNotEmpty ? `"${searchValue}" ` : ""}tag
          </Typography>
        </Button>
      </TTPopper>
    </>
  );
};

export default TagsSelector;
