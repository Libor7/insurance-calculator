<template>
  <form @submit.prevent="calculateInsurance">
    <InputField v-model="age" label="Age" type="number" />
    <InputField v-model="amount" label="Amount" type="number" />
    <button type="submit">Calculate</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputField from "./InputField.vue";

export default defineComponent({
  name: "CalculatorForm",
  components: {
    InputField,
  },
  setup(_, { emit }) {
    const age = ref<number>(0);
    const amount = ref<number>(0);

    const calculateInsurance = () => {
      const result = age.value * 0.1 + amount.value * 0.02;
      emit("submit", result);
    };

    return { age, amount, calculateInsurance };
  },
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
