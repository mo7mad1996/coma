<template>
  <section
    class="relative w-full h-max py-12 flex items-center justify-start text-white"
  >
    <!-- Hero Image  -->
    <div class="absolute inset-0 pointer-events-none">
      <img
        v-if="'image' == data.slide_type"
        priority
        preload
        :src="data.image"
        alt="Hero Image"
        class="w-full h-full object-cover object-top"
      />
      <video
        v-else-if="'video' == data.slide_type"
        :src="data.video"
        loop
        muted
        autoplay
        playsinline
        class="w-full h-full object-cover object-top"
      />
      <div
        v-else
        class="w-full h-full object-cover object-top"
        style="background-image: linear-gradient(#0052d4, #65c7f7, #9cecfb)"
      ></div>
    </div>

    <div class="container mx-auto w-full flex flex-col min-h-[60vh]">
      <div class="flex-1"></div>
      <!-- section content -->
      <div class="relative z-10 md:!ps-32 text-center md:text-start">
        <main class="md:max-w-3xl">
          <h1
            class="text-2xl md:text-5xl leading-none mb-sm font-bold md:text-start"
          >
            {{ data.title }}
          </h1>
          <section
            v-html="data.content"
            class="mt-4 text-md md:text-start"
          ></section>
          <div class="mt-6 flex flex-col md:flex-row gap-6 justify-start">
            <a
              :href="data.url"
              target="_blank"
              class="bg-purple-600 text-white px-2 md:!px-6 py-4 flex items-center justify-center gap-2 rounded-xl text-lg font-semibold transition hover:opacity-80"
            >
              <span class="one-line">
                {{ data.url_title }}
              </span>

              <v-icon v-if="locale == 'en'">mdi-arrow-right-thin</v-icon>
              <v-icon v-if="locale == 'ar'">mdi-arrow-left-thin</v-icon>
            </a>
          </div>
        </main>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps(["data"]);
const { locale } = useI18n();
</script>
