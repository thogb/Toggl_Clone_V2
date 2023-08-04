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

const isTeamFilterDataDiff = (teamFilterDataA, teamFilterDataB) => {};

const isTeamFilterDataDiffDefault = (teamFilterData) => {
  return isTeamFilterDataDiff(getDefaultTeamFilterData(), teamFilterData);
};

const isClientFilterDataDiff = (clientFilterDataA, clientFilterDataB) => {};

const isClientFilterDataDiffDefault = (clientFilterData) => {
  return isClientFilterDataDiff(getDefaultClientFilterData(), clientFilterData);
};

const isProjectFilterDataDiff = (projectFilterDataA, projectFilterDataB) => {
  return (
    projectFilterDataA.defaultSelected !== projectFilterDataB.defaultSelected ||
    !listUtil.isListEqual(
      projectFilterDataA.projects,
      projectFilterDataB.projects
    )
  );
};

const isProjectFilterDataDiffDefault = (projectFilterData) => {
  return isProjectFilterDataDiff(
    getDefaultProjectFilterData(),
    projectFilterData
  );
};

const isTagFilterDataDiff = (tagFilterDataA, tagFilterDataB) => {
  return (
    tagFilterDataA.defaultSelected !== tagFilterDataB.defaultSelected ||
    !listUtil.isListEqual(tagFilterDataA.tags, tagFilterDataB.tags)
  );
};

const isTagFilterDataDiffDefault = (tagFilterData) => {
  return isTagFilterDataDiff(getDefaultTagFilterData(), tagFilterData);
};

export const filterUtils = {
  getDefaultTeamFilterData,
  getDefaultClientFilterData,
  getDefaultProjectFilterData,
  getDefaultTagFilterData,

  isTeamFilterDataDiff,
  isClientFilterDataDiff,
  isTeamFilterDataDiffDefault,
  isProjectFilterDataDiff,
  isClientFilterDataDiffDefault,
  isTagFilterDataDiff,
  isProjectFilterDataDiffDefault,
  isTagFilterDataDiffDefault,
};
