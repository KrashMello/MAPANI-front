export default {
  setModules: (state, modules) => {
    state.modules = modules;
  },
  setModule: (state, mod) => {
    state.mod = mod;
  },
  setPaginationModulePage(state, page) {
    state.searchOptions.page = page;
  },
  setPaginationModuleLimit(state, limit) {
    state.searchOptions.limit = limit;
  },
};
