export default {
async login({ commit, getters}, [username, password]) {
      commit("changeLoadingState", true);
      try {
       await this.$axios.post('api/Auth/singIn',{params:{username:username,password:password}})
      .then((resp)=>{
          commit("updateAuth",[resp.data.token,getters])
          commit("changeLoadingState", false);
          commit("changeStatus", { code: 0, message: "" });
      })
    }catch(err){
          if(err.response.data){
            commit("changeStatus", err.response.data)
            commit("changeLoadingState", false);
          }
      }

  },
  logout({ commit }) {
    localStorage.setItem('token',null)
    commit("updateAuth", [null, null, null]);
  },
  searchLocalStorageToken({ commit, getters }) {
      if (localStorage.getItem('token')){
        commit('setToken',  localStorage.getItem('token'))
        commit("updateAuth",[localStorage.getItem('token'),getters])
    }
      else 
        commit('setToken', null)
    }
};    
