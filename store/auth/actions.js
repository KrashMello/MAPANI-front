export default {
async login({ commit }, [username, password]) {
      commit("changeLoadingState", true);
      try {
       await this.$axios.post('api/Auth/singIn',{params:{username:username,password:password}})
      .then((resp)=>{
          commit("setToken",resp.data.token)
        this.$cookies.set('token', resp.data.token, {
            path: '/',
            maxAge: Math.floor(Date.now() / 1000) + (60*60)
          })
          commit("changeLoadingState", false);
          commit("changeStatus", { code: 0, message: "" });
          this.$router.push("/panel")
      })
    }catch(err){
          if(err.response.data){
            commit("changeStatus", err.response.data)
            commit("changeLoadingState", false);
            
          }
      }

  },
  logout() {
    localStorage.removeItem('token');
    this.$router.push("/");
  },
  searchLocalStorageToken({ commit, getters }) {
    
    if (this.$cookies.get('token')){
      getters.socket.emit("verifyToken",  this.$cookies.get('token'))
      getters.socket.on("verifyToken",resp =>{
        if(resp){
          commit('setToken',null);
          this.$cookies.remove('token');
        }else{
          if(!getters.getToken)
            commit('setToken',  this.$cookies.get('token'));
          
        }
      })
    }
    else{
      commit('setToken', null)
      this.$cookies.remove('token');
    }
  }
};    
