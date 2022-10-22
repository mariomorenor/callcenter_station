import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/settings/connection",
    name: "ConnectionSettings",
    component: () => import("@/views/Settings/Connection.vue"),
  },
  {
    path: "/settings/general",
    name: "GeneralSettings",
    component: () => import("@/views/Settings/General.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
