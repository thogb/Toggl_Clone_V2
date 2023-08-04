import React, { useEffect, useState } from "react";
import SearchTextField from "../searchTextField/SearchTextField";
import { Box, Stack, Typography, styled, useTheme } from "@mui/material";
import CheckboxListItem from "../checkboxList/CheckboxListItem";
import TTPopperContainer from "../ttPopper/TTPopperContainer";
import CheckboxList from "../checkboxList/CheckboxList";

const ListFilterCaption = styled((props) => (
  <Typography variant="caption" component={"span"} {...props} />
))(({ theme }) => ({
  textTransform: "uppercase",
}));

const ListFilterCaptionButton = styled((props) => (
  <Typography variant="caption" component={"span"} {...props} />
))(({ theme }) => ({
  textTransform: "uppercase",
  cursor: "pointer",
}));

const FilterSearchTextField = styled(SearchTextField)(({ theme }) => ({
  margin: theme.spacing(theme.ttSpacings.popper.px / 2),
  marginTop: theme.spacing(theme.ttSpacings.popper.px),
}));

const ListFilter = ({
  searchPlaceholder,
  renderDefault = null,
  defaultText = null,
  defaultselected = null,
  setDefaultSelect = () => {},
  matchDescription = (desc) => true,
  clearListOnDefaultSelect = true,
  itemList = [],
  checkedItemList = [],
  setCheckedItemList = () => {},
  renderListItem = () => {},
}) => {
  const theme = useTheme();

  const [searchDesc, setSearchDesc] = useState("");
  const [filteredItemList, setFilteredItemList] = useState(itemList);

  useEffect(() => {
    if (Boolean(searchDesc)) {
      setFilteredItemList(
        itemList.filter((item) => matchDescription(item, searchDesc))
      );
    } else {
      setFilteredItemList([...itemList]);
    }
  }, [itemList, searchDesc]);

  const handleSearchChange = (e) => {
    setSearchDesc(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchDesc("");
  };

  const handleDefaultClick = () => {
    if (clearListOnDefaultSelect) {
      setCheckedItemList([]);
    }
    setDefaultSelect(!Boolean(defaultselected));
  };

  const handleAllClick = () => {
    setDefaultSelect(null);
    setCheckedItemList(itemList);
  };

  const handleNoneClick = () => {
    setDefaultSelect(null);
    setCheckedItemList([]);
  };

  const handleCheckedListChange = (newCheckedList) => {
    setCheckedItemList(newCheckedList);
    if (clearListOnDefaultSelect) {
      setDefaultSelect(null);
    }
  };

  return (
    <TTPopperContainer
      padding={theme.spacing(0, theme.ttSpacings.popper.px / 2)}
    >
      <FilterSearchTextField
        value={searchDesc}
        onChange={handleSearchChange}
        onClear={handleSearchClear}
        placeholder={searchPlaceholder}
      />
      {filteredItemList.length === 0 ? (
        <Typography
          color="primary.light"
          textAlign={"center"}
          variant="subtitle2"
          margin={theme.spacing(2)}
        >
          No matching items
        </Typography>
      ) : (
        <Box maxHeight={"380px"} overflow={"scroll"}>
          {renderDefault
            ? renderDefault()
            : defaultText && (
                <CheckboxListItem
                  showSelected={true}
                  value={defaultText}
                  itemText={defaultText}
                  checked={Boolean(defaultselected)}
                  onClick={handleDefaultClick}
                />
              )}
          <Stack
            mt={1}
            direction={"row"}
            px={theme.spacing(theme.ttSpacings.popper.px / 2)}
          >
            <ListFilterCaption>Tag</ListFilterCaption>
            <ListFilterCaptionButton
              ml="auto"
              color="secondary"
              onClick={handleAllClick}
            >
              All
            </ListFilterCaptionButton>
            <ListFilterCaptionButton
              ml={theme.spacing(1.5)}
              color="secondary"
              onClick={handleNoneClick}
            >
              None
            </ListFilterCaptionButton>
          </Stack>
          <CheckboxList
            showSelected={true}
            checkedList={checkedItemList}
            itemList={filteredItemList}
            setCheckedList={handleCheckedListChange}
            render={(values) =>
              renderListItem({
                ...values,
                onClick: () => {
                  if (clearListOnDefaultSelect) {
                    setDefaultSelect(null);
                  }
                  values.onClick();
                },
              })
            }
          />
        </Box>
      )}
    </TTPopperContainer>
  );
};

export default ListFilter;
