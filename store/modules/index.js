import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  modules: [
    {
      code: "MOD_001",
      icon: "mdi-home",
      title: "Inicio",
      to: "/panel/",
    },
    {
      code: "MOD_002",
      icon: "mdi-calendar-month",
      title: "Agenda",
      to: "/panel/agenda",
    },
    {
      code: "MOD_003",
      icon: "mdi-cart-heart",
      title: "Solicitudes",
      to: "/panel/solicitudes",
    },
    {
      code: "MOD_004",
      icon: "mdi-domain",
      title: "Organismos",
      to: "/panel/organismos",
    },
    {
      code: "MOD_005",
      icon: "mdi-human-male-female",
      title: "Personas",
      to: "/panel/personas",
    },
    {
      code: "MOD_006",
      icon: "mdi-account-hard-hat",
      title: "Empleados",
      to: "/panel/empleados",
    },
    {
      code: "MOD_007",
      icon: "mdi-account-group",
      title: "Usuarios",
      to: "/panel/usuarios",
    },
    {
      code: "MOD_008",
      icon: "mdi-account-group",
      title: "Citas",
      to: "/panel/citas",
    },
    {
      code: "MOD_009",
      icon: "mdi-list-box-outline",
      title: "Proyectos",
      to: "/panel/proyectos",
    },
    {
      code: "MOD_010",
      icon: "mdi-account-injury",
      title: "Pacientes",
      to: "/panel/pacientes",
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
