<template>
  <section class="py-5 md:!py-10 px-4">
    <div class="container mx-auto">
      <div class="flex justify-between items-center mb-3 md:mb-6">
        <h2 class="text-lg md:!text-3xl font-bold text-black">
          {{ $t(sectionName) }}
        </h2>
        <button
          class="border !border-blue-500 text-blue-500 text-center max-md:text-sm px-2 md:!px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
          @click="$router.push({ name: 'campaigns' })"
        >
          {{ $t("home.view_all_campaigns") }}
        </button>
      </div>

      <!-- Campaign Cards Slider -->
      <SkeletonLoaderCard :loading="status" :n="3" v-if="status == 'pending'" />

      <Carousel
        ref="myCarousel"
        v-bind="{ ...options, dir: locale == 'en' ? 'ltr' : 'rtl' }"
        v-else
      >
        <Slide v-for="(campaign, index) in campaigns" :key="index">
          <HomeCampaignSectionCampaignCard :campaign="campaign" />
        </Slide>

        <template #addons>
          <div
            class="relative md:inline-flex hidden gap-4 ltr:flex-row-reverse my-6 items-center"
          >
            <button @click="myCarousel?.prev" class="navigation-btn">
              <v-icon icon="mdi-chevron-right" />
            </button>
            <Pagination />
            <button @click="myCarousel?.next" class="navigation-btn">
              <v-icon icon="mdi-chevron-left" />
            </button>
          </div>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
// components
// @ts-ignore
import SkeletonLoaderCard from "~/global/SkeletonLoaderCard.vue";
// @ts-ignore
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

// @ts-ignore
const props = defineProps<{
  sectionName: string;
  campaigns: [any];
  status: string;
}>();
const { locale } = useI18n();

const myCarousel: any = ref(null);
const options = {
  snapAlign: "start",
  // autoplay: 4500, // 4.5s
  autoplay: 0,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  gap: 8,

  breakpoints: {
    // this data from vuetify: https://vuetifyjs.com/en/features/display-and-platform/
    300: { itemsToShow: 1 },
    600: { itemsToShow: 2 },
    1280: { itemsToShow: 4 },
  },
};
</script>

<style scoped>
.campaign-swiper {
  padding-bottom: 40px;
}
</style>
