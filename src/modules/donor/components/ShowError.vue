<template>
  <div
    v-if="error"
    class="py-28 text-center flex justify-center items-center flex-col gap-4"
  >
    <v-icon icon="mdi-alert-circle-outline" size="100" class="text-red-600" />
    <div class="bg-red-100 shadow-md rounded-md p-6 select-none">
      <h1 class="text-5xl mb-4" style="direction: ltr">Opps!</h1>
      <p class="text-2xl p-4 bg-white rounded-lg text-neutral-500">
        {{ error?.message }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps(["error"]);
</script>
