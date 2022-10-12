export default {
  findUser: (state) => (username) => {
    return state.users.find((user) => user.username === username);
  },
  findPass: (state) => (password) => {
    return state.users.find((user) => user.password === password);
  },
};
