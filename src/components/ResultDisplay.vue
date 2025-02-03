<template>
  <div class="result">
    <h2>Result:</h2>
    <p v-if="result !== null">Your insurance amount is: ${{ result }}</p>
    <p v-else>No result to display</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ResultDisplay",
  props: {
    result: {
      type: Number as PropType<number | null>,
      required: true,
    },
  },
});
</script>

<style scoped>
.result {
  margin-top: 20px;
}
</style>
