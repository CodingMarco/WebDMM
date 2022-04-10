<template>
  <div>
    <p id="measurement_display">{{ voltage }} {{ unit }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
      if (data == 9999900000) {
        this.voltage = "Overload";
      } else {
        this.voltage = data.toFixed(this.nrOfDigits);
      }
    });
    console.log("Subscribed to readout");
  },
};
</script>

<style scoped>
#measurement_display {
  font-size: 100px;
}
</style>
