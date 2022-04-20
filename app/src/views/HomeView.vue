<template>
  <div>
    <p id="measurement_display">
      <span>{{ voltage }}</span>
      <span v-if="this.voltage != 'Overload'"> {{ unit }}</span>
    </p>
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
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import formatMeasurement from "./formatMeasurement";

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

export default {
  name: "HomeView",
  data: function () {
    return {
      voltage: (0.0).toFixed(this.nrOfDigits),
      connection: null,
      actualRange: 3,
    };
  },

  computed: {
    ...mapGetters(["measurement", "nrOfDigits", "range", "autozeroEnabled"]),
    unit() {
      return `${siPrefixes[this.actualRange]}${units[this.measurement]}`;
    },
  },

  created: function () {
    console.log("Starting connection");
    this.$socket.$subscribe("readout", (data) => {
      this.actualRange = data.range;
      if (data.value == "OVLD") {
        this.voltage = "Overload";
      } else {
        this.voltage = formatMeasurement(
          data.value,
          this.actualRange,
          this.nrOfDigits
        );
      }
    });
    console.log("Subscribed to readout");
  },

  destroyed: function () {
    this.$socket.$unsubscribe("readout");
  },

  methods: {
    ...mapMutations([
      "setMeasurement",
      "setNrOfDigits",
      "setRange",
      "setAutoZeroEnabled",
    ]),
    ...mapActions(["rangeUp", "rangeDown"]),
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
  font-size: 150px;
  /* font-family: "Digital-7 Mono"; */
  font-family: "Droid Sans Mono";
}

button {
  margin-right: 10px;
}
</style>
