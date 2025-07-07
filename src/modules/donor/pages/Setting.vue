<template>
  <div class="dashboard_campaigns pb-sm">
    <div class="content pt-sm">
      <DonorAccountSettings />
    </div>
  </div>
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";

const { siteName } = useGlobalVar();
siteName("donor.page_title_settings");
definePageMeta({
  layout: "donor",
  middleware: "require-auth",
});
</script>
