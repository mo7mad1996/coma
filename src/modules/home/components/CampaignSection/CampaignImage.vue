<template>
  <div class="relative">
    <div class="relative rounded-lg overflow-hidden">
      <img
        v-if="type == 'image'"
        :src="imageUrl || '/img/R.jpg'"
        :alt="campaign?.campaign_name"
        class="object-contain object-top w-full aspect-[344/231] flex items-center justify-center bg-zinc-300"
      />
      <video
        loop
        muted
        autoplay
        playsinline
        v-if="type == 'video'"
        :src="imageUrl"
        class="object-contain object-top w-full aspect-[344/231] flex items-center justify-center bg-zinc-300"
      />
      <!-- 
      <div class="absolute inset-0" v-if="campaign.booked">
        <img 
          :src="`/img/${locale}_.png`"
          class="rounded-3xl lg:w-full w-60 h-full object-contain m-auto drop-shadow"
          alt="booked"
        />
      </div> -->
      <div
        class="absolute inset-0 bg-[#0004] grid place-content-center"
        v-if="status == 'completed'"
      >
        <img :src="`/img/completed_${locale}_.svg`" class="" alt="completed" />
      </div>
    </div>

    <div class="absolute top-0 p-3 flex justify-between w-full items-start">
      <span
        v-if="status"
        class="rounded-full bg-sky-500 text-md py-2 px-4"
        :class="status"
      >
        {{ $t("home.state." + status) }}
      </span>

      <div class="flex gap-2" v-if="status != 'Campaign Completed!'">
        <template v-if="!Object($slots).hasOwnProperty('default')">
          <ClientOnly>
            <v-tooltip :text="$t('home.remind_me_to_donate')" location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  :ripple="false"
                  icon="mdi-calendar-multiselect-outline"
                  class="icon-btn"
                  :href="calendarUrl"
                  target="_blank"
                  elevation="0"
                  @click.stop
                  density="comfortable"
                />
              </template>
            </v-tooltip>
          </ClientOnly>

          <v-btn
            :ripple="false"
            icon="mdi-share-variant"
            class="icon-btn"
            elevation="0"
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
            density="comfortable"
          />
        </template>

        <slot v-bind="campaign" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sharePage } from "~/helpers/share";

// @ts-nocheck
const props = defineProps<{
  imageUrl?: string;
  status?: string;
  campaign: any;
  type: string;
}>();
const { t, locale } = useI18n();
const campaign = props.campaign;
const router = useRouter();
const path = router.resolve({
  name: "view-campaign",
  params: { id: campaign.id },
});
const fullLink = `https://orphanssociety.com${path.href}`;

const startDate = new Date();
startDate.setDate(startDate.getDate() + 7); // start date = today + 7 days

const endDate = new Date(startDate);
endDate.setHours(endDate.getHours() + 1); // 1 hour event

const startDateUTC = startDate.toISOString().replace(/[-:]/g, "").split(".")[0];
const endDateUTC = endDate.toISOString().replace(/[-:]/g, "").split(".")[0];

const eventDetails: any = {
  action: "TEMPLATE",
  text: `${t("home.donate_to")} ( ${campaign?.campaign_name} )`,
  details: `${fullLink}\n \n ${campaign?.content}`,
  dates: `${startDateUTC}/${endDateUTC}`,
};

const query = Object.keys(eventDetails)
  .map((key: string) => `${key}=${encodeURIComponent(eventDetails[key])}`)
  .join("&");

const calendarUrl = `https://calendar.google.com/calendar/render?${query}`;
</script>

<style lang="scss" scoped>
.icon-btn {
  background: white !important;
  color: #5566e5 !important;
}

.pending {
  background-color: #fff9db;
  color: #9e7b03;
}

.completed {
  background-color: #eaeaea;
  color: #000000;
}

.ended {
  background-color: #f0f0f0;
  color: #4a4a4a;
}

.published {
  background-color: #dbf9e1;
  color: #039e25;
}

.cancelled {
  background-color: #fde4e4;
  color: #c40303;
}

.reserved {
  background-color: #f3e8fd;
  color: #6b03c4;
}
</style>
