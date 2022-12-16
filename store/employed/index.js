import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  employeds: [],
  employed: {
    code: "",
    personalDataCode: "",
    jobPositionCode: "",
    jobPositionName: "",
    departamentCode: "",
    departamentName: "",
    dateOfEntry: "",
    dateOfDischarge: "",
  },
  searchOptions: {
    jobPositionCode: "",
    regionCode: "",
    stadeCode: "",
    municipalityCode: "",
    parrishCode: "",
    dni: "",
    dateOfEntry: "",
    dateOfDiscarge: "",
    departamentCode: "",
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
