import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  appoinments: [],
  appoinment: {
    representative: {
      firstName: "",
      lastName: "",
      numberPhone: "",
      direction: "",
    },
    patient: {
      firstName: "",
      lastName: "",
      bornDate: "",
    },
    pediatrics: false,
    nitritionist: false,
    psychiatry: false,
    psicology: false,
    breastfeedingAdvice: false,
    assisten: null,
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
