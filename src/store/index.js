import Vue from "vue";
import Vuex from "vuex";
import { Peer } from "peerjs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    isLoading: false,
    connectedDepartments: [],
    server: {
      host: "localhost",
      port: 9090,
      password: "",
      peer_port: 6969,
    },
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setServerSettings(state, server) {
      state.server = server;
    },
    setConnectedDepartments(state, departments) {
      departments.forEach((d) => {
        const peer = new Peer(d.peer_id, {
          host: state.server.host.split(":")[1],
          port: state.server.peer_port,
        });
        state.connectedDepartments.push(peer);
      });
    },
  },
  actions: {},
  modules: {},
});
