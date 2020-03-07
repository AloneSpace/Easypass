import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import vueaxios from "./plugins/vueaxios";
import router from "./router";
import VueBarcode from "vue-barcode";

Vue.config.productionTip = false;
Vue.component("barcode", VueBarcode);

new Vue({
  vuetify,
  vueaxios,
  router,
  render: h => h(App)
}).$mount("#app");
