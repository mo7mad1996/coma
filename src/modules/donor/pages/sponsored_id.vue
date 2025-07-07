<template>
  <div class="" v-if="isLoading">
    <div class="payment-return flex justify-center pt-xl pb-xl">
      <div class="card p-sm rounded-xl border">
        <div class="spinner flex justify-center pb-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
          >
            <path
              fill="#9333ea"
              d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
            >
              <animateTransform
                attributeName="transform"
                dur="0.6s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
        </div>

        <h3 class="text-xl">{{ $t("campaigns.wait") }}</h3>
      </div>
    </div>
  </div>

  <main class="" v-else-if="user.recurring_donation_status == 'active'">
    <div class="loader my-lg" v-if="status == 'pending' && !db_data"></div>
    <template v-if="data">
      <DonorOrphansList
        :campaignStatus="campaignStatus"
        :campaigns="campaigns"
        :data="data"
        :selectedCurrencyLabel="selectedCurrencyLabel"
        :openDialog="openDialog"
      />
      <div
        class="xl:grid xl:grid-cols-1 gap-sm max-xl:flex max-xl:flex-col"
        v-if="false"
      >
        <!-- <Form
          class="grid grid-cols-2 md:col-span-2 col-span-3 bg-white md:rounded-3xl p-sm gap-4 h-fit"
        >
          <div class="my-3 col-span-2">
            <h2 class="text-2xl font-bold">{{ data.title }}</h2>
          </div>

          <div class="my-3 col-span-1">
            <div class="relative">
              <h3>{{ $t("global.title") }}</h3>

              <div
                class="border-[1px] border-zinc-400 flex rounded-lg p-2 items-center my-3"
                style="direction: ltr"
              >
                <Field
                  name="title"
                  rules="required"
                  :validateOnInput="true"
                  v-model="data.title"
                  class="block flex-1 outline-none text-gray-700 text-right"
                />
              </div>
            </div>
            <ErrorMessage
              name="title"
              class="pt-2 text-red-500 text-sm"
              as="span"
            />
          </div>

          <div class="my-3 col-span-1">
            <div class="relative">
              <h3>{{ $t("global.amount") }}</h3>

              <div class="flex rounded-lg p-2 items-center my-3">
                {{ data.amount }}
              </div>
            </div>
            <ErrorMessage
              name="amount"
              class="pt-2 text-red-500 text-sm"
              as="span"
            />
          </div>

          <div class="my-1 col-span-2 grid grid-cols-3">
            <div class="my-3 col-span-1">
              <h3>{{ $t("global.select_frequency") }}</h3>

              <GlobalRadioInputs
                class="inline-flex"
                v-model="data.frequency"
                name="frequency"
                :data="[
                  {
                    title: $t('global.weekly'),
                    value: 'weekly',
                    disabled: true,
                  },
                  {
                    title: $t('global.monthly'),
                    value: 'monthly',
                    disabled: true,
                  },
                ]"
              />
            </div>

            <div class="my-3 col-span-1">
              <h3>{{ $t("global.select_status") }}</h3>

              <GlobalRadioInputs
                class="inline-flex"
                v-model="data.status"
                name="status"
                :data="[
                  {
                    title: $t('global.active'),
                    value: 'active',
                    disabled: true,
                  },
                  {
                    title: $t('global.inactive'),
                    value: 'inactive',
                    disabled: true,
                  },
                ]"
              />
            </div>

            <div class="my-3 col-span-1">
              <h3>{{ $t("global.select_donate_flow") }}</h3>

              <GlobalRadioInputs
                class="inline-flex"
                v-model="data.donate_flow"
                name="donate_flow"
                :data="[
                  {
                    title: $t('global.by_admin'),
                    value: 'by_admin',
                    disabled: true,
                  },
                  { title: $t('global.equal'), value: 'equal', disabled: true },
                ]"
              />
            </div>
          </div>

          <div class="col-span-2">
            <v-btn
              color="primary"
              block
              @click.prevent="submit"
              :loading="loading"
              :disabled="loading || campaigns.length == 0 || data.title"
              >{{ $t("donor.save") }}</v-btn
            >
          </div>
        </Form> -->

        <div class="md:col-span-1 col-span-3 bg-white md:rounded-3xl p-sm">
          <div class="flex justify-between items-start">
            <h1 class="mb-sm text-xl font-bold">
              {{ $t("donor.sponsored_individuals") }}
            </h1>
          </div>
          <div class="loader my-4" v-if="campaignStatus == 'pending'"></div>
          <template v-if="campaignStatus == 'success'">
            <ul class="p-0 h-fit flex flex-col gap-2">
              <DonorCampaignsItem
                v-for="(item, n) in campaigns"
                :key="item.id"
                :item="item"
                :data="data"
                :campaigns="campaigns"
              />
            </ul>

            <button
              class="bg-indigo-500 text-white py-3 px-2 lg:!px-3 rounded hover:bg-indigo-600 my-4 flex w-full justify-center"
              @click.prevent.stop="openDialog"
            >
              {{ $t("donor.pay") }}
              ({{ data.amount }}) {{ selectedCurrencyLabel }}
            </button>
          </template>
        </div>
      </div>

      <div class="mt-md md:rounded-3xl p-sm bg-white">
        <h1 class="mb-sm text-xl font-bold">
          {{ $t("donor.payments") }}
        </h1>

        <ClientOnly>
          <!-- db_data?.donation_payments?.meta?.lastPage -->
          <v-data-table
            showCurrentPage
            :footer-props="{
              pageCount: 10,
              showFirstLastPage: true,
            }"
            :items-per-page-options="[
              { value: 5, title: '5' },
              { value: 10, title: '10' },
              { value: 15, title: '15' },
            ]"
            :items-per-page="per_page"
            :headers="headers"
            :items="db_data?.donation_payments?.data"
            :loading="status == 'pending'"
            @update:options="loadItems"
          >
            <template v-slot:item.payment_date="{ item }">
              {{ reFormat2(item.payment_date) }}
            </template>
            <template v-slot:item.status="{ item }">
              {{ t("donor." + item.status) }}
            </template>
            <template v-slot:item.frequency="{ item }">
              {{ t("global." + item.frequency) }}
            </template>
            <template v-slot:item.payment_gateway="{ item }">
              {{ t("global." + item.payment_gateway) }}
            </template>
          </v-data-table>
        </ClientOnly>
      </div>

      <v-dialog v-model="dialog" width="420">
        <v-card>
          <v-card-title>{{ $t("global.secure_payment") }}</v-card-title>
          <div class="loading" v-if="gatewaysRef?.loading"></div>

          <form
            @submit.prevent="startPay"
            v-show="gatewaysRef?.gateways.length"
          >
            <div class="p-5 flex flex-col gap-4">
              <GlobalGateways
                v-model="gateway"
                class="-mt-8"
                ref="gatewaysRef"
              />

              <VBtn
                type="submit"
                :loading="gatewayLoading"
                :disabled="gatewayLoading"
                color="indigo"
                size="large"
                class="bg-indigo-500 text-white py-2 px-3 rounded hover:bg-indigo-600 block w-full"
              >
                <span>
                  {{ $t("donor.pay") }}
                </span>
              </VBtn>
            </div>
          </form>

          <GlobalNoGateways
            v-if="!gatewaysRef?.gateways.length && !gatewaysRef?.loading"
          />
        </v-card>
      </v-dialog>
    </template>
    <DonorShowError :error="error" v-if="status == 'error'" />
  </main>

  <div
    v-else
    class="bg-white w-fit mx-auto text-3xl text-center shadow-lg rounded-lg py-sm px-md mt-2xl"
  >
    {{ $t("donor.status_is_inactive") }}
  </div>
</template>

<script setup>
import { ErrorMessage, Field, Form } from "vee-validate";
import { useCurrencyStore } from "~/modules/campaigns/store/currancy";
import { storeToRefs } from "pinia";
import { useAuth } from "~/modules/auth/services/auth";
import { useSingleSponsored } from "../services/single_sponsored";
import { useSingleSponsoredCampaigns } from "../services/single_sponsored_campaigns";
import { useRecurringDonation } from "~/modules/home/services/recurring-donation";
import { useRecurringDonation as useRecurringDonationPay } from "../services/useRecurringDonation";

import { useGlobalVar } from "~/helpers/global-var";
import { reFormat2 } from "~/helpers/format-date";
import { useCallback } from "~/modules/campaigns/services/callback";
const { handle, loading } = useRecurringDonation();
const { user } = useAuth();
const { $toast } = useNuxtApp();
const { siteName } = useGlobalVar();
const { t } = useI18n();
const gateway = ref("stripe");

const { pay, loading: gatewayLoading } = useRecurringDonationPay();

const currencyStore = useCurrencyStore();
const { selectedCurrencyLabel, selectedCurrency } = storeToRefs(currencyStore);
const { isLoading, callBack_recurring_donation } = useCallback();

const route = useRoute();
const { paymentResponse, razorpay_payment_link_id, stripe_id } = route.query;

const gatewaysRef = ref(null);

const headers = [
  { title: t("global.amount"), key: "amount" },
  { title: t("home.currency"), key: "currency.name" },
  { title: t("global.status"), key: "status" },
  { title: t("global.frequency"), key: "frequency" },
  { title: t("dashboard.date"), key: "payment_date" },
  { title: t("home.gateway"), key: "payment_gateway" },
];

const {
  data: db_data,
  status,
  error,
  page,
  per_page,
  refresh,
} = useSingleSponsored();

const data = ref(db_data);

onMounted(() => {
  if (paymentResponse || razorpay_payment_link_id || stripe_id)
    callBack_recurring_donation(
      paymentResponse || razorpay_payment_link_id || stripe_id
    );
});

const {
  data: campaigns,
  status: campaignStatus,
  error: campaignError,
} = useSingleSponsoredCampaigns();

const dialog = ref(false);
const selectedId = ref("");

const openDialog = () => {
  selectedId.value = route.params.id;
  dialog.value = true;
};

const getPayload = () => {
  return {
    recurring_donation_id: selectedId.value,
    payment_gateway: gateway.value,
    currency_id: selectedCurrency.value,
  };
};

const startPay = async () => {
  const payload = getPayload();
  pay(payload, dialog);
};

const submit = () => {
  const payload = {
    ...data.value,
    recurring_donation_id: data.value.id,
    campaigns: campaigns.value.map((i) => i.id),
  };

  handle(
    payload,
    () => {
      $toast.success(t("dashboard.save"));
    },
    (err) => {
      $toast.error(t("auth.error"));
      console.error(err);
    }
  );
};
const loadItems = (d) => {
  page.value = d.page;
  per_page.value = d.itemsPerPage;
};

definePageMeta({
  layout: "donor",
  middleware: "require-auth",
});

siteName(null, db_data.title);
</script>
