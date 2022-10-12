export default {
  changeLoadingState(state, stade) {
    state.loadingLogin = stade;
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
