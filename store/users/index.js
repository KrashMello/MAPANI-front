import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
  users: [
    {
      username: "djorellana",
      password: "25894595",
      departament: "Informatica",
      personCode: "ps-00000001",
      carge: "Programador",
      permission: [
        {
          code: "MOD_001",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
        {
          code: "MOD_002",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
        {
          code: "MOD_003",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
        {
          code: "MOD_004",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
        {
          code: "MOD_005",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
        {
          code: "MOD_006",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
        {
          code: "MOD_007",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
      ],
    },
    {
      username: "JESOTELDO",
      password: "22194872",
      departament: "SISTEMA",
      personCode: "ps-00000002",
      carge: "Auxiliar",
      permission: [
        {
          code: "MOD_001",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
        {
          code: "MOD_002",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
        {
          code: "MOD_003",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
        {
          code: "MOD_008",
          search: true,
          aggregate: true,
          delete: true,
          update: true,
          print: true,
        },
      ],
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
