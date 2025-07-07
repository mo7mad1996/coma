<template>
  <div class="text-start flex flex-col gap-4">
    <hr />

    <div class="gap-1 flex">
      <span class="font-bold">{{ paid }} $</span>
      <span class="font-normal">{{ $t("global.raised_of") }}</span>
      <span class="font-normal text-neutral-900 opacity-70">
        {{ goal }} $
      </span>
    </div>

    <!-- Progress Bar -->
    <div class="flex gap-2 items-baseline progress_bar">
      <div class="w-full bg-gray-100 rounded-full h-2">
        <div
          class="bg-indigo-500 h-full rounded-full"
          :style="{ width: progress + '%', maxWidth: '100%' }"
        ></div>
      </div>
      <span class="text-md text-blue-600 mt-1 block">
        {{ Math.min(progress, 100) }}%
      </span>
    </div>

    <div
      class="grid grid-cols-12 rounded-full overflow-hidden bg-neutral-100"
      v-if="'undefined' != typeof payment_monthly_count"
    >
      <span
        v-for="i in 12"
        :key="i"
        class="col-span-1 py-1 rounded-full border"
        :class="i > payment_monthly_count ? 'bg-white' : 'bg-violet-500'"
      ></span>
    </div>

    <!-- Goal & Paid -->
    <!-- <div class="flex justify-between mt-4 gap-2">
      <div
        class="flex flex-col justify-start bg-gray-100 px-6 py-4 rounded-lg w-full"
      >
        <p class="text-black font-bold text-xl">{{ $t("home.goal") }}</p>
        <p class="text-blue-600 font-bold text-lg">
          {{ toCurrency(goal) }} {{ currency }}
        </p>
      </div>
      <div
        class="flex flex-col justify-start bg-gray-100 px-6 py-4 rounded-lg w-full"
      >
        <p class="text-black font-bold text-xl">{{ $t("home.paid") }}</p>
        <p class="text-blue-600 font-bold text-lg">
          {{ toCurrency(paid) }} {{ currency }}
        </p>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
const props = defineProps<{
  goal: number;
  paid: number;
  progress: number;
  currency: string;
  payment_monthly_count?: number;
}>();

const toCurrency = (number: number) =>
  new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
    number
  );
</script>
