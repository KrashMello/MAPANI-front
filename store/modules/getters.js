export default {
  getModules: (state) => (modules) => {
    return state.modules
      .map((module) => {
        let show = false;
        modules.forEach((permission) => {
          if (module.code === permission.code) show = true;
        });
        if (show) return module;
      })
      .filter((module) => {
        if (module !== undefined) return module;
      });
  },
};
