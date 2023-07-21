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
  return ids.map((id) => `id=${id}`).join("&");
};
