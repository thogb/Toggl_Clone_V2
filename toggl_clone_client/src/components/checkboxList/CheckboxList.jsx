import { List, Typography } from "@mui/material";
import React from "react";
import CheckboxListItem from "./CheckboxListItem";

const CheckboxList = ({ itemList, checkedList, setCheckedList }) => {
  const handleToggle = (value) => () => {
    const currentIndex = checkedList.indexOf(value);
    const newChecked = [...checkedList];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedList(newChecked);
  };

  if (itemList.length <= 0) {
    return (
      <Typography m={2} textAlign={"center"}>
        There aren't any items.
      </Typography>
    );
  }

  return (
    <List>
      {itemList.map((value) => (
        <CheckboxListItem
          key={value}
          value={value}
          onClick={handleToggle(value)}
          itemText={value}
          checked={checkedList.indexOf(value) !== -1}
        />
      ))}
    </List>
  );
};

export default CheckboxList;
