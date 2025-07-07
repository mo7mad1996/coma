<template>
  <BreadCrumb>
    <template #first_page>
      <a :href="'/'">{{ $t("global.home") }}</a>
    </template>
    <template #second_page> {{ $t("blogs.blogs") }} </template>
  </BreadCrumb>

  <GlobalContainer class="all-campaigns">
    <h1 class="text-black font-bold lg:text-4xl md:text-4xl text-3xl">
      {{ $t("blogs.blogs") }}
    </h1>

    <SkeletonLoader :loading="status" />

    <div
      v-if="status == 'success'"
      class="campaigns grid gap-sm pt-sm pb-sm grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2"
    >
      <BlogCard
        v-for="(blog, index) in blogs"
        :key="blog?.id"
        :route="`/blogs/${blog.id}`"
        class="h-full"
        :to="`/blogs/${blog.id}`"
      >
        <template #image>
          <Carousel
            ref="myCarousel"
            v-bind="{ ...options, dir: 'ar' == locale ? 'rtl' : 'ltr' }"
          >
            <Slide
              v-for="(slide, index) in [
                blog?.image || '/img/R.jpg',
                ...blog.attachments.map((i) => i.url),
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
        </template>

        <template #title>{{ blog.title }}</template>

        <template #desc
          >{{ blog.description.slice(0, 110) }}.....<span
            class="underline text-sm font-semibold"
            >Read More</span
          >
        </template>
      </BlogCard>
    </div>

    <div class="pagination items-center justify-center pb-sm">
      <ClientOnly>
        <v-pagination
          v-if="fetchBlogs.length > 0"
          v-model="currentPage"
          :length="blogsMeta.last_page"
          @input="fetchBlogs"
          :total-visible="5"
        ></v-pagination>
      </ClientOnly>
    </div>

    <NoData :data="blogs" :status="status" />
  </GlobalContainer>
</template>

<script setup>
import BreadCrumb from "~/global/BreadCrumb.vue";
import NoData from "~/global/NoData.vue";
import SkeletonLoader from "~/global/SkeletonLoader.vue";
import { useGlobalVar } from "~/helpers/global-var";
import { useBlogs } from "../services/blogs";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
const { locale } = useI18n();

const options = {
  snapAlign: "start",
  autoplay: 4500, // 4.5s
  wrapAround: true,
  pauseAutoplayOnHover: false,
  gap: 0,

  breakpoints: {
    // this data from vuetify: https://vuetifyjs.com/en/features/display-and-platform/
    300: { itemsToShow: 1 },
  },
};
const page = ref(2);
const isLoading = ref(true);

const { ramadan_ar, ramadan_en } = useGlobalVar();
const { blogs, blogsMeta, refresh, status, clear, currentPage } = useBlogs();

const fetchBlogs = () => {
  refresh();
};

watch(currentPage, (newPage) => {
  fetchBlogs();
});

const { siteName } = useGlobalVar();
siteName("blogs.page_title_blogs");

// only simulation for test skeleton loader
setTimeout(() => {
  isLoading.value = false;
}, 3000);
</script>
