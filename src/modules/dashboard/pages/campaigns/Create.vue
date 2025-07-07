<template>
  <DashboardPageTitle
    :title="$t('global_dashboard.pages_title.create_campaign')"
  />

  <DashboardLayoutContent>
    <DashboardCampaignForm @submit="create" :isLoading="isLoading" />
  </DashboardLayoutContent>
</template>

<script setup lang="ts">
import { useGlobalVar } from "~/helpers/global-var";
import { useCRUD } from "~/modules/dashboard/services/campaigns/beneficiary";

const { create, isLoading } = useCRUD();
const { siteName } = useGlobalVar();

siteName("global_dashboard.pages_title.create_campaign");
</script>
