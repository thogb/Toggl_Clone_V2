export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark" ? {} : {}),
    },
  };
};
