export default {
  updateAuth(state, [token, getters]) {
    let data;
    getters.socket.emit("verifyToken",token)
    getters.socket.on("verifyToken",resp=>{data = resp})
    localStorage.setItem('token', token)
    if (token) {
      state.auth.userData = data.userData;
      state.auth.permission = data.permissions;
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
