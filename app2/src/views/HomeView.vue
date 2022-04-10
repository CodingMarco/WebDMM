<template>
  <div>
    <p id="measurement_display">{{ voltage }}</p>
  </div>
</template>

<script>
//import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  data: function () {
    return {
      voltage: [],
      connection: null,
    };
  },
  created: function () {
    console.log("Starting connection");
    this.$socket.$subscribe("readout", (data) => {
      console.log("Got data", data);
      this.voltage = data;
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
