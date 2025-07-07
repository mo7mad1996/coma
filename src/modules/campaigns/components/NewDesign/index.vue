<template>
  <!-- 
  <GlobalContainer>
      <div class="md:grid grid-cols-6 gap-4 mb-16">
      <div class="col" />
      <div class="col-span-1 mb-2">
        <v-skeleton-loader
          class="h-32"
          type="image"
          v-if="status == 'pending'"
        />

        <div class="mt-4" v-else>
          <video
            v-if="campaignData?.type == 'video'"
            :src="campaignData?.image"
            class="h-32 m-auto"
            loop
            muted
            autoplay
            playsinline
          />
          <img 
            v-else
            :src="campaignData?.image || '/img/R.jpg'"
            :alt="campaignData?.name"
            class="h-32 m-auto"
          />

          <span class="text-xs text-blue-600 mt-1">
            {{ Math.min(progress, 100) }}%
          </span>
          <div class="w-full flex items-center bg-gray-200 rounded-full h-1">
            <div
              class="bg-purple-600 h-[6px] rounded-full"
              :style="{
                width: progress + '%',
              }"
            />
          </div>
          <div
            v-if="typeof campaignData?.payment_monthly_count != 'undefined'"
            class="grid grid-cols-12 my-3 rounded-full overflow-hidden gap-[1px] bg-green-300 shadow-md"
          >
            <span
              v-for="i in 12"
              :key="i"
              class="col-span-1 py-1 px-2"
              :class="
                i > campaignData?.payment_monthly_count
                  ? 'bg-white'
                  : 'bg-green-600'
              "
            />
          </div>
        </div>
      </div>

      <div class="col-span-3">
        <v-skeleton-loader type="article" v-if="status == 'pending'" />
        <div v-else>
          <h3 class="text-base text-slate-500">
            {{ $t("campaigns.you_support") }}:

            <span class="text-lg font-bold text-slate-950">
              {{ campaignData?.name }}
            </span>
          </h3>
          <p class="mt-12 text-justify" v-html="campaignData?.content"></p>
        </div>
      </div>
    </div>

    <div class="grid place-content-center">
    </div>
  </GlobalContainer> 
  -->

  <div class="grid place-content-center">
    <CampaignsDonationForm />
  </div>
</template>

<script setup>
const props = defineProps(["campaignData", "status"]);

const { locale } = useI18n();

const progress = computed(() =>
  props.campaignData
    ? +(
        (props.campaignData?.total_amount / props.campaignData?.price_target) *
        100
      ).toFixed(2)
    : 0
);
</script>
