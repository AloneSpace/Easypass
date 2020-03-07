import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "Login",
      path: "/",
      component: () => import("@/pages/Login")
    },
    {
      path: "/dashboard",
      component: () => import("@/pages/dashboard/Index"),
      children: [
        {
          name: "Dashboard",
          path: "/",
          component: () => import("@/pages/dashboard/input/Input")
        },
        {
          name: "History",
          path: "/history",
          component: () => import("@/pages/dashboard/history/History")
        },
        {
          name: "Settings",
          path: "/settings",
          component: () => import("@/pages/dashboard/settings/Index")
        }
      ]
    },
    {
      name: "Logout",
      path: "/logout",
      component: () => import("@/pages/Logout")
    }
  ]
});
