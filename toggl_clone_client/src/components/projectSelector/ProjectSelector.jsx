import React, { useState } from "react";
import TTPopper, { popperClassNames } from "../ttPopper/TTPopper";
import TTPopperContainer from "../ttPopper/TTPopperContainer";
import SearchTextField from "../searchTextField/SearchTextField";
import { useTheme } from "@emotion/react";
import StackBetween from "../stackBetween/StackBetween";
import { ChevronRight, Folder, Work } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import SubButton from "../subButton/SubButton";
import TTPopperButton from "../ttPopper/TTPopperButton";
import styled from "@emotion/styled";

const ChangeWorkspace = styled("div")(({ theme }) => ({
  padding: theme.spacing(1 / 2, 1),
  display: "flex",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ProjectSelector = ({
  anchorEl = null,

  currentWorkspace,
  workspaces,
  projects,

  onClose,
  onSelectionComplete,
  ...others
}) => {
  const theme = useTheme();

  const [searchDesc, setSearchDesc] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState(currentWorkspace);
  const [workspaceAnchorEl, setWorkspaceAnchorEl] = useState(null);

  const handleProjectSeletion = (project) => {
    if (onSelectionComplete) onSelectionComplete(project);
    onClose();
  };

  const handleMenuMouseEnter = (e) => {
    setWorkspaceAnchorEl(e.currentTarget);
  };

  const handleMenuMouseLeave = () => {
    setWorkspaceAnchorEl(null);
  };

  const handleSearchClear = () => {
    setSearchDesc("");
  };

  const handleSearchChange = (e) => {
    setSearchDesc(e.target.value);
  };

  const handleWorkspaceSelect = (workspace) => {
    setSelectedWorkspace(workspace);
    handleMenuMouseLeave();
  };

  return (
    <TTPopper size="xl" anchorEl={anchorEl} onClose={onClose} offset={[220, 8]}>
      <TTPopperContainer
        padding={theme.spacing(0, 3 / 4)}
        style={{ color: theme.palette.primary.light }}
      >
        <SearchTextField
          className={popperClassNames.padding}
          value={searchDesc}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          style={{
            margin: theme.spacing(theme.ttSpacings.popper.px),
            marginBottom: theme.spacing(theme.ttSpacings.popper.px / 2),
          }}
        />
        <StackBetween px={1} py={1}>
          <Work fontSize="small" />
          <Typography ml={1} variant="subtitle2" mr={"auto"}>
            {selectedWorkspace?.name}
          </Typography>
          <ChangeWorkspace
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <Typography variant="subtitle2" style={{ opacity: 0.6 }}>
              Change
            </Typography>
            <ChevronRight style={{ fontSize: "1.1rem", opacity: 0.6 }} />
            <TTPopper
              disableBackDrop={true}
              anchorEl={workspaceAnchorEl}
              onClose={handleMenuMouseLeave}
              placement={"bottom"}
              offset={[0, 0]}
              size="sm"
            >
              <TTPopperContainer padding={theme.spacing(1 / 2)}>
                {workspaces.map((workspace) => (
                  <TTPopperButton
                    key={workspace.id}
                    selected={selectedWorkspace.id === workspace.id}
                    onClick={() => handleWorkspaceSelect(workspace)}
                  >
                    <Work fontSize="small" />
                    <Typography variant="subtitle2" ml={1}>
                      {workspace.name}
                    </Typography>
                  </TTPopperButton>
                ))}
              </TTPopperContainer>
            </TTPopper>
          </ChangeWorkspace>
        </StackBetween>
        <Box width={1} height={200}></Box>
      </TTPopperContainer>
    </TTPopper>
  );
};

export default ProjectSelector;
