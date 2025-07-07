<template>
  <DashboardPageTitle :title="$t('global_dashboard.campaigns')">
    <div class="flex gap-2">
      <nuxt-link
        :to="user?.website_url"
        target="_blank"
        class="rounded-2xl bg-indigo-600 cursor-pointer px-4 py-2 flex md:gap-3 items-center justify-center hover:bg-indigo-500 text-white"
      >
        <v-icon icon="mdi-web" size="small" class="block" />
        <span class="max-md:hidden block">
          {{ $t("global_dashboard.website") }}
        </span>
      </nuxt-link>

      <button
        @click="copy"
        class="active:scale-x-95 transition-all rounded-2xl bg-indigo-600 cursor-pointer px-4 py-2 flex md:gap-3 items-center justify-center hover:bg-indigo-500 text-white"
      >
        <v-icon icon="mdi-content-copy" size="small" class="block" />
        <span class="max-md:hidden block">
          {{ $t("global_dashboard.referral_link") }}
        </span>
      </button>
    </div>
  </DashboardPageTitle>

  <div
    class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4"
    v-if="status == 'success' && data.length"
  >
    <HomeCampaignSectionCampaignCard
      no_progress
      no_btns
      v-for="(campaign, index) in data"
      :key="campaign.id"
      :campaign="campaign"
    >
      <div class="flex gap-2 items-center">
        <button
          @click.prevent.stop="
            alertDeleteQuestion({
              theme: 'bulma',
              imageUrl: campaign.image,
              title: [$t('donor.remove'), campaign.campaign_name].join(' '),
              text: $t('donor.delete_question'),
              imageHeight: '120px',
              showCancelButton: true,
              cancelButtonText: $t('donor.cancel'),
              confirmButtonText: $t('donor.remove'),

              customClass: {
                confirmButton:
                  'text-red-400 !bg-red-50 hover:!bg-red-100 border !border-transparent ',
                cancelButton:
                  '!bg-transparent hover:border hover:!bg-neutral-100 ',
                backdrop: 'bg-[#1113]',
                popup: 'bg-neutral-100 pb-3 p-3',
                actions: 'bg-white flex gap-2 w-full py-2 rounded-lg',
              },

              preConfirm: async () => {
                Swal.showLoading();
                await remove(campaign, index);
                Swal.hideLoading();
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
  </div>

  <GlobalSkeletonLoader :loading="status" />
  <GlobalNoData :status="status" :data="data" />
  <GlobalError :status="status" :error="error" :refresh="refresh" />

  <div
    class="pagination items-center justify-center pb-sm"
    v-if="meta?.last_page > 1"
  >
    <ClientOnly>
      <v-pagination
        @update:modelValue="updatePage"
        :length="meta.last_page"
        :total-visible="5"
      ></v-pagination>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { sharePage } from "~/helpers/share";
import { useTenant } from "~/helpers/tenant";
import { useAuth } from "~/modules/auth/services/auth";
import { useBooking } from "~/modules/home/services/booking";
import { useUserCampaigns } from "~/modules/dashboard/services/campaigns/tenant";

const { $toast }: any = useNuxtApp();
const { baseURl } = useTenant();
const { un_book } = useBooking();
const { t } = useI18n();
const { user } = useAuth();
const { data, status, error, meta, updatePage, refresh }: any =
  useUserCampaigns();

const copy = () => {
  const text = `https://${baseURl}/create/website?referral_id=${user.value.tenant_id}`;

  navigator.clipboard
    .writeText(text)
    .then(() => $toast.success(t("global_dashboard.success_copy")))
    .catch((err) => {
      $toast.error(err.message);
      console.error("Failed to copy: ", err);
    });
};

const alertDeleteQuestion = (options: any = {}) => {
  Swal.fire({
    ...options,
  }).then(options.cb);
};

const remove = (campaign: any, index: number) =>
  un_book(campaign, () => data.value?.splice(index, 1));
</script>
