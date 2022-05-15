<template>
  <div>
    <span class="measurement_display">{{ valueDisplay.sign }}</span>
    <template v-for="(value, index) in valueDisplay.beforeDecimal.split('')">
      <span class="measurement_display" :key="'A' + index">{{ value }}</span>
      <div class="decimal_or_space" :key="'B' + index"></div>
    </template>
    <span class="decimal_or_space">.</span>
    <template v-for="(value, index) in valueDisplay.afterDecimal.split('')">
      <span class="measurement_display" :key="'C' + index">{{ value }}</span>
      <div class="decimal_or_space" :key="'D' + index"></div>
    </template>
    <span id="sign"></span>
    <br />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MeasurementDisplay",
  computed: {
    ...mapGetters(["valueDisplay"]),
  },
};
</script>

<style scoped>
.measurement_display {
  font-size: 100px;
  /* font-family: "Digital-7 Mono"; */
  font-family: "Droid Sans Mono";
}

.decimal_or_space {
  width: 5px;
  font-size: 100px;
  display: inline-block;
  text-align: center;
}

div {
  display: inline;
}
</style>
