<template>
  <footer class="footer py-8 border-t border-gray-200 bottom-0">
    <div
      class="container mx-auto px-4 grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-start"
    >
      <GlobalFooterLeftSection :settings="data || {}" />

      <GlobalFooterCompanyLinks />

      <GlobalFooterContactUs :settings="data || {}" />

      <!-- <GlobalFooterNewsletter /> -->
    </div>

    <div class="mt-8 max-md:!text-start text-center opacity-60">
      {{ $t("global.copy_right") }}
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useSettings } from "~/modules/home/services/settings";

const { data } = useSettings();
const settings: any = useState("settings", () => ({}));

const color = computed(
  () =>
    settings.value?.footer_text_color ||
    data.value?.footer_text_color ||
    "black"
);

const bgcolor = computed(
  () =>
    settings.value?.footer_background_color ||
    data.value?.footer_background_color ||
    "white"
);
</script>

<style scoped>
.footer {
  color: v-bind(color) !important;
  background: v-bind(bgcolor) !important;
}
</style>
