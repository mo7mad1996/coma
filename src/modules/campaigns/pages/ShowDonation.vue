<template>
  <div class="bg-gray-400 min-h-dvh py-2 grid place-content-center">
    <div class="custom-loader" v-if="status == 'pending'">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <CampaignsShowDonation v-if="status == 'success'" :donation="data" />
    <GlobalError
      :error="error"
      :status="status"
      :refresh="refresh"
      class="w-96 p-4"
    />
  </div>
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";
import { useShowDonation } from "../services/showDonation";

const { data, status, error, refresh } = useShowDonation();

definePageMeta({
  layout: "empty",
});

const { siteName } = useGlobalVar();
siteName("campaigns.page_title_donation");
</script>

<style scoped lang="scss">
.custom-loader {
  @apply flex gap-1;

  .bar {
    @apply w-1 h-4 bg-neutral-50 rounded-full;
    animation: scale-up4 1s linear infinite;
  }

  .bar:nth-child(2) {
    animation-delay: 0.25s;
  }

  .bar:nth-child(3) {
    animation-delay: 0.5s;
  }
}
</style>
