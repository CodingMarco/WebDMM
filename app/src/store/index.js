import Vue from "vue";
import Vuex from "vuex";
import errorModal from "./modules/errorModal";

Vue.use(Vuex);

export default new Vuex.Store({
  // Having different modules instead of having everything
  // in this file cleans up the code a lot...
  modules: {
    errorModal,
  },
});