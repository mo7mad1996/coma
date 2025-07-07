<template>
  <nuxt-link
    :to="{ name: 'video', params: { id: video.id } }"
    class="relative rounded-lg overflow-hidden p-4 h-full flex flex-col"
  >
    <img
      :src="video.thumbnail"
      :alt="video.title"
      class="w-full rounded-lg h-auto object-cover flex-1 max-h-64"
    />
    <p class="mt-3 text-black text-3xl">{{ video.title }}</p>
  </nuxt-link>
</template>

<script setup>
defineProps({
  video: Object,
});
</script>
