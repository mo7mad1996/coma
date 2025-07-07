<template>
  <GlobalContainer>
    <BreadCrumb>
      <template #first_page>
        <NuxtLink to="/">
          {{ $t("global.home") }}
        </NuxtLink>
      </template>
      <template #second_page>
        <NuxtLink to="/blogs">
          {{ $t("blogs.blogs") }}
        </NuxtLink>
      </template>
      <template #third_page> {{ singleBlog?.title }} </template>
    </BreadCrumb>

    <div class="content">
      <div class="video">
        <img
          loading="lazy"
          v-if="singleBlog?.image && status == 'success'"
          class="rounded-md object-cover cursor-pointer w-full lg:h-[500px] xl:h-[500px] md:h-full h-full"
          :src="singleBlog?.image"
          alt="blog"
        />
        <video
          v-if="singleBlog?.video && status == 'success'"
          class="rounded-md object-cover cursor-pointer w-full lg:h-[500px] xl:h-[500px] md:h-full h-full"
          :src="singleBlog?.image"
        />
      </div>

      <div class="flex justify-center">
        <div class="content_text py-5 w-[792px]">
          <!-- title -->
          <v-skeleton-loader
            v-if="status == 'pending'"
            type="list-item-two-line"
          />
          <h1
            v-if="status == 'success'"
            class="lg:text-4xl text-start xl:text-4xl md:text-3xl text-3xl font-bold leading-[54px]"
          >
            {{ singleBlog?.title }}
          </h1>
          <!-- here -->

          <div class="flex items-center pt-2 justify-between">
            <!-- writer -->
            <div class="flex items-center gap-x-2">
              <img
                loading="lazy"
                src="~/assets/images/honor-company.svg "
                alt="orphanssociety image"
              />
              <span>{{ singleBlog?.user?.full_name }}</span>
            </div>

            <!-- reading time and date -->
            <div class="flex items-center gap-x-sm">
              <span>{{ reFormat2(singleBlog?.created_at) }}</span>
            </div>
          </div>

          <!-- first text -->
          <template v-if="status == 'pending'">
            <v-skeleton-loader
              v-for="(item, index) in 3"
              :key="index"
              type="list-item-two-line"
            />
          </template>

          <p
            v-if="status == 'success'"
            class="text_one text-justify text-[20px] text-[#121212] leading-[32px] pt-4"
          >
            {{ singleBlog?.description }}
          </p>

          <!-- second text -->
          <div class="pt-4" v-if="status == 'success'">
            <p
              class="text-[20px] text-[#121212] leading-[32px] text-justify"
              v-html="singleBlog?.content"
            />
          </div>

          <div class="pt-4" v-if="status == 'success'">
            <Carousel
              ref="myCarousel"
              v-bind="{ ...options, dir: 'ar' == locale ? 'rtl' : 'ltr' }"
            >
              <Slide
                v-for="(slide, index) in singleBlog?.attachments?.map((i : any) => i.url)"
                :key="index"
              >
                <img
                  loading="lazy"
                  :src="slide"
                  class="w-full max-h-96 object-cover rounded-lg border"
                  alt="orphanssociety image"
                />
              </Slide>
            </Carousel>
          </div>
        </div>
      </div>
    </div>

    <BlogSimilarBlogs
      v-if="singleBlog && singleBlog.similar_blogs?.length > 0"
      :similar="singleBlog?.similar_blogs"
      :status="status"
    />
  </GlobalContainer>
</template>

<script setup lang="ts">
// @ts-ignore
import BreadCrumb from "~/global/BreadCrumb.vue";
import { reFormat2 } from "~/helpers/format-date";
import { useSingleBlog } from "../services/single-blog";

import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
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

const route = useRoute();
const { locale } = useI18n();

const { singleBlog, status } = useSingleBlog(route.params.id);

watchEffect(() => {
  if (status.value == "error") {
    navigateTo("/blogs");
  }
});

watchEffect(() => {
  if (singleBlog.value) {
    useSeoMeta({
      title: singleBlog.value.title,
      ogTitle: singleBlog.value.title,
      ogImage: singleBlog.value.image,
      twitterCard: singleBlog.value.image,
      description: singleBlog.value.content,
      ogDescription: singleBlog.value.content,
    });
  }
});
</script>
