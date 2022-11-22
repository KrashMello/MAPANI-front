import Vuex from "vuex";
import auth from "./auth";
import modules from "./modules";
import request from "./request";
import stadeMachine from "./stadeMachine";
import users from "./users";
import person from "./person";
import appoinment from "./appoinment";
import socket from "./socket";

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
    },
  });
};
export default createStore;
