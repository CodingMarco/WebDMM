<template>
  <div>
    <span :v-for="d in measurementResult.beforeDecimal">{{ d }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MeasurementDisplay",
  computed: {
    ...mapGetters(["measurementResult"])
  }
}

</script>

