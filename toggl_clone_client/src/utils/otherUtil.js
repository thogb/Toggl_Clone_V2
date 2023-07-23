export const isEmailValid = (email) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
};

export const groupObj = (objs, groupKey) => {
  const res = {};
  for (let obj of objs) {
    if (!res[obj[groupKey]]) {
      res[obj[groupKey]] = [];
    }
    res[obj[groupKey]].push(obj);
  }
  return res;
};

export const generateApiBatchIdString = (ids) => {
  // return ids.map((id) => `id=${id}`).join("&");
  return ids.join(",");
};

export const findCommonValueInObjs = (objs, key) => {
  if (!objs?.length || objs?.length <= 0) return null;
  const common = objs[0][key];
  for (let obj of objs) {
    if (obj[key] !== common) return null;
  }
  return common;
};
