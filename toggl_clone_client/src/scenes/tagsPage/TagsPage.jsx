import React, { useEffect, useMemo, useState } from "react";
import PageContainer from "../../components/pageContainer/PageContainer";
import TTAppbar, {
  TTAppbarActions,
  TTAppbarContent,
  TTAppbarMain,
  TTAppbarStart,
  TTAppbarTitle,
} from "../../components/ttAppbar/TTAppbar";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import SearchTextField from "../../components/searchTextField/SearchTextField";
import { useSelector } from "react-redux";
import TagEditButton from "./TagEditButton";
import {
  useDeleteTagMutation,
  useUpdateTagMutation,
} from "../../state/tagSlice";
import TagsCreateModal from "./TagsCreateModal";

const TagsPage = () => {
  const theme = useTheme();
  const [searchDesc, setSearchDesc] = useState("");
  const [openCreateTagDialog, setOpenCreateTagDialog] = useState(false);

  const workspace = useSelector((state) => state.workspaces.currentWorkspace);
  const allTags = useSelector((state) => state.tags.tags);

  const [deleteTag] = useDeleteTagMutation();
  const [updateTag] = useUpdateTagMutation();

  const tags = useMemo(
    () => allTags[workspace.id] ?? [],
    [workspace.id, allTags]
  );

  const [filteredTags, setFilteredTags] = useState(tags);

  useEffect(() => {
    const lowerSearchDesc = searchDesc.toLowerCase();
    setFilteredTags(
      tags.filter((tag) => tag.name.toLowerCase().includes(lowerSearchDesc))
    );
  }, [tags, searchDesc]);

  const handleOnSearchChange = (e) => {
    setSearchDesc(e.target.value);
  };

  const handleTagEdit = (tag, editData) => {
    const newTagName = editData.name;
    if (newTagName && newTagName !== tag.name) {
      updateTag({
        tagId: tag.id,
        workspaceId: workspace.id,
        tagName: newTagName,
        localData: { oldTagName: tag.name },
      });
      //   dispatch(
      //     tagActions.updateTag({
      //       tagId: tag.id,
      //       workspaceId: workspace.id,
      //       tagName: newTagName,
      //     })
      //   );
    }
  };

  const handleTagDelete = (tag) => {
    deleteTag({
      tagId: tag.id,
      workspaceId: workspace.id,
      localData: { tag: tag },
    });
    // dispatch(
    //   tagActions.removeTag({ tagId: tag.id, workspaceId: workspace.id })
    // );
  };

  return (
    <PageContainer>
      <TTAppbar>
        <TTAppbarMain>
          <TTAppbarStart>
            <TTAppbarTitle>Tags</TTAppbarTitle>
          </TTAppbarStart>
          <TTAppbarContent>
            <SearchTextField
              value={searchDesc}
              placeholder={"Find tags..."}
              onChange={handleOnSearchChange}
              onClear={() => setSearchDesc("")}
              style={{ padding: "4px" }}
            />
          </TTAppbarContent>
          <TTAppbarActions>
            <Button
              startIcon={<Add fontSize="small" />}
              variant="contained"
              color="secondary"
              onClick={() => setOpenCreateTagDialog(true)}
            >
              New tags
            </Button>
          </TTAppbarActions>
        </TTAppbarMain>
      </TTAppbar>
      <Box p={theme.ttSpacings.page.px}>
        <Typography mt={3} mb={2} variant="h6" fontSize={"0.875rem"}>
          All
        </Typography>
        <Divider />
        <Stack
          mt={2}
          minWidth={"720px"}
          width={"10%"}
          flexWrap={"wrap"}
          flexDirection={"row"}
          rowGap={2}
          columnGap={1}
        >
          {filteredTags.map((tag) => (
            <TagEditButton
              key={tag.id}
              tag={tag}
              onEdit={handleTagEdit}
              onDelete={handleTagDelete}
            />
          ))}
          {filteredTags.length === 0 && <Typography>No Tags Found</Typography>}
        </Stack>
      </Box>
      <TagsCreateModal
        open={openCreateTagDialog}
        workspaceId={workspace.id}
        tags={tags}
        onClose={() => setOpenCreateTagDialog(false)}
      />
    </PageContainer>
  );
};

export default TagsPage;
