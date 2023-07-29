import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const withSelectorPW =
  (Component) =>
  ({
    // dateGroupId,
    // gId,

    timeEntry,
    // isChildrenOfGroup = false,

    // checked = false,
    // timeEntryChecked,
    // timeEntryCheckedDispatch,
    ...others
  }) => {
    const projects = useSelector((state) => state.projects.projects);
    const workspaces = useSelector((state) => state.workspaces.workspaces);

    const workspaceId = timeEntry.workspaceId;
    const projectId = timeEntry.projectId;

    const workspace = useMemo(() => {
      let found = null;
      for (let workspaceList of Object.values(workspaces)) {
        found = workspaceList.find((w) => w.id === workspaceId);
        if (found) break;
      }
      return found;
    }, [workspaceId]);

    const project = useMemo(() => {
      if (projectId && workspaceId) {
        return projects[workspaceId].find(
          (project) => project.id === projectId
        );
      }
    }, [projectId]);

    return (
      <Component
        timeEntry={timeEntry}
        project={project}
        workspace={workspace}
        projects={projects}
        {...others}
      />
    );
  };

export default withSelectorPW;
