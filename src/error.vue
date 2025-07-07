<template>
  <v-locale-provider :rtl="locale === 'ar'">
    <v-layout>
      <v-app height="100">
        <div class="bg-stone-700 h-full">
          <GlobalContainer>
            <div
              class="py-xl px-md flex flex-col items-center text-center gap-3"
            >
              <div class="h-fit">
                <p class="opacity-60 text-gray-400">Path: {{ error.url }}</p>

                <h1 class="text-6xl font-bold text-red-700 mb-2">
                  {{ error.statusCode }}
                </h1>
              </div>

              <div
                class="flex flex-col gap-10 w-full text-left rounded"
                style="direction: ltr"
              >
                <div class="h-fit">
                  <h3
                    class="text-lg opacity-80 w-fit px-3 py-2 text-red-500 bold border-s-8"
                  >
                    {{ error?.message }}
                    <p
                      class="text-md font-semibold text-red-400 underline opacity-60 px-2"
                    >
                      {{ error.statusMessage }}
                    </p>
                  </h3>
                </div>

                <pre
                  class="leading-7 h-auto bg-stone-800 px-3 py-4 rounded-lg shadow text-green-400 overflow-auto h-96"
                  >{{ error.stack }}</pre
                >
              </div>

              <nuxt-link
                to="/"
                class="fixed bottom-24 left-1/2 -translate-x-1/2 px-12 py-4 text-lg rounded shadow bg-indigo-700 hover:bg-indigo-600 hover:underline text-indigo-50"
              >
                {{ $t("global.return_home") }}
              </nuxt-link>
            </div>
          </GlobalContainer>
        </div>
      </v-app>
    </v-layout>
  </v-locale-provider>
</template>

<script setup>
const error = useError();
const { locale } = useI18n();

console.error(error.value);
</script>
