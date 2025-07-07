<template>
  <v-btn
    :disabled="isLoading"
    :loading="isLoading"
    color="#8b5cf6"
    class="mt-6 w-full"
    type="submit"
    size="large"
  >
    {{ text || $t("donor.save") }}
  </v-btn>
</template>

<script setup>
const props = defineProps({
  text: { type: String, default: "" },
  isLoading: { type: Boolean, default: false },
});
</script>
