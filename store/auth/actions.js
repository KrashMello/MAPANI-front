export default {
 async login({ commit, getters}, [username, password]) {
      commit("changeLoadingState", true);
    try{

      console.log(getters,username,password)
       await this.$axios.$post('api/Auth/singIn',{params:{username:username,password:password}})
      .then((resp)=>{
          // commit("updateAuth",[resp.data.token,getters])
          commit("changeLoadingState", false);
          commit("changeStatus", { code: 0, message: "" });
        console.log(resp)
      })
    }
    catch(err){
      console.log(err)
        commit("changeStatus", err.data)
      }

  },
  logout({ commit }) {
    localStorage.setItem('token',null)
    commit("updateAuth", [null, null, null]);
  },
  searchLocalStoreToken({ commit }) {
      if (localStorage.getItem('token')){
        commit("updateAuth",localStorage.getItem('token'))
        commit('setToken',  localStorage.getItem('token'))
    }
      else 
        commit('setToken', null)
    }
};
