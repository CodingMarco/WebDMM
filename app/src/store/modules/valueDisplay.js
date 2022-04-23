import { ranges } from "../../helpers/ranges.js";

const state = {
  valueDisplay: {
    beforeDecimal: "0",
    afterDecimal: "0",
    sign: "+",
  },
};

const getters = {
  valueDisplay: (state) => state.valueDisplay,
  rangeUsedForDisplay: (state, getters, rootState) => {
    if (rootState.settings.range == "auto") {
      return rootState.measurementResult.actualRange;
    } else {
      return rootState.settings.range;
    }
  },
};

const actions = {
  updateValueDisplay({ commit, getters, rootState }) {
    let value = rootState.measurementResult.value;

    const range = getters.rangeUsedForDisplay;

    const nrOfDigits = rootState.settings.nrOfDigits;
    const value_mult = value * ranges[range].multiplier;
    var value_string = value_mult.toPrecision(6);
    value_string = value_string.replace("-", "");
    var before_decimal = value_string.split(".")[0];
    var after_decimal = value_string.split(".")[1];
    // Remove leading zeros from before_decimal
    before_decimal = before_decimal.replace(/^0+/, "");
    // Remove trailing zeros from after_decimal
    after_decimal = after_decimal.replace(/0+$/, "");

    // Add leading zeros to before_decimal
    before_decimal = before_decimal.padStart(
      ranges[range].digitsBeforeDecimal,
      "0"
    );

    // Add trailing zeros to after_decimal
    after_decimal = after_decimal.padEnd(
      nrOfDigits - ranges[range].digitsBeforeDecimal + 1,
      "0"
    );

    const sign = value < 0 ? "-" : "+";

    commit("setValueDisplay", {
      vaule: value,
      beforeDecimal: before_decimal,
      afterDecimal: after_decimal,
      sign: sign,
      formatted: `${sign}${before_decimal}.${after_decimal}`,
    });
  },
};

const mutations = {
  setValueDisplay(state, valueDisplay) {
    state.valueDisplay = valueDisplay;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
