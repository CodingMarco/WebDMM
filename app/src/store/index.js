import Vue from "vue";
import Vuex from "vuex";
import errorModal from "./modules/errorModal";
import settings from "./modules/settings";
import measurementResult from "./modules/measurementResult";
import valueDisplay from "./modules/valueDisplay";

Vue.use(Vuex);

export default new Vuex.Store({
  // Having different modules instead of having everything
  // in this file cleans up the code a lot...
  modules: {
    errorModal,
    settings,
    measurementResult,
    valueDisplay,
  },
});
