<template>
  <div
    class="bg-white shadow-[0_8px_36px_#1111110F] rounded-2xl overflow-hidden p-6 h-full w-full flex-1 flex-shrink min-w-0 relative flex flex-col gap-4 transition-all hover:!border-blue-500 mx-auto"
  >
    <nuxt-link
      :to="
        no_link ? '#' : { name: 'view-campaign', params: { id: campaign.id } }
      "
      :custom="no_link"
    >
      <template v-if="!no_img">
        <HomeCampaignSectionCampaignImage
          v-if="Object($slots).hasOwnProperty('default')"
          :imageUrl="campaign.image"
          :status="campaign.status"
          :campaign="campaign"
          :type="campaign.type"
        >
          <slot />
        </HomeCampaignSectionCampaignImage>
        <HomeCampaignSectionCampaignImage
          v-else
          :imageUrl="campaign?.image"
          :status="campaign?.status"
          :campaign="campaign"
          :type="campaign?.type"
        />
      </template>

      <HomeCampaignSectionCampaignDetails
        v-if="!no_details"
        :title="campaign?.campaign_name"
        :campaign_name="campaign?.name"
        :location="campaign?.country"
        :image="campaign?.logo"
        :content="campaign?.content"
        :campaign="campaign"
      />

      <HomeCampaignSectionCampaignProgress
        v-if="!no_progress"
        :goal="Number(campaign.price_target)"
        :paid="Number(campaign.total_amount)"
        :progress="
          +(campaign.total_amount / campaign.price_target).toFixed(2) * 100
        "
        :payment_monthly_count="campaign?.payment_monthly_count"
        :currency="campaign?.currency?.symbol || '$'"
      />
    </nuxt-link>
    <HomeCampaignSectionCampaignActions
      v-if="
        !no_btns &&
        Number(campaign.price_target) > Number(campaign.total_amount)
      "
      :id="campaign.id"
      :campaign="campaign"
    />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
defineProps({
  campaign: {
    type: Object,
    required: true,
  },
  no_link: {
    type: Boolean,
    default: false,
  },
  no_img: {
    type: Boolean,
    default: false,
  },
  no_details: {
    type: Boolean,
    default: false,
  },
  no_btns: {
    type: Boolean,
    default: false,
  },
  no_progress: {
    type: Boolean,
    default: false,
  },
});
</script>
