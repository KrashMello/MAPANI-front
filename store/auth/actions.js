export default {
  async login({ commit }, [username, password]) {
      commit("changeLoadingState", true);

     await this.$axios.post('api/Auth/singIn',{params:{username:username,password:password}}).then(resp=>{
        localStorage.setItem('token', resp)
        commit("updateAuth",[user,userdata,resp.token])
        commit("changeLoadingState", false);
        commit("changeStatus", { code: 0, message: "" });
    }).catch(err =>{
        commit("changeStatus", err.data)
      });

  },
  logout({ commit }) {
    commit("updateAuth", [null, null, null]);
    localStorage.setItem('token',null)
  },
  getToken({ commit }) {
      if (localStorage.getItem('token')) 
        commit('setToken',  localStorage.getItem('token'))
      else 
        commit('setToken', null)
    }
};
