import React, { useState } from "react";
import TTPopper from "../ttPopper/TTPopper";
import TTPopperContainer from "../ttPopper/TTPopperContainer";
import TTPopperButton from "../ttPopper/TTPopperButton";
import { Work } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import SearchTextField from "../searchTextField/SearchTextField";

const MiniWorkspaceSelector = ({
  size = "sm",
  anchorEl,

  disableSearch = false,
  workspaces = [],
  currentWorkspace,

  onClose,
  onComplete,
  ...others
}) => {
  const theme = useTheme();
  const [searchDesc, setSearchDesc] = useState("");

  const handleSelection = (workspace) => {
    if (onComplete) onComplete(workspace);
    onClose();
  };

  const handleSerachDescChange = (e) => {
    setSearchDesc(e.target.value);
  };

  return (
    <TTPopper size={size} anchorEl={anchorEl} onClose={onClose} {...others}>
      <TTPopperContainer padding={theme.spacing(1)}>
        {!disableSearch && (
          <SearchTextField
            value={searchDesc}
            autoFocus={false}
            onChange={handleSerachDescChange}
            onClear={() => setSearchDesc("")}
            style={{
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(2),
              width: "100%",
            }}
          />
        )}
        {workspaces.map((workspace) =>
          !searchDesc ||
          workspace.name.toLowerCase().includes(searchDesc.toLowerCase()) ? (
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
          ) : null
        )}
      </TTPopperContainer>
    </TTPopper>
  );
};

export default MiniWorkspaceSelector;
