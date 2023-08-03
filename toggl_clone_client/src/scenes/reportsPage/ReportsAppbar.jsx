import React from "react";
import TTAppbar, {
  TTAppbarActions,
  TTAppbarContent,
  TTAppbarLink,
  TTAppbarMain,
  TTAppbarStart,
  TTAppbarTitle,
  TTAppbarTool,
} from "../../components/ttAppbar/TTAppbar";
import { Button, Typography } from "@mui/material";
import { GetApp, LocalOffer, Save } from "@mui/icons-material";
import { reportRoute } from "../../routes/Routes";
import { useLocation } from "react-router-dom";
import TagsFilter from "../../components/filters/TagsFilter";
import { FilterButton } from "../../components/filters/FilterButton";
import { useSelector } from "react-redux";
import ProjectFilter from "../../components/filters/ProjectFilter";

const ReportsAppbar = () => {
  const currentWorkspace = useSelector(
    (state) => state.workspaces.currentWorkspace
  );

  const location = useLocation();
  const currPath = location.pathname
    .split(reportRoute.exactPath)[1]
    .split("/")[1];
  return (
    <TTAppbar>
      <TTAppbarMain>
        <TTAppbarStart>
          <TTAppbarTitle>Reports</TTAppbarTitle>
        </TTAppbarStart>
        <TTAppbarContent>
          {reportRoute.routes.map((route) => (
            <TTAppbarLink
              key={route.name}
              className={route.path === currPath ? "TT-selected" : ""}
              to={`${reportRoute.exactPath}/${route.path}`}
            >
              {route.name}
            </TTAppbarLink>
          ))}
        </TTAppbarContent>
        <TTAppbarActions>
          <Button
            startIcon={<Save />}
            disabled
            color="secondary"
            variant="contained"
          >
            Save & share
          </Button>
          <Button startIcon={<GetApp />} color="secondary" variant="contained">
            Export
          </Button>
        </TTAppbarActions>
      </TTAppbarMain>
      <TTAppbarTool>
        <TagsFilter workspaceId={currentWorkspace.id} />
        <ProjectFilter workspaceId={currentWorkspace.id} />
      </TTAppbarTool>
    </TTAppbar>
  );
};

export default ReportsAppbar;
