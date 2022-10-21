<template>
    <div class="container mt-5">
        <b-loading v-model="isLoading"></b-loading>
        <form action="#">
            <h1 class="title">Configuración de Conexión</h1>
            <b-field label="Dirección del Servidor">
                <b-input v-model="server.host"></b-input>
            </b-field>
            <b-field label="Puerto Servidor">
                <b-input v-model="server.port"></b-input>
            </b-field>
            <b-field label="Contraseña de Acceso">
                <b-input v-model="server.password" password-reveal type="password"></b-input>
            </b-field>
            <b-button @click="save()" type="is-info" icon-left="save" class="mr-2" label="Guardar"></b-button>
            <b-button @click="test()" type="is-primary" icon-left="signal" label="Probar Conexión"></b-button>
        </form>

    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import * as messages from "@/tools/Messages"
import { mapMutations, mapState } from 'vuex';
import { HANDLE_ERROR_RESPONSE } from "@/tools/functions"

export default {
    name: "ConnectionSettingsView",
    data() {
        return {
            server: {
                host: "",
                port: "",
                password: ""
            },
            isLoading: false
        }
    },
    computed: {
        ...mapState(["token"])
    },
    beforeMount() {
        ipcRenderer
            .invoke("getData", { key: "server" })
            .then(server => {
                this.server = server
            })

    },
    methods: {
        ...mapMutations(["setToken", "setPassword"]),
        save() {
            this.isLoading = true;
            ipcRenderer
                .invoke("setData",
                    {
                        key: "server",
                        value: this.server
                    })
                .then(() => {
                    this.axios.defaults.baseURL = `${this.server.host}:${this.server.port}`
                    this.setToken(this.getAccessToken());
                    this.setPassword(this.server.password);
                    messages.SUCCESS()
                }).finally(() => {
                    this.isLoading = false
                })
        },
        async getAccessToken() {
            const { data } = await this.axios
                .post("get-token-for-stations", { password: this.server.password })
                .catch(HANDLE_ERROR_RESPONSE)

            return data.token
        },
        test() {
            this.getAccessToken().then(token => {
                this.axios
                    .get("test-connection", { headers: { token } })
                    .then(() => {
                        messages.SUCCESS({ message: "Conexión Realizada Correctamente!" });
                    })

            })
        }
    }
}
</script>

<style>
form {
    width: 70%;
    margin: auto;
}
</style>