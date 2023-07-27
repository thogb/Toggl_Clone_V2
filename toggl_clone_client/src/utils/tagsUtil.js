const populateFromRaw = (state, rawTags) => {
  const tags = {};
  const tagNames = {};
  console.log("Rewriting tags");
  for (let tag of rawTags) {
    if (!tags[tag.workspaceId]) {
      tags[tag.workspaceId] = [];
    }
    tags[tag.workspaceId].push(tag);
    if (!tagNames[tag.workspaceId]) {
      tagNames[tag.workspaceId] = [];
    }
    tagNames[tag.workspaceId].push(tag.name);
  }
  state.tags = tags;
  state.tagNames = tagNames;
};

const addTag = (state, tag) => {
  const workspaceId = tag.workspaceId;
  if (!state.tags[workspaceId]) {
    state.tags[workspaceId] = [];
  }
  if (!state.tagNames[workspaceId]) {
    state.tagNames[workspaceId] = [];
  }
  const tags = state.tags[workspaceId];
  const tagNames = state.tagNames[workspaceId];
  tags.push(tag);
  tagNames.push(tag.name);
  tags.sort();
  tagNames.sort();
};

const removeTag = (state, tagId, workspaceId) => {
  const tags = state.tags[workspaceId];
  const tagNames = state.tagNames[workspaceId];
  const index = tags.findIndex((tag) => tag.id === tagId);
  const tag = tags[index];
  tags.splice(index, 1);
  tagNames.splice(
    tagNames.findIndex((tagName) => tagName === tag.name),
    1
  );
};

const updateTag = (state, tagId, workspaceId, name) => {
  const tags = state.tags[workspaceId];
  const tagNames = state.tagNames[workspaceId];
  const index = tags.findIndex((tag) => tag.id === tagId);
  const tag = tags[index];
  tag.name = name;
  tagNames[tagNames.findIndex((tagName) => tagName === tag.name)] = name;
  tags.sort();
  tagNames.sort();
};

export const tagsUtil = {
  populateFromRaw,
  addTag,
  removeTag,
  updateTag,
};
