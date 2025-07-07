<template>
  <div class="z-50 fixed top-1/2 left-0 -translate-y-1/2">
    <div class="flex items-center left-icons" style="direction: rtl">
      <label class="text-2xl md:hidden p-2 rounded-md">
        <v-icon icon="mdi-chevron-left"></v-icon>
        <input type="checkbox" class="hidden" checked />
      </label>

      <div class="flex flex-col gap-4 buttons">
        <button
          @click="openDialog"
          class="bg-purple-600 text-white w-24 py-4 rounded-r-md shadow-md text-sm hover:bg-purple-700 flex items-center justify-center flex-col"
        >
          <img :src="gift" alt="gift" />
          {{ $t("global.donate_now") }}
        </button>
        <button
          v-if="user"
          @click="
            sharePage(
              $t('global.share.title'),
              $t('global.share.text'),
              user.website_url
            )
          "
          class="bg-purple-600 text-white w-24 py-4 rounded-r-md shadow-md text-sm hover:bg-purple-700 flex items-center justify-center flex-col"
        >
          <v-icon icon="mdi-share" />{{ $t("campaigns.share_your_page_link") }}
        </button>
        <ClientOnly>
          <a
            target="_blank"
            :href="calendarUrl"
            class="blockScrollX bg-purple-600 text-white w-24 py-4 rounded-r-md shadow-md text-sm hover:bg-purple-700 flex items-center justify-center flex-col text-center"
          >
            <v-icon icon="mdi-calendar-multiselect-outline" />
            {{ $t("home.remind_me_to_donate") }}
          </a>
        </ClientOnly>
      </div>
    </div>
  </div>

  <dialog
    class="dialog m-auto rounded-[10px] overflow-hidden py-2"
    ref="donate"
  >
    <div class="p-4 overflow-hidden h-[90vh] relative" ref="container">
      <div
        class="close-icon w-full flex justify-end top-0 absolute left-0 z-10 py-4 px-4"
      >
        <button
          class="text-red-400 bg-red-50 hover:bg-red-100 rounded-full w-10 max-md:scale-75 aspect-square grid place-content-center"
          @click="closeDialog"
        >
          <v-icon class="cursor-pointer">mdi-close</v-icon>
        </button>
      </div>
      <CampaignsDonationForm />
    </div>
  </dialog>
</template>

<script setup>
import { sharePage } from "~/helpers/share";
import gift from "~/assets/images/donate/gift.svg";
import { useAuth } from "~/modules/auth/services/auth";
const { $initPerfectScrollbar } = useNuxtApp();
const { t } = useI18n();

const container = ref(null);

const { user } = useAuth();
const donate = ref("");

const openDialog = () => {
  donate.value?.showModal();
};

const closeDialog = () => {
  donate.value?.close();
};

const fullLink = `https://orphanssociety.com/`;

watch(container, (v) => {
  if (container.value) {
    $initPerfectScrollbar(container.value);
  }
});

const startDate = new Date();
startDate.setDate(startDate.getDate() + 7); // start date = today + 7 days

const endDate = new Date(startDate);
endDate.setHours(endDate.getHours() + 1); // 1 hour event

const startDateUTC = startDate.toISOString().replace(/[-:]/g, "").split(".")[0];
const endDateUTC = endDate.toISOString().replace(/[-:]/g, "").split(".")[0];

const eventDetails = {
  action: "TEMPLATE",
  text: `${t("home.donate_to")} ( ${t("home.site_name")} )`,
  details: `${fullLink}`,
  dates: `${startDateUTC}/${endDateUTC}`,
};

const query = Object.keys(eventDetails)
  .map((key) => `${key}=${encodeURIComponent(eventDetails[key])}`)
  .join("&");

const calendarUrl = `https://calendar.google.com/calendar/render?${query}`;
</script>

<style lang="scss" scoped>
.left-icons {
  &:has(input:checked) label {
    transform: rotate(180deg);
  }

  &:has(input:checked) .buttons {
    @apply hidden md:flex;
  }
}
</style>
