<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { mapMutations, mapState } from 'vuex';

export default {
  name: "AppView",
  beforeMount() {
    this.init();
  },
  computed: {
    ...mapState(["token", "password"])
  },
  methods: {
    ...mapMutations(["setToken", "setPassword"]),
    init() {

      // Listener to change View when click on Main Menu
      ipcRenderer.on("set-view", (event, view) => {
        if (this.$route.name != view.name) {
          this.$router.replace({
            name: view.name
          })
        }
      });

      // Listener to get initial Server config
      ipcRenderer
        .invoke("getData", { key: "server" })
        .then(server => {
          this.axios.defaults.baseURL = `${server.host}:${server.port}`
          this.setPassword(server.password)
        })
        .then(() => {
          this.getAccessToken()
        });
    },
    getAccessToken() {
      this.axios
        .post("get-token-for-stations", { password: this.password })
        .then(({ data }) => {
          this.setToken(data.token)
        });
    }
  },
  sockets:{
    connection(){
      console.log("sdkfjhsdjk");
    },
    disconnect(){
      console.log("sadksjaudyfsgdyufsgdufgsd");
    }
  }
}
</script>

<style>

</style>
