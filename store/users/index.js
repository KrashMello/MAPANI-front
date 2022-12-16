import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  users: [],
  user: {
    code: "",
    username: "",
    password: "",
    securityCode: "",
    email: "",
    statusCode: "",
    roleCode: "",
  },
  userPersonalData: {
    code: "",
    firstName: "",
    lastName: "",
    genderCode: "",
    documentTypeCode: "",
    dni: "",
    bornDate: "",
    martialStatusCode: "",
    disability: false,
    disabilityTypeCode: "",
    ethnicGroup: false,
    ethnicDescription: "",
    parrishCode: "",
    direction: "",
    phoneNumber: "",
  },
  usersPersonalData: [],
  searchOptions: {
    username: "",
    roleCode: "",
    statusCode: "",
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
