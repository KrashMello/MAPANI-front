export default {
  getLoadingLogin(state) {
    return state.loadingLogin;
  },
  getPageTitle(state) {
    return state.pageTitle;
  },
  getStatus(state) {
    return state.status;
  },
  getResponseSnackbar: (state) => {
    return state.responseSnackbar;
  },
};
