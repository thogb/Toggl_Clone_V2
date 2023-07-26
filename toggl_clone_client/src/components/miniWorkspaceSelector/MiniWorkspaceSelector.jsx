import React from "react";
import TTPopper from "../ttPopper/TTPopper";
import TTPopperContainer from "../ttPopper/TTPopperContainer";
import TTPopperButton from "../ttPopper/TTPopperButton";
import { Work } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";

const MiniWorkspaceSelector = ({
  size = "sm",
  anchorEl,

  workspaces = [],
  currentWorkspace,

  onClose,
  onComplete,
  ...others
}) => {
  const theme = useTheme();

  const handleSelection = (workspace) => {
    if (onComplete) onComplete(workspace);
    onClose();
  };

  return (
    <TTPopper size={size} anchorEl={anchorEl} onClose={onClose} {...others}>
      <TTPopperContainer padding={theme.spacing(1 / 2)}>
        {workspaces.map((workspace) => (
          <TTPopperButton
            key={workspace.id}
            selected={currentWorkspace.id === workspace.id}
            onClick={() => handleSelection(workspace)}
          >
            <Work fontSize="small" />
            <Typography variant="subtitle2" ml={1}>
              {workspace.name}
            </Typography>
          </TTPopperButton>
        ))}
      </TTPopperContainer>
    </TTPopper>
  );
};

export default MiniWorkspaceSelector;
