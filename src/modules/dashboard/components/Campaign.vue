<template>
  <div v-if="booked" class="rounded-lg border overflow-hidden">
    <nuxt-link :to="{ name: 'view-campaign', params: { id: campaign.id } }">
      <img
        :src="campaign.image || '/img/R.jpg'"
        v-if="'image' == campaign.type"
        class="aspect-video w-full object-cover"
        :alt="campaign.orphan_name"
      />
      <video
        :src="campaign.image"
        loop
        autoplay
        muted
        playsinline
        v-if="'video' == campaign.type"
        class="aspect-video w-full object-cover"
      />

      <div class="px-4">
        <hr class="my-5" />
      </div>

      <h3 class="text-lg font-bold mt-2 px-2 pt-2">
        {{ campaign.orphan_name }}
      </h3>
    </nuxt-link>

    <section class="flex pb-4 justify-between items-center px-2 gap-2">
      <div>
        <div class="mt-4 flex-group one-line">
          <div class="flex items-end">
            <h3 class="text-2xl font-bold px-2 flex items-end text-neutral-950">
              <v-icon icon="mdi-currency-usd" />
              {{ campaign.total_amount }}
            </h3>

            <span class="text-zinc-500">
              (<v-icon icon="mdi-account" color="#0f1ab7" />
              {{ campaign.total_donors }})
            </span>
          </div>
          <span class="px-4 text-sm text-zinc-500">{{
            $t("donor.total_donations")
          }}</span>
        </div>
      </div>

      <v-dialog max-width="500">
        <template v-slot:activator="{ props }">
          <button
            class="rounded-lg border hover:bg-red-200 bg-red-50 hover:!border-red-200 text-red-700 py-2 px-6 block"
            v-bind="props"
          >
            {{ $t("home.un_book") }}
          </button>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card :title="$t('global_dashboard.warning')">
            <v-card-text>
              {{
                $t("global_dashboard.do_you_want_to_cancel_campaign_booking")
              }}
              <br />
              <br />
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :text="$t('auth.no')"
                @click="isActive.value = false"
              ></v-btn>
              <v-btn
                :text="$t('auth.yes')"
                :loading="loading"
                :disabled="loading"
                @click="remove(isActive)"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </section>
  </div>
</template>

<script setup>
const booked = ref(true);
import { useBooking } from "~/modules/home/services/booking";

const props = defineProps(["campaign", "refresh"]);

const { book, un_book, loading } = useBooking();

const remove = (isActive) => {
  un_book(props.campaign, () => {
    props.refresh();
    isActive.value = false;
    booked.value = false;
  });
};
</script>
