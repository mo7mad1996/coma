<template>
  <v-locale-provider :rtl="locale == 'ar'">
    <v-app>
      <v-main class="flex flex-col min-h-screen bg-neutral-100">
        <LayoutHeader />
        <GlobalContainer class="pt-10">
          <div class="grid grid-cols-12 gap-4">
            <!-- Sidebar Toggle Button (Small Screens) -->
            <div class="lg:hidden col-span-12 flex justify-start mb-4">
              <v-btn
                color="primary"
                size="small"
                variant="outlined"
                elevation="0"
                @click="isSidebarOpen = true"
                style="text-transform: capitalize"
              >
                <v-icon class="mr-2">mdi-menu</v-icon>
                Menu
              </v-btn>
            </div>

            <!-- Sidebar (Large Screens) -->
            <div
              class="hidden lg:block lg:col-span-3 xl:col-span-2 h-full sticky top-0"
            >
              <DonorSidebar />
            </div>

            <!-- Main Content -->
            <div class="col-span-12 lg:col-span-9 xl:col-span-10">
              <slot />
            </div>
          </div>
        </GlobalContainer>
        <v-spacer />

        <LayoutFooter />

        <!-- Sidebar as a Drawer (Small Screens) -->
        <v-navigation-drawer
          v-model="isSidebarOpen"
          v-if="isClient"
          temporary
          location="left"
          class="v-navigation-drawer--mobile lg:hidden"
        >
          <div class="p-4">
            <DonorSidebar />
          </div>
        </v-navigation-drawer>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import DonorSidebar from "~/global/DonorSidebar.vue";

const { locale } = useI18n();
const router = useRouter();

const isClient = ref(false);
const isSidebarOpen = ref(false);

useHead({
  htmlAttrs: {
    dir: locale.value === "ar" ? "rtl" : "ltr",
  },
});

onMounted(() => {
  isClient.value = true;
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
