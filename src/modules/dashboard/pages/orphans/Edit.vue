<template>
  <LazyDashboardLayoutContent :fetch="show()">
    <template #header="data">
      <DashboardPageTitle
        :title="data.name"
        :subTitle="$t('global_dashboard.pages_title.orphans-edit')"
        :buttons="[
          {
            // action:  () =>
          },
        ]"
      />
    </template>

    <template v-slot="data">
      <DashboardOrphanForm
        @submit="edit"
        :isLoading="isLoading"
        :defaultValues="data"
      />
    </template>
  </LazyDashboardLayoutContent>
</template>

<script setup lang="ts">
import { useGlobalVar } from "~/helpers/global-var";
import { useCRUD } from "~/modules/dashboard/services/orphans/beneficiary";

const { show, isLoading, edit, remove } = useCRUD();
const { siteName } = useGlobalVar();

siteName("global_dashboard.pages_title.orphans-edit");
</script>
