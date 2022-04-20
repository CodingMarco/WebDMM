const rangeLimits = {
  ACI: {
    min: 0.3,
    max: 3,
  },
  ACV: {
    min: 0.3,
    max: 3,
  },
  DCI: {
    min: 0.3,
    max: 3,
  },
  DCV: {
    min: 0.03,
    max: 300,
  },
  R2W: {
    min: 30,
    max: 3e7,
  },
  R4W: {
    min: 30,
    max: 3e7,
  },
  Rext: {
    min: 3e7,
    max: 3e7,
  },
};

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
    const clipped_range = Math.max(
      rangeLimits[state.measurement].min,
      Math.min(range, rangeLimits[state.measurement].max)
    );
    state.range = clipped_range;
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
