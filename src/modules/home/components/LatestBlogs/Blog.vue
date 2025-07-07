<template>
  <div class="rounded overflow-hidden bg-white h-full w-full flex flex-col">
    <nuxt-link
      :to="{
        name: 'blog',
        params: { id: data.id },
      }"
      :aria-label="data.title"
    >
      <Carousel
        ref="myCarousel"
        v-bind="{ ...options, dir: 'ar' == locale ? 'rtl' : 'ltr' }"
      >
        <Slide
          v-for="(slide, index) in [
            data?.image || '/img/R.jpg',
            ...data.attachments.map((i) => i.url),
          ]"
          :key="index"
        >
          <img
            loading="lazy"
            :src="slide"
            class="w-full max-h-[15rem] object-cover rounded-lg border"
            alt="orphanssociety image"
          />
        </Slide>
      </Carousel>
    </nuxt-link>

    <div class="px-4 md:text-start flex flex-col flex-1">
      <h2 class="md:!text-xl text-md my-2">{{ data.title }}</h2>

      <p class="text-gray-400 text-sm flex-1 line-clamp-3">
        {{ data.description }}
      </p>

      <nuxt-link
        class="py-4 group inline-flex gap-3 items-center text-md"
        :aria-label="data.title"
        :to="{
          name: 'blog',
          params: { id: data.id },
        }"
      >
        <span class="group-hover:underline text-md text-blue-500">
          {{ $t("global.see_more") }}
        </span>
        <v-icon
          v-if="locale == 'ar'"
          style="font-size: inherit"
          icon="mdi-arrow-left"
        />
        <v-icon
          v-if="locale == 'en'"
          style="font-size: inherit"
          icon="mdi-arrow-right"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["data"]);
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const options = {
  snapAlign: "start",
  autoplay: 3500, // 3.5s
  wrapAround: true,
  pauseAutoplayOnHover: false,
  gap: 0,

  breakpoints: {
    // this data from vuetify: https://vuetifyjs.com/en/features/display-and-platform/
    300: { itemsToShow: 1 },
  },
};
// methods
const { locale } = useI18n();
</script>
