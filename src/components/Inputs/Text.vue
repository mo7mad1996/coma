<template>
  <div>
    <div
      class="flex gap-2 md:gap-4 border !border-gray-200 p-2 px-4 rounded-2xl items-center bg-white"
      :class="`${customClass} ${
        disabled && '!bg-neutral-200 cursor-not-allowed'
      }`"
    >
      <img :icon="icon" v-if="img" width="22" :alt="name" />
      <v-icon :icon="icon" v-if="icon" color="#929A9F" />
      <slot name="icon" />

      <Field
        class="flex-1 outline-none max-md:placeholder:text-sm"
        :rules="rules"
        :name="name"
        :placeholder="placeholder"
        :validateOnInput="true"
        v-model="modelValue"
        :inputmode="inputmode"
        :disabled="disabled"
      />
    </div>

    <ErrorMessage :name="name" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

const props = defineProps({
  rules: { type: String, default: "" },
  type: { type: String, default: "text" },
  name: { type: String, default: "text" },
  placeholder: { type: String, required: false },
  icon: { type: String, required: false },
  img: { type: String, required: false },
  disabled: { type: null, default: false },
  customClass: { type: String, required: false },
  inputmode: { type: String, required: false },
});

const modelValue = defineModel();
</script>
