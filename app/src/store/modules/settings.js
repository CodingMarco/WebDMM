const units = {
  ACI: "A",
  ACV: "V",
  DCI: "A",
  DCV: "V",
  R2W: "Ohm",
  R4W: "Ohm",
  Rext: "Ohm",
};

const siPrefixes = {
  0.03: "m",
  0.3: "m",
  3: "",
  30: "",
  300: "",
  3000: "k",
  3e4: "k",
  3e5: "k",
  3e6: "M",
  3e7: "M",
};

const state = {
  measurement: "DCV",
  nrOfDigits: 4,
  range: 3,
  autozeroEnabled: false,
};

const getters = {
  measurment: (state) => state.measurment,
  nrOfDigits: (state) => state.nrOfDigits,
  range: (state) => state.range,
  autoZeroEnabled: (state) => state.autoZeroEnabled,
  unit: (state) => `${siPrefixes[state.range]}${units[state.measurement]}`,
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
