import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    password: "",
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setPassword(state, password) {
      state.password = password;
    },
  },
  actions: {},
  modules: {},
});
