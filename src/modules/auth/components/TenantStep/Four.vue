<template>
  <p class="text-center p-4 bg-[#f2f0e2] rounded-md my-6">
    {{ $t("auth.tenant.message." + status) }}
    <br />

    <a
      :href="website_url"
      target="_blank"
      class="text-blue-600 underline py-2 inline-block hover:no-underline"
    >
      {{ website_url }}
    </a>
  </p>

  <div class="flex gap-4 items-center">
    <a
      v-if="dashboard_url"
      :href="dashboard_url"
      target="_blank"
      class="flex flex-1 text-center gap-2 border border-gray-300 rounded-lg py-3 px-4 items-center justify-center hover:bg-zinc-50"
    >
      <span>{{ $t("donor.dashboard") }}</span>
      <v-icon icon="mdi-export"></v-icon>
    </a>
    <a
      v-if="website_url"
      :href="website_url"
      target="_blank"
      class="flex flex-1 text-center gap-2 border border-gray-300 rounded-lg py-3 px-4 items-center justify-center hover:bg-zinc-50"
    >
      <span>{{ $t("donor.website") }}</span>
      <v-icon icon="mdi-export"></v-icon>
    </a>
  </div>

  <v-btn
    to="/"
    variant="flat"
    size="large"
    color="primary"
    class="text-capitalize rounded-lg w-100 mt-2"
    >{{ $t("auth.tenant.home") }}</v-btn
  >
</template>
<script setup>
const props = defineProps(["dashboard_url", "website_url", "status"]);
</script>
