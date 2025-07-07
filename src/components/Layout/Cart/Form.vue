<template>
  <Form
    class="px-2 py-4 text-start"
    @submit="handelSubmit"
    v-slot="{ values, errors, validate, setFieldValue }"
    :initialValues="data"
  >
    <InputsText
      name="amount"
      class="mb-2"
      v-model="props.data.amount"
      rules="required|englishNumbersOnly|min_value:1"
      :placeholder="$t('global.cart_form.amount')"
      inputmode="numeric"
      customClass="!rounded-2xl"
    >
      <template #icon>
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.75 10C7.75 8.20507 9.20507 6.75 11 6.75C12.7949 6.75 14.25 8.20507 14.25 10C14.25 11.7949 12.7949 13.25 11 13.25C9.20507 13.25 7.75 11.7949 7.75 10ZM11 8.25C10.0335 8.25 9.25 9.0335 9.25 10C9.25 10.9665 10.0335 11.75 11 11.75C11.9665 11.75 12.75 10.9665 12.75 10C12.75 9.0335 11.9665 8.25 11 8.25Z"
            fill="#929A9F"
          />
          <path
            d="M5.74817 11.0176C5.77707 10.6044 5.46553 10.246 5.05232 10.2171C4.7295 10.1946 4.41405 10.1606 4.10748 10.1162C3.69755 10.0569 3.3171 10.3411 3.25774 10.751C3.19838 11.1609 3.48257 11.5414 3.89251 11.6007C4.23617 11.6505 4.58844 11.6883 4.94767 11.7135C5.36088 11.7424 5.71927 11.4308 5.74817 11.0176Z"
            fill="#929A9F"
          />
          <path
            d="M18.7423 9.24898C18.8016 8.83905 18.5174 8.4586 18.1075 8.39924C17.7638 8.34947 17.4116 8.31164 17.0523 8.28651C16.6391 8.25762 16.2807 8.56916 16.2518 8.98236C16.2229 9.39557 16.5345 9.75396 16.9477 9.78286C17.2705 9.80544 17.5859 9.83936 17.8925 9.88376C18.3025 9.94312 18.6829 9.65892 18.7423 9.24898Z"
            fill="#929A9F"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 0.75C13.9915 0.75 12.1298 1.14454 10.6826 1.82046C9.46476 2.38927 7.82565 2.75 6 2.75C4.988 2.75 4.02989 2.63907 3.16745 2.44153C1.841 2.13772 0.25 3.04678 0.25 4.61397V15.386C0.25 16.2216 0.382421 17.0082 0.816439 17.6488C1.26524 18.3111 1.95689 18.7031 2.83255 18.9037C3.80949 19.1274 4.88016 19.25 6 19.25C8.00849 19.25 9.87017 18.8555 11.3174 18.1795C12.5352 17.6107 14.1744 17.25 16 17.25C17.012 17.25 17.9701 17.3609 18.8326 17.5585C20.159 17.8623 21.75 16.9532 21.75 15.386V4.61397C21.75 3.81712 21.6428 3.03453 21.2218 2.38745C20.7825 1.71217 20.0845 1.30637 19.1674 1.09633C18.1905 0.872567 17.1198 0.75 16 0.75ZM11.3174 3.17954C12.5352 2.61073 14.1744 2.25 16 2.25C17.012 2.25 17.9701 2.36093 18.8326 2.55847C19.4972 2.7107 19.7992 2.95139 19.9645 3.20542C20.1481 3.48766 20.25 3.91721 20.25 4.61397V15.386C20.25 15.7885 19.7609 16.2323 19.1674 16.0963C18.1905 15.8726 17.1198 15.75 16 15.75C13.9915 15.75 12.1298 16.1445 10.6826 16.8205C9.46476 17.3893 7.82565 17.75 6 17.75C4.988 17.75 4.02989 17.6391 3.16745 17.4415C2.54269 17.2984 2.23433 17.0673 2.05824 16.8074C1.86737 16.5257 1.75 16.0908 1.75 15.386V4.61397C1.75 4.2115 2.23906 3.76774 2.83255 3.90367C3.80949 4.12743 4.88016 4.25 6 4.25C8.00849 4.25 9.87017 3.85546 11.3174 3.17954Z"
            fill="#929A9F"
          />
        </svg>
      </template>
    </InputsText>

    <InputsText
      class="my-2"
      name="name"
      v-model="props.data.name"
      rules="required"
      :placeholder="$t('global.cart_form.name')"
      customClass="!rounded-2xl "
      icon="mdi-account-outline"
    />

    <InputsEmail
      name="email"
      class="my-2"
      v-model="props.data.email"
      rules="required|email"
      :placeholder="$t('global.cart_form.email')"
      customClass="!rounded-2xl !my-3"
    />

    <InputsPhone
      class="my-2"
      name="mobile"
      v-model="props.data.mobile"
      rules="required"
      :placeholder="$t('global.phone')"
    />

    <div class="my-2">
      <InputsSelect
        :items="frequencies.map((i) => ({ ...i, title: $t(i.title) }))"
        name="frequency"
        v-model="props.data.frequency"
        custom-class=" border !border-gray-200 p-2 px-4 !rounded-2xl items-center my-3 shadow-none"
      />
    </div>

    <div class="my-2">
      <InputsTextarea
        name="comment"
        :rows="2"
        :placeholder="$t('global.comment')"
        v-model="props.data.comment"
      />
    </div>

    <!-- <GlobalGateways v-model="data.gateway" class="mt-2" /> -->

    <v-btn
      :disabled="isLoading"
      :loading="isLoading"
      :ripple="false"
      type="submit"
      class="text-capitalize rounded-lg w-full mt-6"
      variant="flat"
      size="large"
      color="#596DE7"
      @click="validate"
    >
      {{ $t("global.donate_now") }}
      ({{ data?.amount * times * data.campaigns.length }}
      {{ selectedCurrencyName }})
    </v-btn>
  </Form>
</template>

<script setup>
import { useDonation } from "~/modules/campaigns/services/donation";
import { Form } from "vee-validate";
import { useCurrencyStore } from "~/modules/campaigns/store/currancy";
import { storeToRefs } from "pinia";

const currencyStore = useCurrencyStore();
const { selectedCurrencyName } = storeToRefs(currencyStore);

const { cartDonation, isLoading } = useDonation();

const frequencies = [
  { value: "yearly", title: "global.yearly" },
  { value: "monthly", title: "global.monthly" },
  { value: "weekly", title: "global.weekly" },
  { value: "daily", title: "global.daily" },
  { value: "one_time", title: "global.onetime" },
];
const props = defineProps(["cart", "data"]);

const times = computed(() => {
  switch (props.data?.frequency) {
    case "yearly":
      return 12;

    default:
      return 1;
  }
});
const handelSubmit = () => {
  cartDonation(props.data);
};
</script>
