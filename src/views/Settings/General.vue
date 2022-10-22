<template>
    <div class="mt-5">
        <form action="#">
            <h1 class="title">Configuración General</h1>
            <b-field label="Dirección IP">
                <b-input readonly v-model="station.ip_address"></b-input>
            </b-field>
            <h2 class="subtitle mt-2 mb-2">Actualmente está recibiendo conexiones de:</h2>
            <b-button label="Guardar" icon-left="save"  type="is-info" @click="save()"></b-button>
            <b-button label="Agregar" icon-left="plus-circle" class="mx-2" type="is-primary" @click="addDepartment()">
            </b-button>
            <div class="my-4" v-for="department in station.departments" :key="department.id">
                <b-field label="Departamento" label-position="on-border">
                    <b-select v-model="department.peer_id">
                        <option v-for="dep in departments" :key="dep.id" :value="dep.peer_id">{{dep.name}}</option>
                    </b-select>
                    <p class="control">
                        <b-button @click="removeDeparment(department)" type="is-danger" icon-left="trash-alt">
                        </b-button>
                    </p>
                </b-field>
            </div>


        </form>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import * as messages from "@/tools/Messages"
import { mapState } from 'vuex';

export default {
    name: "GeneralSettingsView",
    data() {
        return {
            station: {
                ip_address: "",
                departments: []
            },
            departments: []
        }
    },
    computed: {
        ...mapState(["token"])
    },
    mounted() {
        this.getStationData()
        this.getDepartments()
    },
    methods: {
        getStationData() {
            ipcRenderer
                .invoke("getData", { key: "station" })
                .then(station => {
                    this.station = station
                })
        },
        getDepartments() {
            this.axios
                .get("departments", { headers: { token: this.token } })
                .then(({ data }) => {
                    this.departments = data
                })
        },
        save() {
            this.station.departments = this.station.departments.map(d => {
                return this.departments.find(dep => dep.peer_id == d.peer_id)
            })
            ipcRenderer
                .invoke("setData", { key: "station", value: this.station })
                .then((result) => {
                    messages.SUCCESS()
                })
        },
        addDepartment() {
            this.station.departments.push({
                name: "",
                peer_id: ""
            })
        },
        removeDeparment(department) {
            this.station.departments = this.station.departments.filter(d => d.peer_id != department.peer_id)
        }
    }
}
</script>

<style scoped>
form {
    width: 70%;
    margin: auto;
}
</style>