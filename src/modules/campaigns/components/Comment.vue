<template>
  <div
    v-if="comment"
    class="comment my-2 py-3 px-3 rounded-lg bg-neutral-50 shadow"
  >
    <div>
      <div class="flex gap-2 items-center">
        <img
          v-if="comment.user?.photo"
          class="border !border-indigo-500 rounded-full object-cover aspect-square w-12 bg-white"
          loading="lazy"
          :src="comment.user?.photo"
          :alt="comment.user?.name || comment.name"
        />

        <h4 class="font-bold" v-if="comment.name">
          {{ comment.name }}
        </h4>
        <span class="w-1 h-1 block rounded-full bg-black opacity-25"></span>
        <p class="text-xs text-[#12121299] pt-1">
          <ClientOnly>
            {{ reFormat(comment.created_at) }}
          </ClientOnly>
        </p>
      </div>

      <p class="text-sm leading-20 text-justify py-3 px-4 mt-2 rounded">
        {{ comment.love_comment }}
        {{ comment.comment }}
      </p>
    </div>

    <div class="flex-1">
      <div class="sub md:ps-sm">
        <CampaignsComment
          v-for="(c, index) in comment.childs"
          :key="index"
          :comment="c"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["comment"]);
const { locale } = useI18n();
import { ClientOnly } from "#components";
import { reFormat } from "~/helpers/format-date";
</script>

<style scoped lang="scss">
.sub {
  img {
    @apply w-10;
  }
  .comment {
    @apply shadow-none;
    background-color: rgba(255, 255, 255, 0.4) !important;
  }
}
</style>
