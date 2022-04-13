<template>
  <div>
    <p id="measurement_display">{{ voltage }} {{ unit }}</p>
    <b-button @click="updateSettings"> Send Settings </b-button>
    <b-button @click="rangeUp">Range up</b-button>
    <b-button @click="rangeDown">Range down</b-button>

    <b-dropdown :text="'Digits: ' + nrOfDigits">
      <b-dropdown-item @click="setNrOfDigits(3)">3</b-dropdown-item>
      <b-dropdown-item @click="setNrOfDigits(4)">4</b-dropdown-item>
      <b-dropdown-item @click="setNrOfDigits(5)">5</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "HomeView",
  data: function () {
    return {
      voltage: (0.0).toFixed(this.nrOfDigits),
      connection: null,
    };
  },

  computed: mapGetters([
    "measurement",
    "nrOfDigits",
    "range",
    "autozeroEnabled",
    "unit",
  ]),

  created: function () {
    console.log("Starting connection");
    this.$socket.$subscribe("readout", (data) => {
      if (data == "OVLD") {
        this.voltage = "Overload";
      } else {
        if (this.range < 3) {
          data *= 1000;
          this.voltage = data.toFixed(this.nrOfDigits - 2);
        } else {
          this.voltage = data.toFixed(this.nrOfDigits);
        }
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

    updateSettings: function () {
      this.setMeasurement("R2W");
    },
  },
};
</script>

<style scoped>
#measurement_display {
  font-size: 80px;
}
</style>
