<template>
  <GlobalContainer>
    <BreadCrumb>
      <template #first_page>
        <nuxt-link href="/">{{ $t("global.home") }}</nuxt-link>
      </template>
      <template #second_page>
        <nuxt-link to="/videos">{{ $t("videos.videos") }}</nuxt-link>
      </template>
      <template #third_page> {{ video?.title }} </template>
    </BreadCrumb>
    <div class="content">
      <div class="flex justify-center">
        <div class="content_text py-5 w-[792px]">
          <!-- title -->
          <v-skeleton-loader
            v-if="status == 'pending'"
            type=" text, table-heading, image"
          />
          <h1
            v-if="status == 'success'"
            class="lg:text-4xl text-start xl:text-4xl md:text-3xl text-3xl font-bold leading-[54px]"
          >
            {{ video?.title }}
          </h1>

          <div class="flex items-center pt-2 justify-between">
            <!-- writer -->
            <div class="flex items-center gap-x-2">
              <img
                loading="lazy"
                src="~/assets/images/honor-company.svg "
                alt="orphanssociety image"
              />
              <span>{{ video?.user?.name }}</span>
            </div>

            <!-- reading time and date -->
            <div class="flex items-center gap-x-sm">
              <span>{{ reFormat2(video?.created_at) }}</span>
            </div>
          </div>

          <p
            v-if="status == 'success'"
            class="text_one text-justify text-[20px] text-[#121212] leading-[32px] pt-4"
          >
            <!-- {{ video?.description }} -->
          </p>

          <!-- second text -->
          <div class="pt-4" v-if="status == 'success'">
            <div class="video-container" v-if="video">
              <ClientOnly>
                <LazyYoutube
                  :src="video?.video_url"
                  :customTitle="video?.title"
                  :customThumbnail="video?.thumbnail"
                  max-width="100%"
                  aspect-ratio="16:9"
                  thumbnail-quality="standard"
                  iframe-policy="credentialless"
                  style="width: 100%; height: auto"
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <BlogSimilarBlogs v-if="video.length > 0" :similar="video?.similar_blogs" :status="status" /> -->
  </GlobalContainer>
</template>

<script setup lang="ts">
// @ts-ignore
import BreadCrumb from "~/global/BreadCrumb.vue";
import { reFormat2 } from "~/helpers/format-date";

import { useGlobalVar } from "~/helpers/global-var";
import { useShowVideo } from "../services/single-video";

const route = useRoute();

const { video, status } = useShowVideo(route.params.id);

const { siteName } = useGlobalVar();
watchEffect(() => {
  if (video.value)
    useSeoMeta({
      title: video.value.title,
      ogTitle: video.value.title,
      ogImage: video.value.thumbnail,
      twitterCard: video.value.thumbnail,
    });
});
</script>
