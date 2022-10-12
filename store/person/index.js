import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  persons: [ 
    {
      code: "ps-00000001",
      DNI: "25894595",
      documentType: "Venezolano",
      fullName: "Daniel Orellana",
      firstName: "Daniel Jesus",
      lastName: "Orellana Freytez",
      bornDate: "24-03-1998",
      homeTelephone: "0253-292-50-73",
      personalPhone: "0416-185-55-39",
      martialStatus: "Soltero",
      email: "danielobo2403@gmail.com",
    },
    {
      code: "ps-00000002",
      DNI: "22194872",
      documentType: "Venezolano",
      fullName: "Joel Soteldo",
      firstName: "Joel Enrique",
      lastName: "Soteldo Sivira",
      bornDate: "31-07-1994",
      homeTelephone: "0251-268-93-85",
      personalPhone: "0426-818-46-57",
      martialStatus: "Soltero",
      email: "joelenrikesoteldo@gmail.com",
    },
  ],
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