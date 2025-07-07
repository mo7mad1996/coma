<template>
  <div
    class="bg-zinc-50 border border-[#0000000D] rounded-t-xl flex gap-4 md:gap-8 items-start p-3 md:!px-10 md:py-6"
  >
    <template v-if="!$slots.default">
      <div>
        <img
          src="~/assets/images/logo.png"
          alt="orphan logo"
          class="aspect-square object-contain w-20 block"
        />
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold text-2xl md:text-3xl">{{ title }}</h3>
        <p class="text-xs md:!text-sm text-neutral-900 opacity-70">
          {{ description }}
        </p>
      </div>
    </template>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps(["title", "description"]);
</script>
