<template>
  <LazyDashboardLayoutContent :fetch="campaign">
    <template #header="data">
      <DashboardPageTitle
        :title="data.name"
        :subTitle="$t('global_dashboard.pages_title.campaigns-show')"
        :buttons="buttons(data)"
      />
    </template>

    <template v-slot="data">
      <div>
        <CampaignsDetailsImage
          :campaign="mapCampaignData(data)"
          :target="mapCampaignData(data).target"
          :amount="mapCampaignData(data).amount"
          :status="mapCampaignData(data).status"
        />
      </div>

      <div>
        <CampaignsDetailsContent
          :campaign="mapCampaignData(data) || {}"
          :target="mapCampaignData(data).target"
          :amount="mapCampaignData(data).amount"
          :status="mapCampaignData(data).status"
        />
      </div>
    </template>
  </LazyDashboardLayoutContent>
</template>

<script setup lang="ts">
import { useGlobalVar } from "~/helpers/global-var";
import { useCRUD } from "~/modules/dashboard/services/campaigns/beneficiary";

const { show, remove } = useCRUD();
const campaign = show();
const { siteName } = useGlobalVar();
const router = useRouter();
const { $alertDeleteQuestion } = useNuxtApp();

const { locale, t } = useI18n();

function mapCampaignData(src: any) {
  const original = JSON.parse(JSON.stringify(src));
  const translateField = (translations: any[], field: string) => {
    const t = translations.find((t) => t.locale === locale);
    return t ? t[field] : original[field] || "";
  };

  return {
    ...original,
    name: translateField(original.translations, "name") || original.name,
    content:
      translateField(original.translations, "content") || original.content,
    short_desc:
      translateField(original.translations, "short_desc") ||
      original.short_desc,
    orphan_name: original.orphan?.name || "",
    translations: original.translations || [],
    type: "image",
    remaining_days: 0,
    logo: original.orphan?.image_url || "",
    top_doners: { top: null, middle: null, first: null },
    latest: [],
    currency: {
      id: original.country?.id || "",
      name: original.country?.currency_name || "",
      symbol: original.country?.currency_symbol || "",
    },
    country: {
      id: original.country?.id || "",
      name: original.country?.name || "",
      iso: original.country?.iso || "",
    },
    category: {
      id: original.category?.id || "",
      name: original.category?.name || "",
    },
    tenant: null,
    target: original.price_target,
    amount: original.total_amount,
    status: original.status,
  };
}

siteName("global_dashboard.pages_title.campaigns-show");

const buttons: (data: any) => any[] = (data) => [
  {
    to: {
      name: "campaigns-edit",
      params: { id: data.id },
    },
    icon: "mdi-note-edit-outline",
    text: t("global_dashboard.pages_title.campaigns-edit"),
  },
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
