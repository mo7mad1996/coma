<template>
  <LazyDashboardLayoutContent :fetch="campaign">
    <template #header="{ data }">
      <DashboardPageTitle
        :title="data && data.name"
        :sub-title="$t('global_dashboard.pages_title.campaigns-edit')"
        :buttons="data && buttons(data)"
      />
    </template>

    <template v-slot="{ data }">
      <DashboardCampaignForm
        v-if="data"
        @submit="edit"
        :isLoading="isLoading"
        :defaultValues="data"
      />
    </template>
  </LazyDashboardLayoutContent>
</template>

<script setup lang="ts">
import { useGlobalVar } from "~/helpers/global-var";
import { useCRUD } from "~/modules/dashboard/services/campaigns/beneficiary";

const router = useRouter();
const { $alertDeleteQuestion } = useNuxtApp();
const { show, edit, isLoading, remove } = useCRUD();
const campaign = show();
const { siteName } = useGlobalVar();
const { t } = useI18n();

siteName("global_dashboard.pages_title.campaigns-edit");

const buttons: (data: any) => any[] = (data) => [
  {
    text: t("global_dashboard.pages_title.campaigns-delete"),
    icon: "mdi-file-document-remove-outline",
    async action() {
      await $alertDeleteQuestion({
        imageUrl: data.image,
        title: [t("donor.remove"), data.name].join(" "),
        preConfirm: () =>
          remove(data.id).then(() => {
            router.push({ name: "home-dashboard" });
          }),
      });
    },
  },
];
</script>
