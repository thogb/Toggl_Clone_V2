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
import { Button } from "@mui/material";
import { GetApp, Save } from "@mui/icons-material";
import { reportRoute } from "../../routes/Routes";
import { useLocation } from "react-router-dom";
import TagsFilter from "../../components/filters/TagsFilter";
import { useSelector } from "react-redux";
import ProjectsFilter from "../../components/filters/ProjectsFilter";
import ClientsFilter from "../../components/filters/ClientsFilter";
import TeamFilter from "../../components/filters/TeamFilter";
import DescriptionFilter from "../../components/filters/DescriptionFilter";
import FilterGroup from "../../components/filters/FilterGroup";

const ReportsAppbar = ({ onActualFilterChange }) => {
  const currentWorkspace = useSelector(
    (state) => state.workspaces.currentWorkspace
  );

  const location = useLocation();
  const currPath = location.pathname
    .split(reportRoute.exactPath)[1]
    .split("/")[1];

  const handleTeamFilterComplete = (teamFilterData) => {};

  const handleProjectFilterComplete = (projectFilterData) => {
    if (onActualFilterChange) onActualFilterChange();
  };

  const handleClientFilterComplete = (clientFilterData) => {};

  const handleTagFilterComplete = (tagFilterData) => {
    if (onActualFilterChange) onActualFilterChange();
  };

  const handleDescriptionFilterComplete = (descriptionFilterData) => {
    if (onActualFilterChange) onActualFilterChange();
  };

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
        <FilterGroup>
          <TeamFilter
            workspaceId={currentWorkspace.id}
            onComplete={handleTeamFilterComplete}
          />
          <ClientsFilter
            workspaceId={currentWorkspace.id}
            onComplete={handleClientFilterComplete}
          />
          <ProjectsFilter
            workspaceId={currentWorkspace.id}
            onComplete={handleProjectFilterComplete}
          />
          <TagsFilter
            workspaceId={currentWorkspace.id}
            onComplete={handleTagFilterComplete}
          />
          <DescriptionFilter onComplete={handleDescriptionFilterComplete} />
        </FilterGroup>
      </TTAppbarTool>
    </TTAppbar>
  );
};

export default ReportsAppbar;
