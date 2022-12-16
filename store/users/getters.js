export default {
  findUser: (state) => (username) => {
    return state.users.find((user) => user.username === username);
  },
  findPass: (state) => (password) => {
    return state.users.find((user) => user.password === password);
  },
  getUsers: (state) => {
    return state.users;
  },
  getUser: (state) => {
    return state.user;
  },
  getUserPersonalData: (state) => {
    return state.userPersonalData;
  },
  getUsersPersonalData: (state) => {
    return state.usersPersonalData;
  },
  getUserSearchOptions: (state) => {
    return state.searchOptions;
  },
};
