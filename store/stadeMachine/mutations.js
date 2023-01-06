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
  showResponseSnackbar(state, responseSnackbar) {
    state.responseSnackbar = responseSnackbar;
  },
};
