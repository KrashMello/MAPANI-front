import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  sponsors: [],
  sponsor: {
    code: "",
    documentTypeCode: "",
    documentTypeName: "",
    acronym: "",
    rif: "",
    name: "",
    contactNumber: "",
    email: "",
  },
  searchOptions: {
    documentTypeCode: "",
    rif: "",
    name: "",
    email: "",
  },
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
