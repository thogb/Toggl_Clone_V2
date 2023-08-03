import React from "react";
import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TTIconButton from "../ttIconButton/TTIconButton";

const StyledTextField = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid",
  borderColor: grey[500],
  padding: theme.spacing(0, 0.75),
  borderRadius: "8px",

  "& .SearchTextField-startAdornment": {
    marginRight: theme.spacing(1),
  },

  "& .SearchTextField-endAdornment": {
    marginLeft: theme.spacing(0.75),
  },

  "& input.MuiInputBase-input": {
    fontSize: "0.9rem",
    padding: theme.spacing(0.5, 0),

    "&::placeholder": {
      opacity: 0.8,
    },
  },

  "&:focus-within": {
    backgroundColor: grey[200],
    borderColor: grey[200],

    "& > .SearchTextField-startAdornment": {
      color: theme.palette.secondary.main,
    },
  },
}));

const Adornment = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchTextField = ({
  startAdornment,
  value,
  onBlur,
  onChange,
  clearOn = true,
  onClear,
  autoFocus = true,
  placeholder,
  style,
  inputProps,
  ...others
}) => {
  const handleClose = () => {
    if (onClear) onClear();
  };

  const showClearButton = clearOn && value !== "";

  return (
    <StyledTextField style={style} {...others}>
      <Adornment className="SearchTextField-startAdornment">
        {startAdornment ?? <SearchIcon fontSize="small" />}
      </Adornment>
      <InputBase
        autoFocus={autoFocus}
        fullWidth
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        {...inputProps}
      />
      <Adornment
        className="SearchTextField-endAdornment SearchTextField-closeIconButton"
        style={{ visibility: showClearButton ? "visible" : "hidden" }}
      >
        <TTIconButton padding={0} onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </TTIconButton>
      </Adornment>
    </StyledTextField>
  );
};

export default SearchTextField;
