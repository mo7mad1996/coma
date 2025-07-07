<template>
  <v-skeleton-loader
    v-if="status == 'pending'"
    width="100%"
    class="!rounded-[16px] overflow-hidden aspect-video"
  />

  <div
    v-else
    class="image relative rounded-[16px] overflow-hidden bg-[#D9D9D9]"
  >
    <video
      v-if="campaign?.type == 'video'"
      :src="campaign?.image"
      class="w-full aspect-video object-contain rounded-lg"
      loop
      muted
      autoplay
      playsinline
    />
    <img
      v-else
      loading="lazy"
      :src="campaign?.image || '/img/R.jpg'"
      class="w-full aspect-video object-contain rounded-lg"
      alt="orphans society image"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  campaign: {
    required: true,
  },
  target: {
    required: true,
  },
  amount: {
    required: true,
  },
  status: {
    required: true,
  },
});
</script>
