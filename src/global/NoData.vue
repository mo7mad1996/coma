<template>
  <div
    v-if="
      (status == 'success' && Array.isArray(data) && data.length == 0) || !data
    "
    class="flex justify-center items-center py-12 bg-white rounded"
  >
    <div class="select-none">
      <div class="image flex justify-center">
        <img
          loading="lazy"
          src="~/assets/images/no-data.jpg"
          width="150"
          alt="orphans society image"
        />
      </div>
      <h6 class="text-center">{{ $t("global.no_data_") }}</h6>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  data: {
    type: null,
    required: true,
  },
});
</script>

<style scoped></style>
