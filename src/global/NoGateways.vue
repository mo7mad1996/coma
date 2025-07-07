<template>
  <div class="text-center border border-neutral-200 rounded-lg p-4 mt-4">
    <h1 class="font-bold text-3xl underline">{{ $t("auth.error") }}</h1>
    <p class="text-red-700 my-3 py-6 px-5 bg-red-50">{{ $t("auth.sorry") }}!</p>

    <nuxt-link
      to="/contact"
      class="px-4 py-2 border rounded hover:bg-neutral-100 hover:shadow-sm d-inline-block"
      >{{ $t("global.contact_us") }}</nuxt-link
    >
  </div>
</template>
