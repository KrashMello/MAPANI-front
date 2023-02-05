export default {
  changeLoading(state, stade) {
    state.loading = stade;
  },
  changePageTitle(state, title) {
    state.pageTitle = title;
  },
  changeStatus(state, status) {
    state.status = status;
  },
  setSnackbar(state, snackbar) {
    state.snackbar = snackbar;
  },
};
