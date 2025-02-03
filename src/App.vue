<template>
  <div id="app">
    <InsuranceCalculator />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InsuranceCalculator from "./components/InsuranceCalculator.vue";

export default defineComponent({
  name: "App",
  components: {
    InsuranceCalculator,
  },
});
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
