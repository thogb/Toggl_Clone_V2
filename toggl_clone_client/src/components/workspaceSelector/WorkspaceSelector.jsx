import React, { useEffect, useState } from "react";
import TTPopper, { popperClassNames } from "../ttPopper/TTPopper";
import TTPopperContainer from "../ttPopper/TTPopperContainer";
import SearchTextField from "../searchTextField/SearchTextField";
import { useTheme } from "@emotion/react";
import StackBetween from "../stackBetween/StackBetween";
import { TTPopperHeading } from "../ttPopper/TTPopperHeading";
import TTPopperDivider from "../ttPopper/TTPopperDivider";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Typography, alpha } from "@mui/material";
import TTPopperButton from "../ttPopper/TTPopperButton";
import WorkIcon from "@mui/icons-material/Work";
import { Box, Stack } from "@mui/system";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { TTMenu } from "../ttMenu/TTMenu";
import { TTMenuItem } from "../ttMenu/TTMenuItem";
import AddIcon from "@mui/icons-material/Add";

const ManageWorkspaceLink = styled(Link)(({ theme }) => ({
  textAlign: "center",
  textDecoration: "none",
  ...theme.typography.subtitle2,
  padding: theme.spacing(1),
  color: alpha(theme.palette.primary.main, 0.8),
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const CreateOrganisationLink = styled(Link)(({ theme }) => ({
  textAlign: "center",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...theme.typography.subtitle2,
  padding: theme.spacing(1),
  color: alpha(theme.palette.primary.main, 0.8),
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const WorkspacePopper = styled(TTPopper)(({ theme }) => ({
  "& .TT-PopperButton:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.2),
  },
}));

const WorkspaceSelector = ({
  anchorEl = null,
  onClose,
  onSelectionComplete,
  workspaces,
  currentWorkspace,
  organisations,
  currentOrganisation,
  ...others
}) => {
  const theme = useTheme();

  const [searchDesc, setSearchDesc] = useState("");
  const [orgAnchorEl, setOrgAnchorEl] = useState(null);
  const [selectedOrganisation, setSelectedOrganisation] =
    useState(currentOrganisation);
  const [selectedWorkspace, setSelectedWorkspace] = useState(currentWorkspace);

  const handleSearchDescChange = (e) => {
    setSearchDesc(e.target.value);
  };

  const handleOrgHover = (e) => {
    setOrgAnchorEl(e.currentTarget);
  };

  const handleOrgLeave = (e) => {
    setOrgAnchorEl(null);
  };

  const handleOrganisationSelect = (org) => {
    setSelectedOrganisation(org);
    setSelectedWorkspace(workspaces[org.id][0]);
    setOrgAnchorEl(null);
  };

  const handleWorkspaceSelect = (workspace) => {
    setSelectedWorkspace(workspace);
    onClose();
    if (onSelectionComplete) {
      onSelectionComplete(getSelectionData());
    }
  };

  const handleClose = () => {
    onClose();
    if (onSelectionComplete) {
      onSelectionComplete(getSelectionData());
    }
  };

  const getSelectionData = () => {
    return {
      organisation: selectedOrganisation,
      organisationId: selectedOrganisation.id,
      workspaceId: selectedWorkspace.id,
      workspace: selectedWorkspace,
    };
  };

  return (
    <WorkspacePopper anchorEl={anchorEl} onClose={handleClose} {...others}>
      <TTPopperContainer padding={"0px 4px"}>
        <SearchTextField
          placeholder={"Find workspaces..."}
          value={searchDesc}
          onChange={handleSearchDescChange}
          onClear={() => setSearchDesc("")}
          style={{
            margin: theme.spacing(theme.ttSpacings.popper.px),
            marginBottom: theme.spacing(1),
          }}
        />
        <StackBetween className={popperClassNames.padding}>
          <TTPopperHeading mr={2}>Organisation</TTPopperHeading>
          <div
            style={{
              marginRight: theme.spacing(theme.ttSpacings.popper.px * -1),
              paddingRight: theme.spacing(theme.ttSpacings.popper.px),
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              minWidth: 0,
              cursor: "pointer",
            }}
            onMouseEnter={handleOrgHover}
            onMouseLeave={handleOrgLeave}
          >
            <Typography
              ml={"auto"}
              variant="subtitle2"
              noWrap
              fontWeight={"normal"}
            >
              {selectedOrganisation?.name}
            </Typography>
            <KeyboardArrowRightIcon sx={{ fontSize: "0.75rem" }} />
            <TTPopper
              size="sm"
              placement={"right-start"}
              offset={[0, 0]}
              anchorEl={orgAnchorEl}
              disableBackDrop={true}
              //   onMouseLeave={handleOrgLeave}
            >
              <TTPopperContainer padding={theme.spacing(1 / 2)}>
                {organisations.map((org) => (
                  <TTPopperButton
                    key={org.id}
                    selected={org.id === selectedOrganisation.id}
                    onClick={() => handleOrganisationSelect(org)}
                  >
                    <WorkIcon />{" "}
                    <Typography
                      ml={1}
                      variant="subtitle2"
                      fontWeight={"normal"}
                    >
                      {org.name}
                    </Typography>
                  </TTPopperButton>
                ))}
              </TTPopperContainer>
              <TTPopperDivider />
              <CreateOrganisationLink>
                <AddIcon
                  fontSize="small"
                  sx={{ mr: 1, color: theme.palette.secondary.main }}
                />{" "}
                Create Organisation
              </CreateOrganisationLink>
            </TTPopper>
          </div>
        </StackBetween>
        <TTPopperDivider />
        <StackBetween className={popperClassNames.padding}>
          <TTPopperHeading>Workspaces</TTPopperHeading>
        </StackBetween>
        <Box py={1 / 2}>
          {workspaces[selectedOrganisation.id].map((workspace) =>
            !searchDesc ||
            workspace.name.toLowerCase().includes(searchDesc.toLowerCase()) ? (
              <TTPopperButton
                key={workspace.id}
                startIcon={<WorkIcon />}
                selected={selectedWorkspace.id === workspace.id}
                onClick={() => handleWorkspaceSelect(workspace)}
              >
                {workspace.name}
              </TTPopperButton>
            ) : null
          )}
        </Box>
        <TTPopperDivider />
        <ManageWorkspaceLink>Manage Workspaces</ManageWorkspaceLink>
      </TTPopperContainer>
    </WorkspacePopper>
  );
};

export default WorkspaceSelector;
