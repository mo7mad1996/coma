<template>
  <div>
    <h3
      class="font-semibold text-lg mb-4"
      v-if="Array.isArray(pages) && pages.length"
    >
      {{ $t("home.orphans_community") }}
    </h3>
    <ul class="opacity-60 space-y-2">
      <template v-if="status === 'success' && Array.isArray(pages)">
        <li v-for="(page, index) in pages" :key="index">
          <NuxtLink :to="`/page/${page.id}`" class="hover:text-blue-500">
            {{ page.title }}
          </NuxtLink>
        </li>
      </template>
    </ul>
  </div>

  <div>
    <!-- <h3 class="font-semibold text-lg mb-4">
      {{ $t("home.orphans_community") }}
    </h3> -->

    <ul class="opacity-60 md:pt-8">
      <li v-for="(page, index) in sitePages" :key="index">
        <NuxtLink :to="page.to" class="hover:text-blue-500">
          {{ $t(page.title) }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useFooter } from "~/modules/home/services/footer";
import { usePages } from "~/modules/home/services/pages";
const { footer, footer_error } = useFooter();
const { pages, status, refresh } = usePages();

const sitePages = [
  { to: "/blogs", title: "global.blogs", show: true },
  { to: "/stories", title: "global.stories", show: true },
  { to: "/contact", title: "global.contact_us", show: true },
  { to: "/faqs", title: "global.footer_faqs", show: true },
  { to: "/videos", title: "global.videos", show: true },
];

watch(status, (v) => {
  if ("error" == v) {
    refresh();
  }
});
</script>
