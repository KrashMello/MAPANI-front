import Vuex from "vuex";
import auth from "./auth";
import modules from "./modules";
import request from "./request";
import stadeMachine from "./stadeMachine";
import users from "./users";
import person from "./person";
import appoinment from "./appoinment";
import socket from "./socket";
import employed from "./employed";
import permissions from "./permissions";
import sponsor from "./sponsor";

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      auth: auth,
      modules: modules,
      request: request,
      stadeMachine: stadeMachine,
      users: users,
      person: person,
      appoinment: appoinment,
      socket: socket,
      employed : employed,
      permissions: permissions,
      sponsor: sponsor,
    },
  });
};
export default createStore;
