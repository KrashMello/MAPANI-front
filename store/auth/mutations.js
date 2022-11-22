export default {
  updateAuth(state, [user = null, personData = null, token]) {
    state.token = token;

    if (token) {
      state.auth.departament = user.departament;
      state.auth.personData = personData;
      state.auth.carge = user.carge;
      state.auth.permission = user.permission;
      this.$router.push({ name: "panel" });
    } else {
      this.$router.go("/");
      setTimeout(() => {
        state.auth.departament = "";
        state.auth.personData = "";
        state.auth.carge = "";
        state.auth.permission = "";
      }, 1000);
    }
  },
  setToken: (state,token) =>{
    state.token = token
  }
};
