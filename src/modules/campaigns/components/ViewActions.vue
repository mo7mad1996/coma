<template>
  <section
    class="border !border-[#8957E9] bg-[#FBF9FF] rounded-2xl p-6 gap-4 flex flex-col"
  >
    <CampaignsLoaderActions v-if="status == 'pending'" />
    <template v-if="status == 'success'">
      <div class="flex flex-col gap-6">
        <!-- location -->
        <div class="flex gap-3 items-center">
          <div class="bg-indigo-50 rounded-xl p-2">
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3C5.50555 3 5.0222 3.14662 4.61107 3.42133C4.19995 3.69603 3.87952 4.08648 3.6903 4.54329C3.50108 5.00011 3.45157 5.50277 3.54804 5.98773C3.6445 6.47268 3.8826 6.91814 4.23223 7.26777C4.58186 7.6174 5.02732 7.8555 5.51227 7.95196C5.99723 8.04843 6.49989 7.99892 6.95671 7.8097C7.41352 7.62048 7.80397 7.30005 8.07867 6.88893C8.35338 6.4778 8.5 5.99445 8.5 5.5C8.5 4.83696 8.23661 4.20107 7.76777 3.73223C7.29893 3.26339 6.66304 3 6 3ZM6 7C5.70333 7 5.41332 6.91203 5.16664 6.7472C4.91997 6.58238 4.72771 6.34811 4.61418 6.07403C4.50065 5.79994 4.47094 5.49834 4.52882 5.20736C4.5867 4.91639 4.72956 4.64912 4.93934 4.43934C5.14912 4.22956 5.41639 4.0867 5.70736 4.02882C5.99834 3.97094 6.29994 4.00065 6.57403 4.11418C6.84811 4.22771 7.08238 4.41997 7.2472 4.66664C7.41203 4.91332 7.5 5.20333 7.5 5.5C7.5 5.89782 7.34196 6.27936 7.06066 6.56066C6.77936 6.84196 6.39782 7 6 7ZM6 0C4.54182 0.00165421 3.14383 0.581648 2.11274 1.61274C1.08165 2.64383 0.501654 4.04182 0.5 5.5C0.5 7.4625 1.40688 9.5425 3.125 11.5156C3.89701 12.4072 4.76591 13.2101 5.71562 13.9094C5.7997 13.9683 5.89985 13.9999 6.0025 13.9999C6.10515 13.9999 6.20531 13.9683 6.28938 13.9094C7.23734 13.2098 8.10455 12.4069 8.875 11.5156C10.5906 9.5425 11.5 7.4625 11.5 5.5C11.4983 4.04182 10.9184 2.64383 9.88726 1.61274C8.85617 0.581648 7.45818 0.00165421 6 0ZM6 12.875C4.96688 12.0625 1.5 9.07812 1.5 5.5C1.5 4.30653 1.97411 3.16193 2.81802 2.31802C3.66193 1.47411 4.80653 1 6 1C7.19347 1 8.33807 1.47411 9.18198 2.31802C10.0259 3.16193 10.5 4.30653 10.5 5.5C10.5 9.07687 7.03312 12.0625 6 12.875Z"
                fill="#596DE7"
              ></path>
            </svg>
          </div>
          <span class="text-neutral-900 opacity-60">
            {{ campaign?.country?.name }}
          </span>
        </div>

        <!-- name -->
        <h1 class="font-bold text-3xl md:text-4xl">
          {{ campaign?.campaign_name }}
        </h1>

        <!-- collected -->
        <div class="text-2xl md:text-3xl flex gap-2">
          <span class="font-bold">{{ campaign.total_amount }}$</span>
          <span>
            {{ $t("campaigns.collected") }}
          </span>
        </div>

        <!-- buttons -->
        <div class="flex gap-2 md:gap-4">
          <button
            class="flex-1 bg-indigo-500 text-white text-center py-2 rounded-lg transition hover:opacity-80"
            @click.stop="
              $router.push({
                name: 'campaign',
                params: { id },
              })
            "
          >
            {{ $t("home.donate") }}
          </button>

          <button
            class="bg-transparent !text-indigo-500 border !border-indigo-500 aspect-square overflow-hidden py-2 px-2 flex items-center justify-center gap-2 rounded-[12px] hover:opacity-80"
            @click.stop="cart.push(campaign)"
            v-if="!user && !cart.find((i) => i.id == campaign.id)"
          >
            <v-icon>mdi-cart-outline</v-icon>
          </button>

          <template v-if="'beneficiary' != user?.user_type">
            <button
              class="bg-transparent !text-indigo-500 border !border-indigo-500 aspect-square overflow-hidden py-2 px-2 flex items-center justify-center gap-2 rounded-[12px] hover:opacity-80"
              @click.stop="book(campaign)"
              v-if="user && !campaign.booked"
            >
              <div class="loader my-0" v-if="loading"></div>
              <template v-else>
                <v-icon>mdi-bookmark-outline</v-icon>
              </template>
            </button>
            <button
              class="bg-transparent !text-red-500 border !border-red-500 aspect-square overflow-hidden py-2 px-2 flex items-center justify-center gap-2 rounded-[12px] hover:opacity-80"
              v-if="user && campaign.booked"
              @click.stop="un_book(campaign)"
            >
              <div class="loader my-0" v-if="loading"></div>
              <template v-else>
                <v-icon>mdi-bookmark-off</v-icon>
              </template>
            </button>
          </template>

          <button
            class="bg-transparent !text-indigo-500 border !border-indigo-500 aspect-square overflow-hidden py-2 px-2 flex items-center justify-center gap-2 rounded-[12px] hover:opacity-80"
            @click="
              sharePage(
                $t('global.share.title'),
                $t('global.share.text'),
                $router.resolve({
                  name: 'view-campaign',
                  params: { id: campaign.id },
                }).href
              )
            "
          >
            <v-icon>mdi-share-variant-outline</v-icon>
          </button>
        </div>

        <!-- Progress Bar -->
        <div>
          <!-- <div class="flex gap-2 items-baseline">
        <div class="w-full bg-zinc-50 rounded-full h-2 border border-zinc-300">
          <div
            class="bg-indigo-500 h-full rounded-full"
            :style="{ width: progress + '%', maxWidth: '100%' }"
          ></div>
        </div>
        <span class="text-md text-blue-600 mt-1 block">
          {{ Math.min(progress, 100) }}%
        </span>
      </div> -->

          <!-- Progress Bar monthly  -->
          <div
            class="grid grid-cols-12 rounded-full overflow-hidden bg-neutral-100"
            v-if="'undefined' != typeof campaign.payment_monthly_count"
          >
            <span
              v-for="i in 12"
              :key="i"
              class="col-span-1 py-1 rounded-full border border-zinc-300"
              :class="
                i > campaign.payment_monthly_count
                  ? 'bg-zinc-50'
                  : 'bg-violet-500'
              "
            ></span>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="flex gap-2 text-neutral-900 text-sm">
        <v-icon color="#8957E9" icon="mdi-account-multiple-outline"></v-icon>
        <div class="">
          {{ campaign.total_donors }} {{ $t("home.number_of_donors") }}
        </div>
        <div>.</div>
        <div class="opacity-60">
          <div>${{ campaign.price_target }} {{ $t("home.goal") }}</div>
        </div>
      </div>

      <div class="flex gap-3 items-center mt-3">
        <svg
          width="35"
          height="35"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.1"
            y="0.1"
            width="39.8"
            height="39.8"
            rx="19.9"
            fill="#F5F6FF"
          />
          <rect
            x="0.1"
            y="0.1"
            width="39.8"
            height="39.8"
            rx="19.9"
            stroke="#596DE7"
            stroke-width="0.2"
          />
          <path
            d="M23.9222 13.5449L26.387 15.8349L21.1345 20.7149L16.8292 16.7149L8.85352 24.1349L10.3711 25.5449L16.8292 19.5449L21.1345 23.5449L27.9154 17.2549L30.3802 19.5449V13.5449H23.9222Z"
            fill="#121212"
          />
        </svg>

        <span class="font-bold">
          {{ campaign?.total_donors }} {{ $t("campaigns.donater") }}
        </span>
      </div>

      <hr class="mt-4" />

      <!-- top donors -->
      <div class="flex gap-3 flex-col">
        <div class="flex justify-between items-center">
          <span class="font-bold text-sm">
            {{ $t("campaigns.top_donors") }}
          </span>

          <v-btn
            class=""
            v-if="top_donors_list.length"
            :ripple="false"
            size="default"
            variant="text"
            color="primary"
            @click="openDialog2"
          >
            {{ $t("campaigns.view_all") }}
          </v-btn>
        </div>

        <GlobalNoData :status="status" :data="top_donors_list" />
        <ul class="flex flex-col gap-4">
          <li v-for="(donor, i) in top_donors_list" :key="i">
            <div class="flex gap-4 items-center">
              <div
                class="text-indigo-500 border border-indigo-500 rounded-full bg-violet-50 w-10 text-xl aspect-square grid place-content-center"
              >
                {{ donor.name[0] }}
              </div>

              <div>
                <div class="font-bold">${{ donor.total_amount }}</div>
                <div class="text-neutral-900 flex gap-4 text-sm">
                  <span class="opacity-70">
                    {{ donor.name }}
                  </span>

                  <ClientOnly>
                    <span class="opacity-50">{{
                      reFormat2(donor.donated_at)
                    }}</span>
                  </ClientOnly>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </section>

  <!-- top-donors dialog -->
  <dialog class="dialog m-auto rounded-[10px]" ref="top_donors">
    <div class="close-icon p-3 w-full">
      <v-icon class="cursor-pointer" @click="closeDialog">mdi-close</v-icon>

      <!-- first donor -->
      <div class="pt-4" v-if="campaign?.top_doners?.top?.total_amount > 0">
        <div
          v-if="campaign?.top_doners"
          class="donor mb-5 flex justify-between gap-x-md items-center"
        >
          <div class="flex gap-x-3 items-center">
            <img
              loading="lazy"
              :src="campaign?.top_doners?.top?.image || userPlaceholder"
              alt="orphans society image"
            />
            <div>
              <h4 class="text-2xl font-bold">
                {{ campaign?.top_doners?.top?.name }}
              </h4>
              <p class="text-sm text-[#121212] pt-1">
                {{ $t("campaigns.highest_donor") }}
              </p>
            </div>
          </div>

          <div class="donation-amount text-center">
            <h4 class="text-2xl font-bold text-primary">
              ${{ campaign?.top_doners?.top?.total_amount }}
            </h4>
            <client-only>
              <span class="text-sm text-[#12121299] pt-2">
                {{ reFormat2(campaign?.top_doners?.top?.donated_at) }}
              </span>
            </client-only>
          </div>
        </div>
      </div>

      <!-- second donor -->
      <div class="pt-3" v-if="campaign?.top_doners?.middle?.total_amount > 0">
        <div
          v-if="campaign?.top_doners"
          class="donor mb-5 flex justify-between gap-x-md items-center"
        >
          <div class="flex gap-x-3 items-center">
            <img
              loading="lazy"
              :src="campaign?.top_doners?.middle?.image || userPlaceholder"
              alt="orphans society image"
            />
            <div>
              <h4 class="text-2xl font-bold">
                {{ campaign?.top_doners?.middle?.name }}
              </h4>
              <p class="text-sm text-[#121212] pt-1">
                {{ $t("campaigns.highest_donor") }}
              </p>
            </div>
          </div>

          <div class="donation-amount text-center">
            <h4 class="text-2xl font-bold text-primary">
              ${{ campaign?.top_doners?.middle?.total_amount }}
            </h4>
            <client-only>
              <span class="text-sm text-[#12121299] pt-2">
                {{ reFormat2(campaign?.top_doners?.middle?.donated_at) }}
              </span>
            </client-only>
          </div>
        </div>
      </div>

      <!-- third donor -->
      <div class="pt-3" v-if="campaign?.top_doners?.first?.total_amount > 0">
        <div
          v-if="campaign?.top_doners"
          class="donor mb-5 flex justify-between gap-x-md items-center"
        >
          <div class="flex gap-x-3 items-center">
            <img
              loading="lazy"
              :src="campaign?.top_doners?.first?.image || userPlaceholder"
              alt="orphans society image"
            />
            <div>
              <h4 class="text-2xl font-bold">
                {{ campaign?.top_doners?.first?.name }}
              </h4>
              <p class="text-sm text-[#121212] pt-1">
                {{ $t("campaigns.highest_donor") }}
              </p>
            </div>
          </div>

          <div class="donation-amount text-center">
            <h4 class="text-2xl font-bold text-primary">
              ${{ campaign?.top_doners?.first?.total_amount }}
            </h4>
            <client-only>
              <span class="text-sm text-[#12121299] pt-2">
                {{ reFormat2(campaign?.top_doners?.first?.donated_at) }}
              </span>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </dialog>

  <!-- view all donors -->
  <dialog class="dialog m-auto rounded-[10px]" ref="all_donors">
    <div class="close-icon p-3 w-full">
      <v-icon class="cursor-pointer" @click="closeDialog2" icon="mdi-close" />

      <!-- first donor -->
      <template v-if="campaign?.all_donors">
        <div
          class="pt-4"
          v-for="(donor, index) in campaign?.all_donors"
          :key="index"
        >
          <div class="donor mb-5 flex justify-between gap-x-md items-center">
            <div class="flex gap-x-3 items-center">
              <img
                loading="lazy"
                :src="donor?.image || userPlaceholder"
                alt="orphans society image"
              />
              <div>
                <h4 class="text-2xl font-bold">
                  {{ donor?.name }}
                </h4>
                <p class="text-sm text-[#121212] pt-1">
                  {{ $t("campaigns.highest_donor") }}
                </p>
              </div>
            </div>

            <div class="donation-amount text-center">
              <h4 class="text-2xl font-bold text-primary">
                ${{ donor?.total_amount }}
              </h4>
              <client-only>
                <span class="text-sm text-[#12121299] pt-2">
                  {{ reFormat2(donor?.donated_at) }}
                </span>
              </client-only>
            </div>
          </div>
        </div>
      </template>
    </div>
  </dialog>
</template>

<script setup>
import { reFormat2 } from "~/helpers/format-date";
import { sharePage } from "~/helpers/share";
import { useCampaign } from "../typescript/view-campaign";

import userPlaceholder from "~/assets/images/user.svg";
import { useAuth } from "~/modules/auth/services/auth";
import { useBooking } from "~/modules/home/services/booking";
import { CampaignsLoaderActions } from "#components";

const { book, un_book, loading } = useBooking();

const { user } = useAuth();

const cookieValue = useCookie("cart");
const cart = useState("cart", () =>
  cookieValue.value ? cookieValue.value : []
);

const props = defineProps({
  campaign: {
    required: true,
  },
  target: {
    required: true,
  },
  amount: {
    required: true,
  },
  status: {
    required: true,
  },
});

const top_donors = ref("");
const all_donors = ref("");

const { onEnterViewport, animatedRate } = useCampaign();

const openDialog = () => {
  top_donors.value?.showModal();
};

const openDialog2 = () => {
  all_donors.value?.showModal();
};

const closeDialog = () => {
  top_donors.value?.close();
};

const closeDialog2 = () => {
  all_donors.value?.close();
};

const progress = computed(
  () =>
    +(props.campaign.total_amount / props.campaign.price_target).toFixed(2) *
    100
);

const top_donors_list = computed(() =>
  Object.values(props.campaign?.top_doners || {}).filter((n) => n != null)
);
onMounted(() => {
  onEnterViewport(true, props.target, props.amount);
});
</script>
