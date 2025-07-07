<template>
  <div class="slider relative">
    <Carousel
      ref="myCarousel"
      v-bind="{ ...options, dir: 'ar' == locale ? 'rtl' : 'ltr' }"
    >
      <Slide v-for="(slide, index) in slideshows" :key="index">
        <HomeSliderCard :data="slide" />
      </Slide>

      <template #addons>
        <!-- <button
          @click="myCarousel?.next"
          class="navigation-btn absolute top-1/2 right-2 -translate-y-1/2"
        >
          <v-icon icon="mdi-chevron-right" />
        </button> -->
        <!-- <button
          @click="myCarousel?.prev"
          class="navigation-btn absolute top-1/2 left-2 -translate-y-1/2"
        >
          <v-icon icon="mdi-chevron-left" />
        </button> -->
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
// components
// @ts-ignore
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

// @ts-ignore
const props = defineProps<{
  slideshows?: [any];
  status: string;
}>();
const { locale } = useI18n();

const myCarousel: any = ref(null);
const options = {
  snapAlign: "start",
  autoplay: 0, // 4.5s
  wrapAround: true,
  pauseAutoplayOnHover: false,
  gap: 0,

  breakpoints: {
    // this data from vuetify: https://vuetifyjs.com/en/features/display-and-platform/
    300: { itemsToShow: 1 },
  },
};
</script>
