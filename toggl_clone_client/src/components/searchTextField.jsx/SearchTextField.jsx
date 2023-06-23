import React from "react";
import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";

const StyledTextField = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid",
  borderColor: grey[600],
  padding: theme.spacing(0, 0.75),
  borderRadius: "8px",

  "& input": {
    fontSize: "1rem",
  },

  "&:focus-within": {
    backgroundColor: grey[200],
    borderColor: grey[200],

    "& > .SearchTextField-startAdornment": {
      color: theme.palette.secondary.main,
    },
  },
}));

const StartAdornment = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1),
}));

const SearchTextField = ({ startAdornment, value, onChange }) => {
  return (
    <StyledTextField>
      <StartAdornment className="SearchTextField-startAdornment">
        {startAdornment ?? <SearchIcon fontSize="small" />}
      </StartAdornment>
      <InputBase fullWidth value={value} onChange={onChange}></InputBase>
    </StyledTextField>
  );
};

export default SearchTextField;
