export default {
  login({ commit, getters }, [username, password]) {
    let findUser = undefined;
    let findPass = undefined;
    let personData = undefined;

    findUser = getters.findUser(username);
    findPass = getters.findPass(password);

    if (findUser === undefined || findPass === undefined) {
      commit("changeLoadingState", true);
      setTimeout(() => {
        commit("changeStatus", {
          code: 1,
          message: "Nombre de usuario o clave incorrecta",
        });
        commit("changeLoadingState", false);
      }, 1000);
    } else {
      commit("changeLoadingState", true);
      setTimeout(() => {
        personData = getters.findPerson(findUser.personCode);
        commit("updateAuth", [findUser, personData, true]);
        commit("changeLoadingState", false);
        commit("changeStatus", { code: 0, message: "" });
      }, 1000);
    }

    /**
     *
     * axios.post("http://api.alcaldia.com.ve/agregar/users",{username: username, password: password}).
     * then((response) => {
     * commit("updateAuth",response.data)
     * }).catch((error) => {commit("messageError",error.data)});  w
     */
  },
  logout({ commit }) {
    commit("updateAuth", [null, null, false]);
  },
};
