const state = {
  errorMessage: "",
  showErrorModal: false,
};

const getters = {
  // These two properties will be used by the error modal in App.vue
  // to show an error message. It can be used throughout the whole app.
  errorMessage: (state) => state.errorMessage,
  showErrorModal: (state) => state.showErrorModal,
};

const actions = {
  showError({ commit }, errorMessage) {
    commit("setErrorMessage", errorMessage);
    commit("setShowErrorModal", true);
  },
};

const mutations = {
  setErrorMessage(state, errorMessage) {
    state.errorMessage = errorMessage;
  },
  setShowErrorModal(state, showErrorModal) {
    state.showErrorModal = showErrorModal;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
