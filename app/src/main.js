import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue, IconsPlugin, ModalPlugin } from "bootstrap-vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ModalPlugin);
Vue.use(VueAxios, axios);

console.log(io.protocol);

const socket = io("http://192.168.178.78:5000");

Vue.use(VueSocketIOExt, socket, {
  store,
});

socket.on("connect", () => {
  const transport = socket.io.engine.transport.name; // in most cases, "polling"
  console.log("Connected using " + transport);

  socket.io.engine.on("upgrade", () => {
    const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
    console.log("Upgraded to " + upgradedTransport);
  });
});

Vue.config.productionTip = false;
//Vue.prototype.apiRootUrl = "/backend";

// Using Vue 2 since Vue 3 is not yet supported
// by BootstrapVue and many other important plugins
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
