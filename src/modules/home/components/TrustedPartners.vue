<template>
  <section class="py-6 md:py-12 px-6">
    <div class="container mx-auto">
      <h2 class="text-lg md:!text-3xl font-bold text-black mb-4 md:!mb-8">
        {{ $t("home.trusted_partners") }}
      </h2>

      <!-- Swiper Slider -->
      <SkeletonLoaderCard :loading="status" :n="3" v-if="status == 'pending'" />
      <Carousel
        v-else
        ref="myCarousel"
        v-bind="{ ...options, dir: locale == 'en' ? 'ltr' : 'rtl' }"
      >
        <Slide v-for="(partner, index) in partners" :key="index">
          <a
            target="_blank"
            :href="partner.url"
            class="h-full flex items-center justify-center object-contain relative overflow-hidden group border"
          >
            <img
              loading="lazy"
              :src="partner.image"
              :alt="partner.name"
              class="aspect-square object-contain"
            />

            <h3
              class="text-center font-bold group-hover:bottom-0 bottom-[-100%] absolute w-full p-2 bg-[#818ba5] transition-all"
            >
              {{ partner.name }}
            </h3>
          </a>
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

const { locale } = useI18n();

const props = defineProps(["partners", "status"]);

const myCarousel = ref(null);
const options = {
  wrapAround: true,
  // pauseAutoplayOnHover: true,
  // autoplay: 3000, // 3s
  snapAlign: "start",
  gap: 8,

  breakpoints: {
    // this data from vuetify: https://vuetifyjs.com/en/features/display-and-platform/
    300: { itemsToShow: 2 },
    600: { itemsToShow: 2.8 },
    1280: { itemsToShow: 3.6 },
    1920: { itemsToShow: 4 },
    2560: { itemsToShow: 5 },
  },
};
</script>
