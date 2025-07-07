<template>
  <!-- photo -->
  <div>
    <label
      for="photo"
      class="relative flex cursor-pointer justify-center w-fit mx-auto group"
    >
      <img
        :src="preview || '/img/placeholderImage.jpg'"
        class="aspect-square rounded-full w-24 shadow object-cover"
        alt=" "
      />

      <v-icon
        icon="mdi-pencil-box-outline"
        size="small"
        style="position: absolute"
        class="top-[70%] left-[70%] bg-white group-hover:flex hidden"
      />
    </label>

    <div class="hidden">
      <Field type="file" @change="previewImage" name="photo" id="photo" />
    </div>
  </div>
  <template v-if="apiErrors.photo">
    <p
      class="error text-center"
      v-for="(err, n) in apiErrors.photo"
      :key="n"
      v-html="err"
    />
  </template>
</template>

<script setup>
import { useAuth } from "~/modules/auth/services/auth";
import { Field } from "vee-validate";

const { user } = useAuth();
const props = defineProps(["apiErrors"]);

const preview = ref(user.value?.photo);
const selectedFileName = ref(null);

const previewImage = (event) => {
  const input = event.target;
  const file = input.files ? input.files[0] : null;
  selectedFileName.value = file ? file.name : "";

  // preview image
  preview.value = URL.createObjectURL(file);
};
</script>
