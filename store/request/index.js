import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  requests: [
    {
      id: "ST-00000001",
      date: "07/10/2022",
      solicitante: "Aura Freytez",
      beneficiario: "Raul Sivira",
    },
    {
      id: "ST-00000002",
      date: "07/10/2022",
      solicitante: "Jose Ruiz",
      beneficiario: "Carlos Silva",
    },
  ],
  request: {
    applicant: {
      Found: false,
      code: "",
      DNI: "",
      documentType: "",
      fullName: "",
      firstName: "",
      lastName: "",
      bornDate: "",
      homeTelephone: "",
      personalPhone: "",
      martialStatus: "",
      email: "",
    },
    requestData: [{
      typeOfAid: "", 
      dependencies: "", 
      requirements: "", 
      degreeOfVulnerability: "",
    }],
    beneficiary: {
      Found: false,
      code: "",
      DNI: "",
      documentType: "",
      fullName: "",
      firstName: "",
      lastName: "",
      bornDate: "",
      homeTelephone: "",
      personalPhone: "",
      martialStatus: "",
      email: "",
    },
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
