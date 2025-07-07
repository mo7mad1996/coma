<template>
  <DashboardPageTitle :title="$t('donor.settings')" />

  <!--
  <LazyDashboardLayoutContent :fetchData="fetch">
    <template v-slot="{ data }">
       <DashboardSettings :data="data" :isLoading="isLoading" @submit="update" />
      </template>
    </LazyDashboardLayoutContent>
    -->
</template>

<script setup lang="ts">
import { useGlobalVar } from "~/helpers/global-var";

import {
  useNgoSettings,
  useCRUD,
} from "@/modules/dashboard/services/ngoSettings";
const { fetch } = useNgoSettings();

// const { update, isLoading } = useCRUD();

const { siteName } = useGlobalVar();

siteName("global_dashboard.pages_title.settings");
</script>
