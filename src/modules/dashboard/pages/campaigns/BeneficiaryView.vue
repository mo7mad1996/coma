<template>
  <DashboardPageTitle
    :title="$t('global.campaigns')"
    :buttons="buttons(1)"
  ></DashboardPageTitle>

  <LazyDashboardLayoutContent :fetch="campaigns">
    <template #loader="{ status }">
      <GlobalSkeletonLoader :loading="status" />
    </template>

    <template v-slot="{ data }">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4"
        v-if="data"
      >
        <nuxt-link
          v-for="(campaign, index) in data"
          :key="campaign?.id"
          :to="{ name: 'campaigns-show', params: { id: campaign?.id } }"
          class="block"
        >
          <HomeCampaignSectionCampaignCard
            no_progress
            no_btns
            no_link
            :campaign="{ type: 'image', ...campaign }"
          >
            <div class="flex gap-2 items-center">
              <button
                @click.prevent.stop="
                  $alertDeleteQuestion({
                    imageUrl: campaign.image,
                    title: [$t('donor.remove'), campaign.campaign_name].join(
                      ' '
                    ),
                    preConfirm: async () => {
                      await remove(campaign.id);
                      data?.splice(index, 1);
                    },
                  })
                "
                class="text-red-400 bg-red-50 hover:bg-red-100 rounded-full w-10 aspect-square grid place-content-center"
              >
                <v-icon icon="mdi-close" />
              </button>

              <button
                @click.prevent.stop="
                  sharePage(
                    campaign.orphan_name,
                    $t('global.share.text'),
                    $router.resolve({
                      name: 'view-campaign',
                      params: { id: campaign.id },
                    }).href
                  )
                "
                class="text-indigo-500 bg-white hover:!bg-indigo-50 rounded-full w-10 aspect-square grid place-content-center"
              >
                <v-icon icon="mdi-share-variant" size="small" />
              </button>
            </div>
          </HomeCampaignSectionCampaignCard>
        </nuxt-link>
      </div>
    </template>

    <template #outside="{ meta }">
      <ClientOnly>
        <div
          class="pagination items-center justify-center pb-sm"
          v-if="meta && meta.last_page > 1"
        >
          <v-pagination
            :model-value="page"
            :length="meta.last_page"
            :total-visible="5"
          />
        </div>
      </ClientOnly>
    </template>
  </LazyDashboardLayoutContent>
</template>

<script setup lang="ts">
import { sharePage } from "~/helpers/share";
import { useTenant } from "~/helpers/tenant";
import { useAuth } from "~/modules/auth/services/auth";
import {
  useBeneficiaryCampaigns,
  useCRUD,
} from "~/modules/dashboard/services/campaigns/beneficiary";
const campaigns = useBeneficiaryCampaigns();
const { page } = campaigns;

const { $toast, $alertDeleteQuestion }: any = useNuxtApp();

const { baseURl } = useTenant();
const { t } = useI18n();
const { user } = useAuth();

const { remove } = useCRUD();

const buttons: (data: any) => any[] = (data) => [
  {
    to: { name: "campaigns-create" },
    icon: "mdi-plus",
    text: t("global_dashboard.add_campaign"),
  },
  {
    to: user.value?.website_url,
    target: "_blank",
    tag: "a",
    icon: "mdi-web",
    text: t("global_dashboard.website"),
  },
  {
    acton: () => {
      const text = `https://${baseURl}/create/website?referral_id=${user.value.tenant_id}`;

      navigator.clipboard
        .writeText(text)
        .then(() => $toast.success(t("global_dashboard.success_copy")))
        .catch((err) => {
          $toast.error(err.message);
          console.error("Failed to copy: ", err);
        });
    },
    icon: "mdi-content-copy",
    text: t("global_dashboard.referral_link"),
  },
];
</script>
