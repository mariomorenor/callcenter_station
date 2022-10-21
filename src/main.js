import Vue from "vue";
import "./plugins/fontawesome";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { io } from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import { ipcRenderer } from "electron";

ipcRenderer.invoke("getData", { key: "server" }).then((server) => {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: io(`${server.host}:${server.port}`),
    })
  );
});

Vue.use(Buefy, {
  defaultIconPack: "fas",
  defaultIconComponent: "fa-icon",
});

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
