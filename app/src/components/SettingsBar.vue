<template>
  <div>
    <b-button-group squared>
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
    </b-button-group>
  </div>
</template>

<script>
import modes from "../helpers/globals";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "SettingsBar",
  data: function () {
    return {
      modes: modes,
    };
  },
  computed: {
    ...mapGetters([
      "mode",
      "range",
      "nrOfDigits",
      "autozeroEnabled",
      "actualRange",
    ]),
  },
  methods: {
    ...mapMutations([
      "setMode",
      "setRange",
      "setNrOfDigits",
      "setAutozeroEnabled",
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

<style scoped></style>
