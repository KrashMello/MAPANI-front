import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  employeds: [],
  employed: {
    employedCode: "",
    personalDataCode: "",
    jobPositionCode: "",
    jobPositionName: "",
    departamentCode: "",
    departamentName: "",
    dateOfEntry: "",
    dateOfDischarge: "",
    firstName: "",
    lastName: "",
    genderCode: "",
    documentTypeCode: "",
    dni: "",
    bornDate: "",
    martialStausCode: "",
    disability: false,
    disabilityTypeCode: "",
    ethnicGroup: false,
    ethnicDescription: "",
    parrishCode: "",
    direction: "",
    phoneNumber: "",
  },
  SearchOptions: {
    employedCode: "",
    jobPositionCode: "",
    departamentCode: "",
    dateOfEntry: "",
    dateOfDischarge: "",
    dni: "",
    parrishCode: "",
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
