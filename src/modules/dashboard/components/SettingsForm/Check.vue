<template>
  <client-only>
    <v-switch
      v-model="modelValue"
      color="purple-darken-3"
      :label="title"
      true-value="on"
      false-value="off"
    ></v-switch>
  </client-only>
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
});

const { setValue, validate, value } = useField(props.name, "");
const settings = useState("settings", () => ({}));

const modelValue = defineModel();

modelValue.value = value.value || "off"; // Default color

setValue(modelValue.value, true);

watch(modelValue, (newValue) => {
  validate();
  setValue(newValue, true);
});
watch(value, (v) => {
  Object.assign(settings.value, { [props.name]: v });
});
</script>
