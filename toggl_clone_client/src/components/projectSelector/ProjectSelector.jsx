import React, { useEffect, useState } from "react";
import TTPopper, { popperClassNames } from "../ttPopper/TTPopper";
import TTPopperContainer from "../ttPopper/TTPopperContainer";
import SearchTextField from "../searchTextField/SearchTextField";
import { useTheme } from "@emotion/react";
import StackBetween from "../stackBetween/StackBetween";
import { Add, ChevronRight, Work } from "@mui/icons-material";
import { Box, Typography, alpha } from "@mui/material";
import SubButton from "../subButton/SubButton";
import styled from "@emotion/styled";
import TTPopperDivider from "../ttPopper/TTPopperDivider";
import ProjectMessage from "./ProjectMessage";
import ProjectButton from "./ProjectButton";
import { TTPopperHeading } from "../ttPopper/TTPopperHeading";
import CreateProjectModal from "../createProjectModal/CreateProjectModal";
import MiniWorkspaceSelector from "../miniWorkspaceSelector/MiniWorkspaceSelector";

const CreateProjectButton = styled(SubButton)(({ theme }) => ({
  borderRadius: 0,
}));

const ChangeWorkspace = styled("div")(({ theme }) => ({
  padding: theme.spacing(1 / 2, 1),
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
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
  currentProjectId,

  onClose,
  onSelectionComplete,
  ...others
}) => {
  const theme = useTheme();

  const [searchDesc, setSearchDesc] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState(currentWorkspace);
  const [workspaceAnchorEl, setWorkspaceAnchorEl] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (searchDesc) {
      const lowerSearchDesc = searchDesc.toLowerCase();
      const filtered = {};
      Object.keys(projects).forEach((workspaceId) => {
        const filteredList = projects[workspaceId].filter((project) =>
          project.name.toLowerCase().includes(lowerSearchDesc)
        );
        if (filteredList.length > 0) {
          filtered[workspaceId] = filteredList;
        }
      });
      setFilteredProjects(filtered);
    }
  }, [searchDesc]);

  const handleProjectSeletion = (project) => {
    if (onSelectionComplete) onSelectionComplete({ project: project });
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

  const handleProjectButtonClick = (e) => {
    setOpenModal(true);
  };

  const handleProjectModalClose = () => {
    setOpenModal(false);
    onClose();
  };

  const handleProjectModalComplete = (project) => {
    if (onSelectionComplete) onSelectionComplete({ project: project });
  };

  const renderWorkspaceTitle = (workspaceName) => (
    <StackBetween alignItems={"center"}>
      <Work fontSize="small" />
      <Typography
        display={"flex"}
        spacing={2}
        alignItems={"center"}
        ml={1}
        variant="subtitle2"
        mr={"auto"}
        component={"span"}
      >
        {workspaceName}
      </Typography>
    </StackBetween>
  );

  const renderProjectList = (projects, workspaceId, currentProjectId) => {
    return projects[workspaceId].map((project) => (
      <ProjectButton
        key={project.id}
        color={project.colour}
        name={project.name}
        selected={currentProjectId === project.id}
        onClick={() => handleProjectSeletion(project, null)}
      />
    ));
  };

  return (
    <>
      <TTPopper
        size="xl"
        anchorEl={anchorEl}
        onClose={onClose}
        // offset={[220, 8]}
        {...others}
      >
        <TTPopperContainer
          padding={theme.spacing(0, theme.ttSpacings.popper.px / 2)}
          style={{ color: theme.palette.primary.light }}
        >
          {/* search textfield */}
          <SearchTextField
            placeholder={"Search by project, task or client"}
            className={popperClassNames.padding}
            value={searchDesc}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            style={{
              margin: theme.spacing(2.5, theme.ttSpacings.popper.px / 2),
            }}
          />
          {/* show searched projects */}
          {searchDesc ? (
            Object.keys(filteredProjects).length > 0 ? (
              <>
                {Object.keys(filteredProjects).map((workspaceId) => {
                  const intWorkspaceId = Number(workspaceId);
                  return (
                    <Box key={workspaceId} py={1}>
                      <Box px={theme.ttSpacings.popper.px / 2}>
                        {renderWorkspaceTitle(
                          workspaces.find((w) => w.id === intWorkspaceId).name
                        )}
                        <TTPopperDivider spacing={8} />
                      </Box>
                      {renderProjectList(
                        filteredProjects,
                        workspaceId,
                        currentProjectId
                      )}
                    </Box>
                  );
                })}
              </>
            ) : (
              // No projects found in search message
              <ProjectMessage
                title={"No matching projects"}
                description={
                  "Try a different keyword or press Ctrl+Enter to create a new project."
                }
              />
            )
          ) : (
            // Show current workspace projects
            <>
              <StackBetween px={1}>
                {renderWorkspaceTitle(selectedWorkspace?.name)}
                <ChangeWorkspace
                  onMouseEnter={handleMenuMouseEnter}
                  onMouseLeave={handleMenuMouseLeave}
                >
                  <Typography
                    variant="subtitle2"
                    style={{ opacity: 0.6 }}
                    component={"span"}
                  >
                    Change
                  </Typography>
                  <ChevronRight style={{ fontSize: "1.1rem", opacity: 0.6 }} />
                  <MiniWorkspaceSelector
                    disableBackDrop={true}
                    disableSearch={true}
                    anchorEl={workspaceAnchorEl}
                    onClose={handleMenuMouseLeave}
                    placement={"bottom"}
                    offset={[0, 0]}
                    size="sm"
                    workspaces={workspaces}
                    currentWorkspace={selectedWorkspace}
                    onComplete={handleWorkspaceSelect}
                  />
                </ChangeWorkspace>
              </StackBetween>
              <TTPopperDivider spacing={2} />
              {projects[selectedWorkspace.id]?.length > 0 ? (
                <Box pb={1}>
                  <ProjectButton
                    selected={!currentProjectId}
                    color={alpha(theme.palette.primary.main, 0.6)}
                    name={"No Project"}
                    onClick={() => handleProjectSeletion({ id: null })}
                  />
                  <TTPopperHeading mb={1} mt={2} mx={theme.spacing(1)}>
                    No client
                  </TTPopperHeading>
                  {renderProjectList(
                    projects,
                    selectedWorkspace.id,
                    currentProjectId
                  )}
                </Box>
              ) : (
                <ProjectMessage
                  title={"There are no projects yet"}
                  description={
                    "Go ahead and create your first project for this workspace"
                  }
                />
              )}
            </>
          )}
        </TTPopperContainer>
        <TTPopperDivider />
        <CreateProjectButton onClick={handleProjectButtonClick}>
          <Add color="secondary" fontSize="small" />
          <Typography ml={1} variant="subtitle2" color={"primary"}>
            Create a new project
          </Typography>
        </CreateProjectButton>
      </TTPopper>
      {openModal && (
        <CreateProjectModal
          open={openModal}
          workspaces={workspaces}
          currentWorkspace={selectedWorkspace}
          onClose={handleProjectModalClose}
          onComplete={handleProjectModalComplete}
        />
      )}
    </>
  );
};

export default ProjectSelector;
