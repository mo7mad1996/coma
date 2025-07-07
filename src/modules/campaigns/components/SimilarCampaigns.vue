<template>
  <section
    v-if="similarCampaigns?.length > 0"
    aria-label="ramadan chalenges"
    class="pt-sm pb-sm"
  >
    <GlobalContainer>
      <h1
        class="text-black font-bold lg:text-4xl md:text-4xl text-3xl mb-sm opacity-75"
      >
        {{ $t("campaigns.similar_campaigns") }}
      </h1>

      <Carousel
        snapAlign="start"
        v-bind="settings"
        :wrapAround="true"
        :breakpoints="breakpoints1"
        class="mt-4"
        :dir="locale == 'ar' ? 'rtl' : 'ltr'"
        :gap="24"
      >
        <Slide v-for="(campaign, index) in similarCampaigns" :key="index">
          <!-- Use unique `campaign.id` as the key -->
          <!-- <Card
            :id="campaign?.id"
            :rate="(campaign?.total_amount / campaign?.price_target) * 100"
            :shadow="true"
            :donateBtn="true"
            :status="campaign?.status"
            :route="`/campaigns/donate/${campaign.id}`"
            :in_cart="campaign?.in_cart || false"
            :cart_status="campaign?.cart_status || ''"
            :cart_id="campaign?.cart_id || ''"
          >
            <template #image>
              <img 
                loading="lazy"
                @click="navigateTo(`/campaigns/${campaign?.id}`)"
                :src="campaign?.image || '/img/R.jpg'"
                class="w-full max-h-[15rem] object-cover rounded-lg"
                alt="....."
              />
            </template>

            <template #company>
              <img 
                src="~/assets/images/honor-company.svg"
                alt="orphanssociety image"
                loading="lazy"
              />
              <span>
                {{ campaign?.user?.name }}
              </span>
            </template>

            <template #title>{{ campaign?.name }}</template>

            <template #desc>
              <span
                v-html="stripHtmlTags(campaign?.short_desc)?.slice(0, 30)"
              ></span>
            </template>

            <template #subscribers>{{ campaign?.total_donors }}</template>

            <template #total_donation>${{ campaign?.price_target }}</template>

            <template #donation>${{ campaign?.total_amount }}</template>
            <template #payment_monthly_count>
              <div
                v-if="typeof campaign.payment_monthly_count != 'undefined'"
                class="grid grid-cols-12 my-3 rounded-full overflow-hidden gap-[1px] bg-green-300 shadow-md"
              >
                <span
                  v-for="i in 12"
                  :key="i"
                  class="col-span-1 py-1 px-2"
                  :class="
                    i > campaign.payment_monthly_count
                      ? 'bg-white'
                      : 'bg-green-600'
                  "
                />
              </div>
            </template>
          </Card>
          -->
          <HomeCampaignSectionCampaignCard :campaign="campaign" />
        </Slide>

        <!-- <template #addons>
          <pagination />
        </template> -->
      </Carousel>
    </GlobalContainer>
  </section>
</template>

<script setup>
import { stripHtmlTags } from "~/helpers/string";
import Card from "../../../global/Card.vue";

import { useCarousel } from "../../../helpers/carousel";
const { breakpoints1, settings, Carousel, Slide, Pagination } = useCarousel();
const { locale } = useI18n();

const props = defineProps({
  similarCampaigns: {
    required: true,
  },
});
</script>
