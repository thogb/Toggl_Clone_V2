import { listUtil } from "./listUtil";

const getDefaultTeamFilterData = () => {
  return {};
};

const getDefaultClientFilterData = () => {
  return {};
};

const getDefaultProjectFilterData = () => {
  return {
    defaultSelected: false,
    projects: [],
  };
};

const getDefaultTagFilterData = () => {
  return {
    defaultSelected: false,
    tags: [],
  };
};

const isTeamFilterDataDiffDefault = (teamFilterData) => {};

const isClientFilterDataDiffDefault = (clientFilterData) => {};

const isProjectFilterDataDiffDefault = (projectFilterData) => {
  const defaultData = getDefaultProjectFilterData();
  return (
    projectFilterData.defaultSelected !== defaultData.defaultSelected ||
    !listUtil.isListEqual(projectFilterData.projects, defaultData.projects)
  );
};

const isTagFilterDataDiffDefault = (tagFilterData) => {
  const defaultData = getDefaultTagFilterData();
  return (
    tagFilterData.defaultSelected !== defaultData.defaultSelected ||
    !listUtil.isListEqual(tagFilterData.tags, defaultData.tags)
  );
};

export const filterUtils = {
  getDefaultTeamFilterData,
  getDefaultClientFilterData,
  getDefaultProjectFilterData,
  getDefaultTagFilterData,

  isTeamFilterDataDiffDefault,
  isClientFilterDataDiffDefault,
  isProjectFilterDataDiffDefault,
  isTagFilterDataDiffDefault,
};
