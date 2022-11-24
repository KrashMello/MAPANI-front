export default {
  async updateAuth(state, [token, getters]) {
    getters.socket.emit("verifyToken",token)
    localStorage.setItem('token', token)
    if (token) { 
    await getters.socket.on("verifyToken",resp => {
        state.auth.userData = resp.userData;
        state.auth.permissions = resp.permissions;
        this.$router.push({ name: "panel" });
      })
    } else {
      this.$router.go("/");
      setTimeout(() => {
        state.auth.userData = "";
        state.auth.permissions = "";
      }, 1000);
    }
  },
  setToken: (state,token) =>{
    state.token = token
  }
};
