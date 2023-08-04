import React, { memo, useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import ProjectsFilter from "../../components/filters/ProjectsFilter";
import ClientsFilter from "../../components/filters/ClientsFilter";
import TeamFilter from "../../components/filters/TeamFilter";
import DescriptionFilter from "../../components/filters/DescriptionFilter";
import FilterGroup from "../../components/filters/FilterGroup";
import { reportsPageActions } from "../../state/reportsPageSlice";
import { filterUtils } from "../../utils/filtersUtil";

const ReportsAppbar = ({ onActualFilterChange }) => {
  const currentWorkspace = useSelector(
    (state) => state.workspaces.currentWorkspace
  );
  const teamFilterData = useSelector(
    (state) => state.reportsPage.TeamFilterData
  );
  const clientFilterData = useSelector(
    (state) => state.reportsPage.clientFilterData
  );
  const projectFilterData = useSelector(
    (state) => state.reportsPage.projectFilterData
  );
  const tagFilterData = useSelector((state) => state.reportsPage.tagFilterData);
  const descriptionFilter = useSelector(
    (state) => state.reportsPage.descriptionFilter
  );

  const dispatch = useDispatch();

  const location = useLocation();
  const currPath = location.pathname
    .split(reportRoute.exactPath)[1]
    .split("/")[1];

  const teamFilterSelected = useMemo(
    () => filterUtils.isTeamFilterDataDiffDefault(teamFilterData),
    [teamFilterData]
  );

  const clientFilterSelected = useMemo(
    () => filterUtils.isClientFilterDataDiffDefault(clientFilterData),
    [clientFilterData]
  );

  const projectFilterSelected = useMemo(
    () => filterUtils.isProjectFilterDataDiffDefault(projectFilterData),
    [projectFilterData]
  );

  const tagFilterSelected = useMemo(
    () => filterUtils.isTagFilterDataDiffDefault(tagFilterData),
    [tagFilterData]
  );

  const descriptionFilterSelected =
    descriptionFilter === null || descriptionFilter !== "";

  const showClearButton =
    teamFilterSelected ||
    clientFilterSelected ||
    projectFilterSelected ||
    tagFilterSelected ||
    descriptionFilterSelected;

  const handleTeamFilterComplete = (teamFilterData) => {};

  const handleClientFilterComplete = (clientFilterData) => {};

  const handleProjectFilterComplete = (newProjectFilterData) => {
    if (
      filterUtils.isProjectFilterDataDiff(
        projectFilterData,
        newProjectFilterData
      )
    ) {
      dispatch(
        reportsPageActions.setProjectFilterData({
          projectFilterData: newProjectFilterData,
        })
      );
      if (onActualFilterChange) onActualFilterChange();
    }
  };

  const handleTagFilterComplete = (newTagFilterData) => {
    if (filterUtils.isTagFilterDataDiff(tagFilterData, newTagFilterData)) {
      dispatch(
        reportsPageActions.setTagFilterData({ tagFilterData: newTagFilterData })
      );
      if (onActualFilterChange) onActualFilterChange();
    }
  };

  const handleDescriptionFilterComplete = (descriptionFilterData) => {
    if (descriptionFilterData !== descriptionFilter) {
      dispatch(
        reportsPageActions.setDescriptionFilter({
          descriptionFilter: descriptionFilterData,
        })
      );
      if (onActualFilterChange) onActualFilterChange();
    }
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
        <FilterGroup
          showClearButton={showClearButton}
          onClearClick={() => dispatch(reportsPageActions.resetFilters())}
        >
          <TeamFilter
            workspaceId={currentWorkspace.id}
            selected={teamFilterSelected}
            onComplete={handleTeamFilterComplete}
          />
          <ClientsFilter
            workspaceId={currentWorkspace.id}
            selected={clientFilterSelected}
            onComplete={handleClientFilterComplete}
          />
          <ProjectsFilter
            workspaceId={currentWorkspace.id}
            selected={projectFilterSelected}
            projectFilterData={projectFilterData}
            onComplete={handleProjectFilterComplete}
          />
          <TagsFilter
            workspaceId={currentWorkspace.id}
            selected={tagFilterSelected}
            tagFilterData={tagFilterData}
            onComplete={handleTagFilterComplete}
          />
          <DescriptionFilter
            description={descriptionFilter}
            selected={descriptionFilterSelected}
            onComplete={handleDescriptionFilterComplete}
          />
        </FilterGroup>
      </TTAppbarTool>
    </TTAppbar>
  );
};

export default memo(ReportsAppbar);
