import { MoreVert } from "@mui/icons-material";
import { InputBase, alpha, styled } from "@mui/material";
import React, { useState } from "react";
import { TTMenu } from "../../components/ttMenu/TTMenu";
import { TTMenuItem } from "../../components/ttMenu/TTMenuItem";

const maxWidth = 200;

const ButtonContainer = styled("div")(({ theme }) => ({
  border: "1px sp",

  "& .ButtonContainer-container": {
    border: "1px solid",
    borderColor: alpha(theme.palette.primary.main, 0.2),
    borderRadius: "5px",
    padding: "0px 7px",
    height: "36px",
    color: theme.palette.primary.main,
    fontSize: "0.875rem",
    fontWeight: "400",
    maxWidth: maxWidth,
  },
}));

const TagButton = styled("div")(({ theme }) => ({
  border: "none",
  backgroundColor: "transparent",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  fontSize: "inherit",

  "&>span": {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    minWidth: 0,
  },

  "&:hover": {
    borderColor: alpha(theme.palette.primary.main, 0.06),
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
}));

const VerticalButon = styled("button")(({ theme }) => ({
  border: "none",
  padding: 0,
  backgroundColor: "transparent",
  width: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  alignSelf: "stretch",

  "&:hover,&.TTPopper-open": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TagEditInput = styled(InputBase)(({ theme }) => ({
  width: maxWidth,
  minWidth: maxWidth,
  fontSize: "inherit",

  "&>input": {
    padding: 0,
  },
}));

const TagEditButton = ({ tag, onDelete, onEdit }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleTagNameBlur = (e) => {
    setEditMode(false);
    if (onEdit) onEdit(tag, { name: e.target.value.trim() });
  };

  const handleTagClick = (e) => {
    setMenuAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditMode(true);
    closeMenu();
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(tag);
    closeMenu();
  };

  return (
    <ButtonContainer>
      {editMode ? (
        <TagEditInput
          autoFocus
          defaultValue={tag.name}
          className="ButtonContainer-container"
          //   value={tagName}
          //   onChange={handleTagNameEdit}
          onBlur={handleTagNameBlur}
        />
      ) : (
        <TagButton
          className="ButtonContainer-container"
          onClick={handleTagClick}
        >
          <span>{tag.name}</span>
          <VerticalButon className={menuAnchorEl ? "TTPopper-open" : null}>
            <MoreVert />
          </VerticalButon>
        </TagButton>
      )}
      {menuAnchorEl && (
        <TTMenu
          open={Boolean(menuAnchorEl)}
          anchorEl={menuAnchorEl}
          onClose={closeMenu}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              style: {
                minWidth: "120px",
                transform: "translate(-20px, 10px)",
              },
            },
          }}
        >
          <TTMenuItem onClick={handleEditClick}>Edit</TTMenuItem>
          <TTMenuItem onClick={handleDeleteClick} style={{ color: "red" }}>
            Delete
          </TTMenuItem>
        </TTMenu>
      )}
    </ButtonContainer>
  );
};

export default TagEditButton;
