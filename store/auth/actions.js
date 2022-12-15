export default {
  async login({ commit }, [username, password]) {
    commit("changeLoadingState", true);
    try {
      await this.$axios
        .post("api/Auth/singIn", {
          params: { username: username, password: password },
        })
        .then((resp) => {
          commit("setToken", resp.data.token);
          this.$cookies.set("x-access-token", resp.data.token, {
            path: "/",
            maxAge: Math.floor(Date.now() / 1000) + 60 * 60,
          });
          commit("changeLoadingState", false);
          commit("changeStatus", { code: 0, message: "" });
          this.$router.push("/panel");
        });
    } catch (err) {
      if (err.response.data) {
        commit("changeStatus", err.response.data);
        commit("changeLoadingState", false);
      }
    }
  },
  logout({ commit }) {
    commit("setToken", null);
    this.$cookies.removeAll();
    this.$router.go("/");
    commit("clearVerifyTokenInterval");
  },

  async verifyToken({ commit, getters }) {
    if (this.$cookies.get("x-access-token")) {
      await this.$axios
        .post(
          "api/Auth/UserData",
          { params: { token: `${this.$cookies.get("x-access-token")}` } },
          {
            headers: {
              "x-access-token": `${this.$cookies.get("x-access-token")}`,
            },
          }
        )
        .then((resp) => {
          if (!getters.getToken) commit("setToken", this.$cookies.get("token"));
          commit("setUserDataPermissions", resp.data);
        })
        .catch(() => {
          commit("clearVerifyTokenInterval");
          commit("setToken", null);
          this.$cookies.remove("x-access-token");
          this.$router.go("/");
        });
    } else {
      commit("setToken", null);
      this.$cookies.remove("x-access-token");
      this.$router.go("/");
    }
  },
};
