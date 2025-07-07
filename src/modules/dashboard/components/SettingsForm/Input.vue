<template>
  <div class="flex-1 my-3">
    <label
      v-if="title"
      :for="name"
      class="flex mb-2 font-sm text-stone-800 items-center"
    >
      <v-icon v-if="icon" :icon="icon" />

      <span>
        {{ title }}
      </span>
    </label>

    <Field
      :id="name"
      :name="name"
      :type="type"
      :rules="rules"
      v-model="modelValue"
      :placeholder="placeholder"
      :validate-on-input="true"
      class="block w-full py-2 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm outline-none"
    />

    <ErrorMessage :name="name" />
  </div>
</template>

<script setup>
import { ErrorMessage, Field, useField } from "vee-validate";

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: String,
    default: "required",
  },
  placeholder: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "text",
  },
});

const modelValue = defineModel();

const settings = useState("settings", () => ({}));

const { value } = useField(props.name, props.rules);

watch(value, (v) => {
  Object.assign(settings.value, { [props.name]: v });
});
</script>
