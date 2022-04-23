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
  range: "auto",
  autozeroEnabled: false,
};

const getters = {
  measurement: (state) => state.measurement,
  nrOfDigits: (state) => state.nrOfDigits,
  range: (state) => state.range,
  autozeroEnabled: (state) => state.autozeroEnabled,
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
    if (range == "auto") {
      state.range = range;
    } else {
      const clipped_range = Math.max(
        rangeLimits[state.measurement].min,
        Math.min(range, rangeLimits[state.measurement].max)
      );
      state.range = clipped_range;
    }

    this._vm.$socket.client.emit("update_settings", state);
  },
  setAutozeroEnabled(state, autozeroEnabled) {
    state.autozeroEnabled = autozeroEnabled;
    this._vm.$socket.client.emit("update_settings", state);
  },
  SOCKET_SETTINGS_UPDATED(state, settings) {
    state.measurement = settings.measurement;
    state.nrOfDigits = settings.nrOfDigits;
    if (settings.range == "auto") {
      state.range = "auto";
    } else {
      state.range = Number(settings.range.toFixed(6));
    }
    state.autozeroEnabled = settings.autozeroEnabled;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
