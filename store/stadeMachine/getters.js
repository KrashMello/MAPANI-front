export default {
  getLoading(state) {
    return state.loading;
  },
  getPageTitle(state) {
    return state.pageTitle;
  },
  getStatus(state) {
    return state.status;
  },
  getSnackbar: (state) => {
    return state.snackbar;
  },
};
