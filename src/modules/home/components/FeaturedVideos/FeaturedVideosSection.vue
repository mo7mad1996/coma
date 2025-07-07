<template>
  <section class="py-10 px-4 sm:px-6">
    <div class="container mx-auto">
      <div class="flex justify-between items-center mb-3 md:mb-6">
        <h2 class="text-lg md:!text-3xl font-bold text-black">
          {{ $t("home.featured_videos") }}
        </h2>
        <nuxt-link
          :to="{ name: 'videos' }"
          class="border !border-blue-500 text-blue-500 text-center max-md:text-sm px-2 md:!px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          {{ $t("home.view_more_videos") }}
        </nuxt-link>
      </div>

      <!-- Slider -->
      <SkeletonLoaderCard :loading="status" :n="3" v-if="status == 'pending'" />
      <Carousel
        v-else
        ref="myCarousel"
        v-bind="{ ...options, dir: locale == 'en' ? 'ltr' : 'rtl' }"
      >
        <Slide v-for="(video, index) in videos" :key="index">
          <HomeFeaturedVideosVideoCard :video="video" />
        </Slide>

        <template #addons>
          <div
            class="relative md:inline-flex hidden gap-4 ltr:flex-row-reverse my-6 items-center"
          >
            <button @click="myCarousel?.prev()" class="navigation-btn">
              <v-icon icon="mdi-chevron-right" />
            </button>
            <Pagination />
            <button @click="myCarousel?.next()" class="navigation-btn">
              <v-icon icon="mdi-chevron-left" />
            </button>
          </div>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup>
// components
// @ts-ignore
import SkeletonLoaderCard from "~/global/SkeletonLoaderCard.vue";
// @ts-ignore
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const props = defineProps(["videos", "status"]);

const { locale } = useI18n();

const myCarousel = ref(null);
const options = {
  snapAlign: "start",
  autoplay: 0, // 3s
  wrapAround: true,
  pauseAutoplayOnHover: true,
  gap: 8,

  breakpoints: {
    // this data from vuetify: https://vuetifyjs.com/en/features/display-and-platform/
    300: { itemsToShow: 1.4 },
    600: { itemsToShow: 1.8 },
    1280: { itemsToShow: 2 },
    1920: { itemsToShow: 2 },
    2560: { itemsToShow: 3 },
  },
};
</script>

<style scoped>
.video-swiper {
  padding-bottom: 40px;
}
</style>
