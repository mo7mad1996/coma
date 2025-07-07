<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex justify-between gap-4">
      <div class="flex items-center gap-4">
        <div v-if="location?.iso">
          <img
            height="30"
            v-if="location?.iso && location?.iso.toLocaleLowerCase() != 'il'"
            :src="`https://flagcdn.com/${location?.iso.toLocaleLowerCase()}.svg`"
            :alt="location?.name"
            class="rounded h-5 w-auto"
          />
        </div>
        <span class="text-neutral-900 opacity-80 text-sm">
          {{ location?.name }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <v-icon icon="mdi-account-multiple-outline" color="#8957E9" />

        <span class="text-neutral-900 text-sm">
          {{ campaign.total_donors }}
        </span>
      </div>
    </div>

    <div class="gap-4 flex flex-col">
      <h3 class="sm:text-xl text-start">{{ title }}</h3>
      <p
        v-html="content"
        class="text-neutral-900 opacity-60 text-sm text-start"
        :class="{ ' line-clamp-2': !show }"
      ></p>
      <!-- <span
        class="text-blue-700 text-xs underline hover:no-underline text-start"
        @click.prevent.stop="show = true"
        v-if="!show"
      >
        {{ $t("global.read_more") }}.
      </span> -->
    </div>

    <!-- 
      <div class="flex items-center gap-3">
      <img 
        :src="image || company_logo"
        alt="Company Logo"
        class="shadow rounded-full aspect-square w-14"
      />

      <div class="flex-1">
        <h3 class="sm:text-xl text-start">{{ title }}</h3>
        <p
          class="text-gray-700 text-md mt-1 flex gap-1 items-center"
          v-if="location && location.name"
        >
          <v-icon icon="mdi-map-marker" class="h-6 text-[#596de7]" />
          <span> {{ location.name }} </span>
        </p>
      </div>
      <div v-if="location?.iso">
        <img 
          width="30"
          v-if="location?.iso && location?.iso.toLocaleLowerCase() != 'il'"
          :src="`https://flagcdn.com/${location.iso.toLocaleLowerCase()}.svg`"
          :alt="location.name"
        />
      </div>
    </div>
    <h3 class="sm:text-ms text-start mt-3">
      {{ campaign_name }}...

      <span
        class="text-blue-700 text-xs underline hover:no-underline"
        @click.prevent.stop="show = true"
        v-if="!show"
      >
        {{ $t("global.read_more") }}.
      </span>
    </h3>
    <p v-html="content" v-if="show" class="text-sm p-4 text-gray-500"></p>
    -->
  </div>
</template>

<script setup>
import company_logo from "~/assets/images/homepage/company_logo.png";

// props
const props = defineProps([
  "title",
  "location",
  "image",
  "campaign_name",
  "content",
  "campaign",
]);
const show = ref(false);
</script>
