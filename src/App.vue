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
  mounted() {
    this.init();
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState(["token", "server", "connectedDepartments"])
  },
  methods: {
    ...mapMutations(["setToken", "setServerSettings", "setConnectedDepartments"]),
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
          this.setServerSettings(server)
        })
        .then(() => {
          this.getAccessToken()
        });

      // Listening Calls from Connected Departments
      ipcRenderer
        .invoke("getData", { key: "station" })
        .then(station => {
          this.setConnectedDepartments(station.departments)
        })
        .then(() => {
          this.connectedDepartments.forEach((peer) => {

            // Establishing Call Listener
            peer.on("call", (call) => {
              
            });
          })
        })
    },
    getAccessToken() {
      this.axios
        .post("get-token-for-stations", { password: this.server.password })
        .then(({ data }) => {
          this.setToken(data.token)
        });
    }
  },
  sockets: {

  }
}
</script>

<style>

</style>
