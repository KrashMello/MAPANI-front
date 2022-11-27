export default {

  setToken: (state,token) =>{
    state.token = token
  },
  setUserDataPermissions(state, data){
    state.auth.userData = data.userData;
    state.auth.permissions = data.permissions;

  }
};
