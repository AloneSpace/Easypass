import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import vueaxios from "./plugins/vueaxios";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  el: "#app",
  vueaxios,
  router,
  render: h => h(App)
}).$mount("#app");
