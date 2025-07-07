<template>
  <v-locale-provider :rtl="locale == 'ar'">
    <v-app>
      <v-main class="flex flex-col min-h-screen bg-neutral-100">
        <LayoutHeader />

        <div class="h-full">
          <div class="grid grid-cols-12 gap-4 h-full">
            <!-- Sidebar (Large Screens) -->
            <div
              class="hidden lg:block lg:col-span-3 xl:col-span-2 h-full sticky top-0"
            >
              <DashboardLayoutSidebar />
            </div>

            <!-- Main Content -->
            <section
              class="p-2 md:p-6 col-span-12 lg:col-span-9 xl:col-span-10"
            >
              <slot />
            </section>
          </div>
        </div>
        <v-spacer />

        <LayoutFooter />
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const isSidebarOpen = ref(false);

useHead({
  htmlAttrs: {
    dir: locale.value === "ar" ? "rtl" : "ltr",
  },
});

watch(locale, (newLocale) => {
  const isArabic = newLocale === "ar";
  useHead({
    htmlAttrs: {
      dir: isArabic ? "rtl" : "ltr",
    },
  });
});
</script>
