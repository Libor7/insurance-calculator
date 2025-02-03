<template>
  <div class="input-field">
    <label :for="label">{{ label }}</label>
    <select v-if="options" v-model="inputValue">
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
    <input
      v-else
      :type="type"
      v-model="inputValue"
      :placeholder="label"
      :min="min"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "InputField",
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | any[]>,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "text",
    },
    min: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  watch: {
    modelValue(newVal) {
      this.$emit("update:modelValue", newVal);
    },
  },
  computed: {
    inputValue: {
      get(): string | number | any[] {
        return this.modelValue;
      },
      set(value: string | number | Array<any>) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>

<style scoped>
.input-field {
  margin-bottom: 15px;
}

.input-field label {
  margin-bottom: 5px;
}

.input-field select,
.input-field input {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
