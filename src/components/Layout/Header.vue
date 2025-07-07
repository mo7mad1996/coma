<template>
  <nav
    class="header shadow nav-bottom bg-light nav-underline navbar navbar-expand-lg p-0 w-full sticky top-0 z-50 py-2"
  >
    <div class="container mx-auto">
      <!-- large screen -->
      <div
        class="items-center justify-between flex gap-4 max-md:flex-row-reverse"
      >
        <!-- Logo -->
        <div class="hidden md:!block">
          <GlobalHeaderLogo />
        </div>
        <!-- Links -->
        <div class="md:block hidden">
          <GlobalHeaderNavigationLinks />
        </div>

        <div class="flex gap-4 items-center max-md:flex-1">
          <div class="max-md:flex-1" />
          <!-- Search -->
          <div class="lg:flex hidden">
            <GlobalHeaderSearch />
          </div>

          <!-- Buttons -->
          <LazyGlobalHeaderButtonsAction />
        </div>

        <div class="md:hidden">
          <GlobalHeaderLogo />
        </div>

        <!-- cart -->
        <!-- <GlobalHeaderCart /> -->

        <div class="flex gap-4 items-center">
          <div class="2xl:flex hidden">
            <LazyGlobalHeaderSwitchLanguage />
          </div>
          <div class="xl:flex hidden">
            <LazyGlobalHeaderSwitchCurrency />
          </div>
        </div>

        <div class="max-md:flex-1">
          <button
            class="2xl:hidden flex items-center text-gray-600 hover:text-purple-600"
            @click="menuOpen = !menuOpen"
          >
            <v-icon icon="mdi-menu" />
          </button>
        </div>
      </div>

      <ClientOnly>
        <!-- small screen (Mobile) -->
        <v-navigation-drawer width="340" v-model="menuOpen" temporary>
          <v-layout class="lg:hidden text-center">
            <div class="p-4 w-full flex flex-col">
              <div class="lg:hidden -mx-4">
                <DashboardLayoutSidebar />
              </div>

              <!-- Links -->
              <div class="md:hidden">
                <GlobalHeaderNavigationLinks />
              </div>

              <!-- Search -->
              <div class="lg:hidden flex justify-center my-4">
                <GlobalHeaderSearch />
              </div>

              <div class="2xl:hidden">
                <LazyGlobalHeaderSwitchLanguage />
              </div>

              <div class="xl:hidden">
                <LazyGlobalHeaderSwitchCurrency />
              </div>
            </div>
          </v-layout>
        </v-navigation-drawer>
      </ClientOnly>
    </div>
  </nav>
</template>

<script setup>
const menuOpen = ref(false);

// @ts-ignore
import { useSettings } from "~/modules/home/services/settings";

const { data: settings } = useSettings();
const settings_state = useState("settings", () => ({}));

const color = computed(
  () =>
    settings_state.value?.header_text_color ||
    settings.value?.header_text_color ||
    "black"
);
const bgcolor = computed(
  () =>
    settings_state.value?.header_background_color ||
    settings.value?.header_background_color ||
    "white"
);
</script>

<style scoped>
.header {
  color: v-bind(color) !important;
  background: v-bind(bgcolor) !important;
}
</style>
