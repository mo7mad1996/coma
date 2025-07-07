<template>
  <div class="flex-1">
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

    <textarea
      v-model="modelValue"
      :id="name"
      :name="name"
      class="block w-full py-2 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm outline-none"
      :placeholder="placeholder"
    ></textarea>

    <ErrorMessage :name="name" />
  </div>
</template>

<script setup>
import { useField, ErrorMessage } from "vee-validate";

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
});

const modelValue = defineModel();
const { setValue, validate, value } = useField(props.name, props.rules);

watch(modelValue, (newValue) => {
  validate();
  setValue(newValue, true);
});

const settings = useState("settings", () => ({}));

watch(value, (v) => {
  Object.assign(settings.value, { [props.name]: v });
});
</script>
