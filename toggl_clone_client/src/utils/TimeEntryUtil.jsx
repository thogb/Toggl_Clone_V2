// Assumes tags are all sorted in order
export const isTagDescriptionEqual = (a, b) => {
  return a.description === b.description && isListEqual(a.tags, b.tags);
};

export const isInnerGroupEqual = (a, b) => {
  return isTagDescriptionEqual(a, b) && a.projectId === b.projectId;
};

// From: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
export const isListEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
