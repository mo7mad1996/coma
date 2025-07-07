<template>
  <section
    class="relative w-full h-max min-h-[60vh] py-12 flex items-center justify-start text-white"
  >
    <!-- Hero Image  -->
    <div class="absolute inset-0 pointer-events-none">
      <img
        src="~/assets/images/homepage/hero.png"
        alt="Hero Image"
        class="w-full h-full object-cover object-top"
      />
    </div>

    <!-- section content -->
    <div class="container mx-auto w-full">
      <div class="relative z-10 ps-8 md:!ps-32 text-start mx-auto">
        <main class="md:max-w-3xl">
          <h1 class="text-4xl md:text-6xl font-bold">
            {{ $t("home.hero_title") }}
          </h1>
          <p class="mt-4 text-md">
            {{ $t("home.hero_description") }}
          </p>
          <div class="mt-6 flex flex-col md:flex-row gap-6 justify-start">
            <button
              class="bg-purple-600 text-white px-6 py-4 flex items-center justify-center gap-2 rounded-xl text-lg font-semibold transition hover:opacity-80"
            >
              {{ $t("home.add_to_support") }}

              <v-icon>mdi-plus</v-icon>
            </button>
            <!-- <button
              class="bg-purple-600 text-white px-6 py-4 flex items-center justify-center gap-2 rounded-xl text-lg font-semibold transition hover:opacity-80"
            >
              {{ $t("home.sponsor_now") }}

              <v-icon v-if="locale == 'en'">mdi-arrow-right-thin</v-icon>
              <v-icon v-if="locale == 'ar'">mdi-arrow-left-thin</v-icon>
            </button> -->
            <button
              class="border border-blue-400 text-white px-6 py-4 flex items-center justify-center gap-2 rounded-xl text-lg font-semibold transition hover:opacity-80 second-btn"
            >
              {{ $t("home.remind_me_to_donate") }}

              <v-icon v-if="locale == 'en'">mdi-arrow-right-thin</v-icon>
              <v-icon v-if="locale == 'ar'">mdi-arrow-left-thin</v-icon>
            </button>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script setup>
const { locale } = useI18n();
</script>

<style scoped>
/* Additional styling if needed */
.second-btn {
  backdrop-filter: blur(5px);
}
</style>
