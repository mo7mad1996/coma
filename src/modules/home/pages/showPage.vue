<template>
  <div>
    <BreadCrumb>
      <template #first_page> {{ $t("global.home") }} </template>
      <template #second_page> {{ page?.title }} </template>
    </BreadCrumb>

    <div class="flex justify-center pb-lg">
      <div class="content xl:w-[80%] lg:w-[90%] md:w-[80%] w-[80%]">
        <div>
          <v-skeleton-loader v-if="status == 'pending'" type="image, article" />

          <template v-if="status == 'success'">
            <h1 class="font-bold text-[32px] leading-[48px]">
              {{ page?.title }}
            </h1>

            <div class="pt-sm">
              <div class="text-justify text-[#121212] text-sm leading-20 pt-4">
                <div v-html="processedContent"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import BreadCrumb from "~/global/BreadCrumb.vue";
import { useGlobalVar } from "~/helpers/global-var";
import { useShowPage } from "../services/page";
const route = useRoute();

const { page, status } = useShowPage(route.params.id);
const { siteName } = useGlobalVar();
const processedContent = ref("");

function convertOembedToIframe(html) {
  return html.replace(/<oembed\s+url="(.*?)"><\/oembed>/gi, (match, url) => {
    const youtubeMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return `
          <div class="video-wrapper">
            <iframe 
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>`;
    }
    return "";
  });
}

watch(status, () => {
  if (status.value === "success") {
    siteName(null, page.value.title);
    processedContent.value = convertOembedToIframe(page.value.content || "");
    useSeoMeta({
      description: page.value.content,
    });
  }
});
</script>
<style setup="scope">
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  max-width: 100%;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
