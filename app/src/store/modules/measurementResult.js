const state = {
  value: 0.0,
  actualRange: 3.0,
};

const getters = {
  measurementResult: (state) => state.value,
  actualRange: (state) => state.actualRange,
};

const mutations = {
  setMeasurementResult(state, measurementResult) {
    state.value = measurementResult.value;
    state.actualRange = measurementResult.range;
  },
};

export default {
  state,
  getters,
  mutations,
};
