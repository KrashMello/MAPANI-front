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
import project from "./project";
import departament from "./departament";
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
      employed: employed,
      permissions: permissions,
      sponsor: sponsor,
      project: project,
      departament: departament,
    },
  });
};
export default createStore;
