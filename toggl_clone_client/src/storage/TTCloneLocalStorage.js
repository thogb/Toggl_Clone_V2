export const localStorageKeys = {
  token: "ttCloneToken",
  user: "ttCloneUser",
};

const setToken = (token) => {
  localStorage.setItem(localStorageKeys.token, token);
};

const getToken = () => {
  return localStorage.getItem(localStorageKeys.token);
};

const removeToken = () => {
  localStorage.removeItem(localStorageKeys.token);
};

const setUser = (user) => {
  localStorage.setItem(localStorageKeys.user, JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem(localStorageKeys.user));
};

const removeUser = () => {
  localStorage.removeItem(localStorageKeys.user);
};

export const ttLocalStorage = {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser,
};
