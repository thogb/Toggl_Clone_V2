import React, { useEffect, useState } from "react";
import TTIconButton from "../../components/ttIconButton/TTIconButton";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTheme } from "@emotion/react";
import TTPopper from "../../components/ttPopper/TTPopper";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TTPopperDivider from "../../components/ttPopper/TTPopperDivider";
import CheckboxList from "../../components/checkboxList/CheckboxList";
import SearchTextField from "../../components/searchTextField.jsx/SearchTextField";
import { grey } from "@mui/material/colors";

const TagsSelector = ({
  tagList,
  tagCheckedList,
  onClose,
  onPopperClose,
  onSelectionComplete,
  popperAnchorEl,
  triggerComponent,
  triggerTouchable,
  placement,
  ...others
}) => {
  const [anchorEl, setAnchorEl] = useState(popperAnchorEl);
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();

  const [localList, setLocalList] = useState([...tagList]);
  const [checkedList, setCheckedList] = useState([...tagCheckedList]);

  useEffect(() => {
    reOrderTagsList();
  }, [tagCheckedList]);

  const reOrderTagsList = () => {
    checkedList.sort();
    const filteredList = localList
      .filter((v) => checkedList.indexOf(v) === -1)
      .sort();
    setLocalList([...checkedList, ...filteredList]);
  };

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };

  const handlePopperClose = () => {
    checkedList.sort();
    if (onSelectionComplete) onSelectionComplete(checkedList);
    setAnchorEl(null);
  };

  const handlePopperOpen = (e) => {
    // reOrderTagsList();
    setAnchorEl(e.currentTarget);
  };

  const controlledClose = () => {
    checkedList.sort();
    if (onClose) onClose(checkedList);
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
        offset={[40, 20]}
        anchorEl={popperAnchorEl ?? anchorEl}
        onClose={popperAnchorEl ? controlledClose : handlePopperClose}
        triggerTouchable={triggerTouchable}
        triggerComponent={
          triggerComponent ?? (
            <TTIconButton selected={hasTagsSelected} onClick={handlePopperOpen}>
              <LocalOfferIcon />
            </TTIconButton>
          )
        }
      >
        <Box p={2}>
          <SearchTextField
            placeholder={"Add/filter tags."}
            value={searchValue}
            onChange={handleSearchChange}
            onClear={() => setSearchValue("")}
          />
        </Box>
        <Box maxHeight={"200px"} overflow={"auto"} px={0.5}>
          <CheckboxList
            checkedList={checkedList}
            itemList={localList}
            setCheckedList={(v) => setCheckedList(v)}
          />
        </Box>
        <TTPopperDivider />
        <Button
          disabled={!canCreateTag}
          disableFocusRipple
          disableRipple
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