<template>
  <div>
    <BreadCrumb>
      <template #first_page>
        <NuxtLink to="/">
          {{ $t("global.home") }}
        </NuxtLink>
      </template>
      <template #second_page>
        <NuxtLink to="/campaigns">
          {{ $t("campaigns.campaigns") }}
        </NuxtLink>
      </template>
      <template #third_page> {{ viewCampaign?.name }} </template>
    </BreadCrumb>

    <GlobalContainer class="relative">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="order-1 lg:order-1 hidden lg:block">
          <CampaignsViewActions
            :campaign="viewCampaign || {}"
            :target="target"
            :amount="amount"
            :status="status"
          />
        </div>
        <div class="order-2 lg:order-2 lg:col-span-2 flex flex-col gap-4">
          <div>
            <CampaignsDetailsImage
              :campaign="viewCampaign"
              :target="target"
              :amount="amount"
              :status="status"
            />
          </div>
          <div class="lg:hidden">
            <CampaignsViewActions
              :campaign="viewCampaign || {}"
              :target="target"
              :amount="amount"
              :status="status"
            />
          </div>
          <div>
            <CampaignsDetailsContent
              :campaign="viewCampaign"
              :target="target"
              :amount="amount"
              :status="status"
            />
          </div>
        </div>
      </div>

      <CampaignsSimilarCampaigns
        v-if="similarCampaigns?.length"
        :similarCampaigns="similarCampaigns"
      />
    </GlobalContainer>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import BreadCrumb from "~/global/BreadCrumb.vue";
import { useViewCampaign } from "../services/single-campaign";

const route = useRoute();
const { viewCampaign, status, target, amount, similarCampaigns } =
  useViewCampaign(route.params.id);

watchEffect(() => {
  if (status.value == "error") {
    navigateTo(`/campaigns`);
  }
});

watchEffect(() => {
  if (viewCampaign.value) {
    useSeoMeta({
      title: viewCampaign.value.name,
      ogTitle: viewCampaign.value.name,
      ogImage: viewCampaign.value.image,
      description: viewCampaign.value.content,
    });
  }
});
</script>
