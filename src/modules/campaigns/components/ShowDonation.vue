<template>
  <div
    class="py-2 md:!py-8 bg-slate-50 rounded-3xl"
    :class="{ rtl: locale == 'ar' }"
  >
    <div
      class="px-3 md:!px-7 flex flex-col gap-2 md:!gap-5 items-center justify-center"
    >
      <nuxt-link to="/" class="block" target="_blank">
        <img
          alt="logo"
          src="~/assets/images/logo.png"
          class="h-14 md:!h-24 block"
        />
      </nuxt-link>

      <div class="relative w-fit rounded-md overflow-hidden p-1">
        <div
          class="bg-red-800 back"
          :class="{ 'rtl-shadow': locale == 'ar' }"
        ></div>

        <div class="relative">
          <div
            class="bg-white overflow-hidden rounded-b rounded-t-lg w-[544px] max-w-[80vw]"
          >
            <img
              src="~/assets/images/success-stories.jpeg"
              class="object-cover grayscale-[70%] w-full aspect-[544/84] min-h-8"
            />

            <div class="py-4 px-4 md:!p-10 gap-6 flex flex-col">
              <h3>{{ $t("campaigns.donation.gift_received_title") }}</h3>
              <section>
                <p>
                  <b>
                    {{ donation.donation?.love_name }}
                  </b>
                  {{ $t("campaigns.donation.gift_notification") }}
                  ({{ donation.donation?.sender_name }}).
                </p>
                <p class="mt-2">
                  {{ $t("campaigns.donation.gift_description") }}
                  <nuxt-link to="/" target="_blank">{{
                    $t("home.site_name")
                  }}</nuxt-link
                  >.
                </p>
              </section>

              <section>
                <h4>
                  {{ $t("campaigns.donation.donation_details_title") }}
                </h4>
                <ul>
                  <li>
                    {{ $t("campaigns.donation.donation_amount") }}

                    {{ donation.donation?.love_amount }}.
                  </li>
                  <li>
                    {{ $t("campaigns.donation.donation_date") }}

                    <ClientOnly>
                      {{ reFormat(donation.donation?.date) }}
                    </ClientOnly>
                  </li>
                  <li>
                    {{ $t("campaigns.donation.donation_by") }}
                    {{ donation.donation?.sender_name }}.
                  </li>
                </ul>
              </section>

              <hr />

              <section>
                <p>
                  {{ $t("campaigns.donation.view_campaign") }}

                  <nuxt-link
                    :to="{
                      name: 'view-campaign',
                      params: { id: donation.campaign?.id },
                    }"
                    target="_blank"
                    >{{ donation.campaign?.name }}</nuxt-link
                  >.
                </p>
                <p>{{ $t("campaigns.donation.thank_you") }}</p>
              </section>

              <hr />

              <section>
                <p>
                  {{ $t("campaigns.donation.add_reply_to_comment") }}
                  ({{ donation.donation?.sender_name }}).
                </p>

                <InputsTextarea
                  v-model="comment"
                  :placeholder="$t('global.comment')"
                />
              </section>

              <section class="flex gap-3">
                <div
                  class="flex border rounded-lg flex-1 !outline-none bg-neutral-100 items-center overflow-hidden"
                >
                  <div class="flex-1">
                    <input
                      placeholder="120.00"
                      v-model="amount"
                      class="bg-white py-2 px-1 !w-full h-full font-normal"
                    />
                  </div>
                  <div class="text-neutral-400 px-1 md:!px-3">USD</div>
                </div>

                <button
                  class="flex-1 bg-indigo-500 text-white text-center max-md:text-sm py-2 rounded-lg transition hover:opacity-80"
                  @click.stop="send_data"
                >
                  {{ $t("home.donate") }}
                </button>
              </section>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col front"
          :class="{ 'rtl-featured': locale == 'ar' }"
        >
          <div
            class="bg-red-600 text-white text-center py-2 font-bold shadow w-full"
          >
            <span class="inline-flex gap-1 items-center">
              🔥
              <span>
                {{ $t("campaigns.donation.gift") }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="px-4 flex flex-col gap-3 justify-center align-center">
        <div class="flex">
          <a :href="item.url" :key="item.id" v-for="item in footer">
            <img :alt="item.name" :src="item.icon" class="h-8 md:!h-10" />
          </a>
        </div>
        <p class="text-xs">
          {{ settings?.site_name }} {{ new Date().getFullYear() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettings } from "~/modules/home/services/settings";
import { useFooter } from "~/modules/home/services/footer";
import { reFormat } from "~/helpers/format-date";

import { useGiftStore } from "~/modules/campaigns/store/gift";

const router = useRouter();
const route = useRoute();

const { footer } = useFooter();
const { data: settings } = useSettings();
const { locale } = useI18n();

const giftStore = useGiftStore();

const props = defineProps(["donation"]);
const comment = ref("");
const amount = ref(props.donation?.donation?.love_amount);

const send_data = () => {
  giftStore.setMetaData({
    ...route.query,
    amount: +amount.value || undefined,
    comment_parent_id: props.donation?.donation?.id,
    comment: comment.value,
  });

  router.push({
    name: "campaign",
    params: { id: props.donation?.campaign?.id },
  });
};
</script>

<style lang="scss" scoped>
.rtl-shadow,
.rtl-featured {
  left: -28px !important;
  right: unset !important;
  transform: rotate(-45deg) !important;
  transform-origin: top left !important;
}
.back,
.front {
  height: 230px;
  top: 134px;
  right: -28px;
  left: unset;
  transform-origin: top right;
  transform: rotate(45deg);
  @apply aspect-square absolute;
}

.rtl {
  direction: rtl;
}
section {
  @apply leading-relaxed text-start text-sm;
}

h3 {
  @apply text-lg md:!text-xl font-bold;
}

h4 {
  @apply text-base md:!text-lg font-semibold;
}

ul,
p {
  @apply opacity-60;
}

a {
  @apply text-sky-400 underline hover:text-sky-500 hover:no-underline;
}

hr {
  @apply border-0 h-px bg-slate-200;
}
</style>
