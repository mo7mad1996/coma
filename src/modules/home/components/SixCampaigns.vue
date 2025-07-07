<template>
  <section class="px-6 my-12">
    <div class="container mx-auto">
      <h1 class="text-2xl sm:text-3xl font-bold text-black my-6">
        {{ $t("global.campaigns") }}
      </h1>

      <div class="flex lg:flex-row flex-col gap-4">
        <!-- col-1 -->
        <div
          class="flex-1 flex flex-col gap-4 max-w-full flex-shrink min-w-0"
          :class="{
            'one-element': campaigns?.published.length < 2,
            'two-element': campaigns?.published.length == 2,
          }"
          v-if="status == 'pending' || campaigns?.published.length"
        >
          <div
            class="max-lg:flex-1"
            v-for="campaign in campaigns?.published || 2"
            :key="campaign?.id"
          >
            <v-skeleton-loader type="card" v-if="status == 'pending'" />
            <HomeCampaignSectionCampaignCard v-else :campaign="campaign" />
          </div>
        </div>

        <!-- col-2 -->
        <div
          class="flex-1 flex flex-col gap-4 flex-shrink min-w-0"
          v-if="status == 'pending' || campaigns?.completed.length"
        >
          <div
            :class="{
              'one-element': campaigns?.completed.length < 2,
              'two-element': campaigns?.completed.length == 2,
            }"
            v-for="campaign in campaigns?.completed || 2"
            :key="campaign?.id"
          >
            <v-skeleton-loader type="card" v-if="status == 'pending'" />
            <HomeCampaignSectionCampaignCard
              v-else
              :campaign="campaign"
              class="h-full"
            />
          </div>
        </div>

        <!-- col-3 -->
        <div
          class="flex-1 flex flex-col gap-4 flex-shrink min-w-0"
          v-if="status == 'pending' || campaigns?.reserved.length"
        >
          <div
            :class="{
              'one-element': campaigns?.reserved.length < 2,
              'two-element': campaigns?.reserved.length == 2,
            }"
            class="max-lg:flex-1"
            v-for="campaign in campaigns?.reserved?.map((i) => ({
              ...i,
              status: 'reserved',
            })) || 2"
            :key="campaign?.id"
          >
            <v-skeleton-loader type="card" v-if="status == 'pending'" />
            <HomeCampaignSectionCampaignCard v-else :campaign="campaign" />
          </div>
        </div>
      </div>

      <button
        class="border border-blue-500 text-blue-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-500 hover:text-white transition w-full my-4"
        @click="$router.push({ name: 'campaigns' })"
      >
        {{ $t("home.view_all_campaigns") }}
      </button>
    </div>
  </section>
</template>

<script setup>
const props = defineProps(["campaigns", "status"]);
</script>

<style scoped>
.one-element {
  min-height: 50%;
  @apply pb-2;
}
.two-element {
  @apply flex-1;
}
</style>
