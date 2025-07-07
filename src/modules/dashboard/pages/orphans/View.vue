<template>
  <DashboardPageTitle
    :title="$t('global_dashboard.pages_title.orphans')"
    :buttons="buttons(1)"
  >
  </DashboardPageTitle>

  <LazyDashboardLayoutContent :fetch="orphans">
    <!-- Orphan Cards Grid -->
    <template v-slot="{ data }">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashboardOrphanCard
          v-for="(orphan, index) in data"
          :key="orphan.id"
          :orphan="orphan"
          @remove="remove(orphan.id).then((d: any) => data.splice(index, 1))"
        />
      </div>
    </template>

    <template #outside="{ meta }">
      <div
        class="pagination items-center justify-center pb-sm"
        v-if="meta && meta.last_page > 1"
      >
        <ClientOnly>
          <v-pagination
            :model-value="page"
            :length="meta.last_page"
            :total-visible="5"
          ></v-pagination>
        </ClientOnly>
      </div>
    </template>
  </LazyDashboardLayoutContent>
</template>

<script setup lang="ts">
import { useGlobalVar } from "~/helpers/global-var";

import {
  useOrphans,
  useCRUD,
} from "~/modules/dashboard/services/orphans/beneficiary";

const orphans = useOrphans();
const { t } = useI18n();
const { page } = orphans;

const { remove } = useCRUD();
const { siteName } = useGlobalVar();
siteName("global_dashboard.pages_title.orphans");

const buttons: (data: any) => any[] = (data) => [
  {
    to: { name: "orphans-create" },
    icon: "mdi-plus",
    text: t("global_dashboard.pages_title.orphans-create"),
  },
];
</script>
