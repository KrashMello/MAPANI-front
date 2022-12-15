export default {
  setUsers: (state, users) => {
    state.users = users;
  },
  setUser: (state, user) => {
    state.user = user;
  },
  setUserPersonalData: (state, personalData) => {
    state.userPersonalData = personalData;
  },
  setUsersPersonalData: (state, personalDatas) => {
    state.usersPersonalData = personalDatas;
  },
};
