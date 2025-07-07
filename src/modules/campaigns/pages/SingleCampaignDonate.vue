<template>
  <section class="bg-neutral-100 min-h-[50dvh]">
    <GlobalContainer>
      <div class="flex justify-center py-sm">
        <div
          class="bg-white rounded-xl md:overflow-hidden max-w-[730px] w-[90dvw]"
        >
          <AuthPageHeader>
            <nuxt-link
              :to="{
                name: 'view-campaign',
                params: { id: viewCampaign?.id },
              }"
              class="flex gap-4 items-center"
            >
              <div>
                <video
                  v-if="viewCampaign?.type == 'video'"
                  :src="viewCampaign?.image"
                  class="w-20 rounded-md"
                  loop
                  muted
                  autoplay
                  playsinline
                />
                <img
                  v-else
                  loading="lazy"
                  :src="viewCampaign?.image || '/img/R.jpg'"
                  class="w-20 rounded-md"
                  alt="orphans society image"
                />
              </div>
              <div class="flex flex-col">
                <p class="text-sm text-neutral-900 opacity-70">
                  {{ $t("campaigns.you_support") }}:
                </p>
                <h3 class="font-bold">
                  {{ viewCampaign?.orphan_name }}
                </h3>
              </div>
            </nuxt-link>
          </AuthPageHeader>

          <div class="p-0 md:!p-8">
            <CampaignsNewDesign
              v-if="viewCampaign"
              :campaignData="viewCampaign"
              :status="status"
            />
            <div class="loader my-2 mx-auto" v-else></div>
          </div>
        </div>
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup lang="ts">
// @ts-ignore
import { useGlobalVar } from "~/helpers/global-var";
import { useViewCampaign } from "../services/single-campaign";

// config
const route = useRoute();
const { siteName } = useGlobalVar();

const { viewCampaign, status, similarCampaigns } = useViewCampaign(
  route.params.id
);

watchEffect(() => {
  if (status.value == "error") {
    navigateTo(`/campaigns`);
  }
  siteName(null, viewCampaign.value?.name);
});
</script>
