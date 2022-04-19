const state = {
  measurement: "DCV",
  nrOfDigits: 4,
  range: 3,
  autozeroEnabled: false,
};

const getters = {
  measurement: (state) => state.measurement,
  nrOfDigits: (state) => state.nrOfDigits,
  range: (state) => state.range,
  autoZeroEnabled: (state) => state.autoZeroEnabled,
};

const actions = {
  rangeUp({ commit }) {
    commit("setRange", state.range * 10);
  },
  rangeDown({ commit }) {
    commit("setRange", state.range / 10);
  },
};

const mutations = {
  setMeasurement(state, measurment) {
    state.measurment = measurment;
    this._vm.$socket.client.emit("update_settings", state);
  },
  setNrOfDigits(state, nrOfDigits) {
    state.nrOfDigits = nrOfDigits;
    this._vm.$socket.client.emit("update_settings", state);
  },
  setRange(state, range) {
    state.range = range;
    this._vm.$socket.client.emit("update_settings", state);
  },
  setAutoZeroEnabled(state, autoZeroEnabled) {
    state.autoZeroEnabled = autoZeroEnabled;
    this._vm.$socket.client.emit("update_settings", state);
  },
  SOCKET_SETTINGS_UPDATED(state, settings) {
    state.measurement = settings.measurement;
    state.nrOfDigits = settings.nrOfDigits;
    state.range = settings.range;
    state.autoZeroEnabled = settings.autoZeroEnabled;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
