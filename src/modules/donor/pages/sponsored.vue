<template>
  <main class="bg-white md:rounded-3xl p-sm">
    <h1 class="mb-sm text-xl font-bold">
      {{ $t("donor.sponsored_individuals") }}
    </h1>

    <div class="loader my-lg" v-if="status == 'pending'"></div>

    <template v-if="status == 'success'">
      <template v-if="sponsoredList.length">
        <ul class="p-0 ps-sm">
          <li v-for="item in sponsoredList" :key="item.id">
            <nuxt-link
              :to="{ name: 'sponsored-item-page', params: { id: item.id } }"
              class="mb-4 p-4 border-[1px] border-solid group border-indigo-100 rounded-lg hover:bg-indigo-50 focus:bg-indigo-50 block"
            >
              <div class="flex items-center">
                <div class="flex-1">
                  <h3 class="text-lg mb-4 font-bold">{{ item.title }}</h3>
                  <p class="text-slate-700">
                    <v-icon icon="mdi-account" />
                    {{ $t("donor.number_of_orphans") }} ({{ item.count }}).
                    <br />

                    <v-icon icon="mdi-cash-100" />
                    {{ item.amount }} / {{ $t("global." + item.frequency) }}
                    <br />

                    <v-icon
                      icon="mdi-calendar-clock-outline"
                      v-if="item.last_donate_at"
                    />
                    {{ item.last_donate_at }}
                  </p>
                </div>
                <button
                  class="bg-indigo-500 text-white py-3 px-4 rounded hover:bg-indigo-600"
                  @click.prevent.stop="openDialog(item.id)"
                >
                  {{ $t("donor.pay") }}
                  ({{ item.amount }}) {{ selectedCurrencyLabel }}
                </button>
              </div>
            </nuxt-link>
          </li>
        </ul>

        <div class="pagination items-center justify-center pb-sm">
          <ClientOnly>
            <v-pagination
              v-model="currentPage"
              :length="sponsoredMeta?.lastPage"
              :total-visible="5"
            />
          </ClientOnly>
        </div>
      </template>

      <GlobalNoData :data="sponsoredList" :status="status" />
    </template>

    <DonorShowError :error="error" v-if="status == 'error'" />

    <v-dialog v-model="dialog" width="420">
      <v-card>
        <v-card-title>{{ $t("global.secure_payment") }}</v-card-title>
        <div class="loading" v-if="gatewaysRef?.loading"></div>

        <form @submit.prevent="submit" v-show="gatewaysRef?.gateways.length">
          <div class="p-5 flex flex-col gap-4">
            <GlobalGateways v-model="gateway" class="-mt-8" ref="gatewaysRef" />

            <VBtn
              type="submit"
              :loading="loading"
              :disabled="loading"
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
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "~/modules/campaigns/store/currancy";
import { useSponsored } from "../services/sponsored";
import { useRecurringDonation } from "../services/useRecurringDonation";
import { useGlobalVar } from "~/helpers/global-var";

const gatewaysRef = ref(null);
const currencyStore = useCurrencyStore();
const { selectedCurrencyLabel, selectedCurrency } = storeToRefs(currencyStore);

const { siteName } = useGlobalVar();
const { sponsoredList, error, currentPage, sponsoredMeta, status } =
  useSponsored();
const { pay, loading } = useRecurringDonation();

const gateway = ref("stripe");
const dialog = ref(false);
const selectedId = ref("");

const openDialog = (id) => {
  selectedId.value = id;
  dialog.value = true;
};

const getPayload = () => {
  return {
    recurring_donation_id: selectedId.value,
    payment_gateway: gateway.value,
    currency_id: selectedCurrency.value,
  };
};

const submit = async () => {
  const payload = getPayload();
  pay(payload, () => {
    dialog.value = false;
  });
};
siteName("donor.sponsored_individuals");
definePageMeta({
  layout: "donor",
  middleware: "require-auth",
});
</script>
