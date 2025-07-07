<template>
  <section aria-label="donation form for campaign" class="">
    <div class="px-2">
      <div
        class="lg:w-[566px] xl:w-[566px] md:w-[443px] w-[100%] max-w-[90dvw]"
      >
        <Form @submit="onSubmit" v-slot="{ setFieldValue, values }">
          <!-- available amounts to select  -->
          <div ref="targetElement">
            <CampaignsDonationAvailableAmounts :donationData="donationData" />
          </div>

          <!-- <v-checkbox v-model="donationData.accept" color="#596DE7">
            <template v-slot:label>
              <div>
                {{ $t("global.accept_all") }}
                <v-tooltip location="bottom">
                  <template v-slot:activator="{ props }">
                    <a
                      href="https://orphanssociety.com/page/01975eec-6efa-71ba-8999-5c294df85bcf"
                      class="text-indigo-700 underline hover:no-underline"
                      target="_blank"
                      v-bind="props"
                      @click.stop
                    >
                      {{ $t("global.terms_conditions") }}
                    </a>
                  </template>
                  {{ $t("global.opens_in_new_window") }}
                </v-tooltip>
                .
              </div>
            </template>
          </v-checkbox> -->

          <p class="error" v-if="!donationData.accept">
            {{ $t("auth.validation.required") }}
          </p>
          <!-- 
          <CampaignsDonationType
            :donationData="donationData"
            :donationType="donationType"
          /> -->

          <CampaignsDonationOrphanServices
            :donationData="donationData"
            :charity_amount="charity_amount"
            v-model="servicesType"
          />

          <CampaignsDonationPersonalInfo
            :donationData="donationData"
            :setFieldValue="setFieldValue"
          />

          <!-- Gateways -->
          <!-- <GlobalGateways
            v-model="donationData.gateway"
            ref="gatewaysRef"
            customClass="my-7"
          /> -->

          <CampaignsDonationGift
            :donationData="donationData"
            v-model="gift"
            :setFieldValue="setFieldValue"
          />

          <CampaignsDonationConfirmDonation :donationData="donationData" />
          <v-btn
            v-if="donationData.accept"
            :disabled="isLoading"
            :loading="isLoading"
            :ripple="false"
            type="submit"
            class="text-capitalize rounded-lg w-full mt-2 max-md:!sticky bottom-5"
            variant="flat"
            size="large"
            color="primary"
            @click="scroll"
            @touchstart="scroll"
          >
            {{ $t("global.donate_now") }}
          </v-btn>
          <CampaignsDonationPaymentAdvantages />
          <!-- <CampaignsDonationConfirmation /> -->
        </Form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-ignore
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useDonation } from "../../services/donation";

import { useCurrencyStore } from "../../store/currancy";
import { useGiftStore } from "../../store/gift";
import { useAuth } from "~/modules/auth/services/auth";

const { user } = useAuth();

const giftStore = useGiftStore();
const gatewaysRef: any = ref(null);

const route = useRoute();
const donationType = ref<string>("one_time");
const servicesType = ref<string>("relative");
const gift = ref<boolean>(false);
const { makeDonation, isLoading } = useDonation();
const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);
const targetElement: any = ref(null);

const donationData = ref<any>({
  name: "",
  email: "",
  mobile: "",
  comment: "",
  amount: 100,

  love_donation: "",
  love_name: [],
  love_email: [],
  love_mobile: [],
  love_comment: [],
  love_custom_amount: [],
  love_amount: 10,
  ongoing_charity: "no",
  charity_amount: 20,
  notify_whatsapp: [],
  notify_sms: [],
  currency_id: "",
  accept: true,
  campaign_id: "",
  gateway: "stripe",
  orphan_services: 20,
  frequency: "one_time",

  ...user.value,
  ...giftStore.meta,
});

const onSubmit = () => {
  if (["monthly", "weekly", "dialy"].includes(donationType.value))
    donationData.value.ongoing_charity = "yes";
  else donationData.value.ongoing_charity = "no";

  if (gift.value) donationData.value.love_donation = "yes";
  else donationData.value.love_donation = "no";

  donationData.value.campaign_id = route.params.id;
  donationData.value.currency_id = selectedCurrency.value;

  makeDonation({
    ...route.query,
    ...donationData.value,
    love_amount: donationData.value.love_custom_amount,
  });
};

const scroll = () =>
  targetElement.value?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

const charity_amount = computed(() =>
  (
    donationData.value.amount *
    (donationData.value.orphan_services / 100)
  ).toFixed(0)
);

onBeforeUnmount(() => {
  giftStore.setMetaData({});
});

watch(
  [
    servicesType,
    () => donationData.value.orphan_services,
    () => donationData.value.amount,
  ],
  () => {
    donationData.value.charity_amount = charity_amount.value;
  }
);
</script>
