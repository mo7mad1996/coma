<template>
  <BeneficiaryCampaigns v-if="user.user_type == 'beneficiary'" />
  <DashboardCampaigns v-else />
</template>

<script setup lang="ts">
import { useGlobalVar } from "~/helpers/global-var";
import { useAuth } from "~/modules/auth/services/auth";

import BeneficiaryCampaigns from "./campaigns/BeneficiaryView.vue";
import DashboardCampaigns from "./campaigns/DashboardView.vue";

const { user } = useAuth();

const { siteName } = useGlobalVar();
siteName("global_dashboard.pages_title.home");
</script>
