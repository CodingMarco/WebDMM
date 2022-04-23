<template>
  <div>
    <p id="measurement_display">
      <span>{{ voltage }}</span>
      <span v-if="this.voltage != 'Overload'"> {{ unit }}</span>
    </p>

    <b-dropdown :text="'Mode: ' + modes[mode]">
      <b-dropdown-item
        v-for="(mode, index) in modes"
        @click="setMode(index)"
        :key="index"
        :value="index"
        >{{ mode }}
      </b-dropdown-item>
    </b-dropdown>

    <b-button @click="toggleAutoRange"
      >Auto range: {{ range == "auto" ? "On" : "Off" }}</b-button
    >
    <b-button @click="setRange(actualRange * 10)">Range up</b-button>
    <b-button @click="setRange(actualRange / 10)">Range down</b-button>

    <b-dropdown :text="'Digits: ' + nrOfDigits">
      <b-dropdown-item @click="setNrOfDigits(3)">3</b-dropdown-item>
      <b-dropdown-item @click="setNrOfDigits(4)">4</b-dropdown-item>
      <b-dropdown-item @click="setNrOfDigits(5)">5</b-dropdown-item>
    </b-dropdown>

    <b-button @click="setAutozeroEnabled(!autozeroEnabled)">
      Auto zero: {{ autozeroEnabled ? "On" : "Off" }}
    </b-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

const modes = {
  DCV: "⎓ V",
  ACV: "~ V",
  R2W: "2 Wire Ω",
  R4W: "4 Wire Ω",
  DCI: "⎓ A",
  ACI: "~ A",
  Rext: "Extended Ω",
};

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
  3: " ",
  30: " ",
  300: " ",
  3000: "k",
  3e4: "k",
  3e5: "k",
  3e6: "M",
  3e7: "M",
};

export default {
  name: "HomeView",
  data: function () {
    return {
      voltage: (0.0).toFixed(this.nrOfDigits),
      connection: null,
      modes: modes,
    };
  },

  computed: {
    ...mapGetters([
      "mode",
      "nrOfDigits",
      "range",
      "autozeroEnabled",
      "valueDisplay",
      "actualRange",
      "rangeUsedForDisplay",
    ]),
    unit() {
      return `${siPrefixes[this.rangeUsedForDisplay]}${units[this.mode]}`;
    },
  },

  created: function () {
    console.log("Starting connection");
    this.$socket.$subscribe("readout", (data) => {
      if (data.value == "OVLD") {
        this.voltage = "Overload";
      } else {
        this.setMeasurementResult(data);
        this.updateValueDisplay();
        this.voltage = `${this.valueDisplay.sign}${this.valueDisplay.beforeDecimal}.${this.valueDisplay.afterDecimal}`;
      }
    });
    console.log("Subscribed to readout");
  },

  destroyed: function () {
    this.$socket.$unsubscribe("readout");
  },

  methods: {
    ...mapMutations([
      "setMeasurementResult",
      "setMode",
      "setNrOfDigits",
      "setRange",
      "setAutozeroEnabled",
    ]),
    ...mapActions(["rangeUp", "rangeDown", "updateValueDisplay"]),
    toggleAutoRange() {
      if (this.range == "auto") {
        this.setRange(this.actualRange);
      } else {
        this.setRange("auto");
      }
    },
  },
};
</script>

<style scoped>
#measurement_display {
  font-size: 100px;
  /* font-family: "Digital-7 Mono"; */
  font-family: "Droid Sans Mono";
}

button,
.dropdown {
  margin-right: 10px;
}
</style>
