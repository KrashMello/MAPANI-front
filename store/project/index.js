import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  projects: [],
  projects: {
    clinicHistoryCode: null,
    representativeFirstName: "",
    representativeLastName: "",
    representativeNumberPhone: "",
    representativeDirection: "",
    patientFirstName: "",
    patientLastName: "",
    patientBornDate: "",
    pediatrics: false,
    nitritionist: false,
    psychiatry: false,
    socialPsychology: false,
    breastfeedingAdvice: false,
    advocacy: false,
    clinicalPsychology: false,
  },
  appointmentSearchOptions: {
    code: "",
    representativeFirstName: "",
    representativeLastName: "",
    patientFirstName: "",
    patientLastName: "",
    appointmentDate: "",
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
