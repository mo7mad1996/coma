<template>
  <!-- photo -->
  <div>
    <label
      class="flex flex-col gap-4 max-md:flex-row items-center cursor-pointer"
    >
      <div
        class="relative flex cursor-pointer justify-center w-fit mx-auto group"
      >
        <img
          :src="preview"
          class="aspect-square rounded-full w-20 md:w-24 shadow object-cover block"
          alt=" "
        />

        <v-icon
          icon="mdi-pencil-box-outline"
          size="small"
          style="position: absolute"
          class="top-[70%] left-[70%] bg-white group-hover:flex hidden"
        />
        <Field
          type="file"
          @change="previewImage"
          :name="name"
          class="hidden"
          accept="image/*"
        />
      </div>

      <h3 class="font-bold md:text-center text-sm mt-2 mb-4 opacity-60">
        {{ title }}
      </h3>
    </label>

    <ErrorMessage class="error" :name="name" />
  </div>
</template>

<script setup>
import { Field, useField, ErrorMessage } from "vee-validate";

const settings = useState("settings", () => ({}));

const props = defineProps(["name", "title"]);
const { value, setValue } = useField(props.name, "");

const preview = ref(value.value || "/img/R.jpg");
const selectedFileName = ref(null);

const previewImage = (event) => {
  const input = event.target;
  const file = input.files ? input.files[0] : null;
  selectedFileName.value = file ? file.name : "";

  const file_url = URL.createObjectURL(file);
  // preview image
  Object.assign(settings.value, { [props.name]: file_url });
  setValue(file);
  preview.value = file_url;
};
</script>
