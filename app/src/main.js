import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue, IconsPlugin, ModalPlugin } from "bootstrap-vue";
import axios from "axios";
import VueAxios from "vue-axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ModalPlugin);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.prototype.apiRootUrl = "/backend";

// Using Vue 2 since Vue 3 is not yet supported
// by BootstrapVue and many other important plugins
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
