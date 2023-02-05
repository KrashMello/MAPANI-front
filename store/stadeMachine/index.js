import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  loading: false,
  pageTitle: "Inicio",
  status: { code: 0, message: "" },
  snackbar: { model: false, status: 0, message: "" },
};

const inBrowser = typeof window !== "undefined";
// if in browser, use pre-fetched state injected by SSR
const state =
  inBrowser && window.__INITIAL_STATE__
    ? window.__INITIAL_STATE__.page
    : defaultState;

export default {
  state,
  actions,
  mutations,
  getters,
};
