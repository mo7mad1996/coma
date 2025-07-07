<template>
  <div class="relative bg-white max-w-[420px] w-[90vw] z-10">
    <h2
      class="text-black my-8 font-bold lg:text-4xl md:text-4xl text-3xl text-center"
    >
      {{ $t("global.completion_of_sponsorship") }}
    </h2>
    <Form
      @submit="onSubmit"
      v-slot="{ validate, values }"
      :initialValues="{ status: 'active', frequency: 'monthly' }"
    >
      <!-- <div>
        <label for="title" class="text-sm text-slate-400 mt-3 block">
          {{ $t("global.title") }}</label
        >
        <p class="mb-4 text-xs text-gray-400">{{ $t("global.title_dec") }}</p>

        <div class="relative">
          <div
            class="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3 text-lg"
          >
            <v-icon
              size="small"
              icon="mdi-format-title"
              class="text-blue-500"
            />
          </div>

          <Field
            name="title"
            :validateOnInput="true"
            rules="required"
            id="title"
            :placeholder="$t('global.title')"
            class="block w-full ltr:pl-10 rtl:pr-10 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
          />
        </div>

        <ErrorMessage class="text-red-500 text-sm" name="title" as="span" />
      </div> -->

      <!-- Amount input -->
      <div class="mt-3">
        <label for="amount" class="text-sm text-slate-400 my-3 block">
          {{ $t("global.amount") }}</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3 text-lg"
          >
            <v-icon
              size="small"
              icon="mdi-currency-usd"
              class="text-blue-500"
            />
          </div>

          <Field
            v-model.number="model.amount"
            rules="required|numeric|englishNumbersOnly|min_value:1"
            name="amount"
            :validateOnInput="true"
            id="amount"
            :placeholder="$t('global.amount')"
            class="block w-full ltr:pl-10 rtl:pr-10 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
          />
        </div>

        <ErrorMessage class="text-red-500 text-sm" name="amount" as="span" />
      </div>

      <!-- donate_flow input -->
      <!-- <div class="mt-3">
        <label for="donate_flow" class="text-sm text-slate-400 my-3 block">
          {{ $t("global.select_donate_flow") }}
        </label>

        <div class="relative">
          <Field
            as="div"
            name="donate_flow"
            :validateOnInput="true"
            id="donate_flow"
          >
            <GlobalRadioInputs
              v-model="model.donate_flow"
              name="donate_flow"
              :data="[
                { title: $t('global.equal'), value: 'equal' },
                { title: $t('global.by_admin'), value: 'by_admin' },
              ]"
            />
          </Field>
        </div>

        <ErrorMessage
          class="text-red-500 text-sm"
          name="donate_flow"
          as="span"
        />
      </div> -->

      <!-- Frequency input -->
      <div class="mt-3">
        <label for="frequency" class="text-sm text-slate-400 my-3 block">
          {{ $t("global.select_frequency") }}
        </label>
        <div class="relative">
          <Field name="frequency" rules="required" v-slot="{ field }">
            <GlobalRadioInputs
              v-model="values.frequency"
              v-bind="field"
              :data="[
                { title: $t('global.daily'), value: 'daily' },
                { title: $t('global.weekly'), value: 'weekly' },
                { title: $t('global.monthly'), value: 'monthly' },
                { title: $t('global.onetime'), value: 'one_time' },
              ]"
            />
          </Field>
        </div>

        <ErrorMessage class="text-red-500 text-sm" name="frequency" as="span" />
      </div>

      <!-- Status input -->
      <!-- <div class="mt-3">
        <label for="status" class="text-sm text-slate-400 my-3 block">
          {{ $t("global.select_status") }}
        </label>
        <div class="relative">
          <Field name="status" rules="required" v-slot="{ field }">
            <GlobalRadioInputs
              v-model="values.status"
              v-bind="field"
              :data="[
                { title: $t('global.active'), value: 'active' },
                { title: $t('global.inactive'), value: 'inactive' },
              ]"
            />
          </Field>
        </div>

        <ErrorMessage class="text-red-500 text-sm" name="status" as="span" />
      </div> -->

      <!-- Submit Button -->
      <v-btn
        :disabled="loading"
        :loading="loading"
        :ripple="false"
        type="submit"
        class="text-capitalize w-full rounded-lg mt-2"
        variant="flat"
        size="large"
        color="#8957E9"
        @click="validate"
      >
        {{ $t("global.add") }}
        ({{ cart.length * +values.amount }} {{ selectedCurrencyLabel }})
      </v-btn>
    </Form>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ErrorMessage, Field, Form } from "vee-validate";
import { storeToRefs } from "pinia";
import { useRecurringDonation } from "~/modules/home/services/recurring-donation";
import { useCurrencyStore } from "~/modules/campaigns/store/currancy";

const currencyStore = useCurrencyStore();
const { handle, loading } = useRecurringDonation();
const { t } = useI18n();

const { selectedCurrencyLabel } = storeToRefs(currencyStore);
const cookieValue = useCookie("cart");
const cart: any = useState("cart", () =>
  cookieValue.value ? cookieValue.value : []
);

const { $toast }: any = useNuxtApp();

const model: any = defineModel();
const router = useRouter();

const onSubmit = (data: any, { setErrors }: any) => {
  const campaigns = cart.value.map((i: any) => i.id);

  const payload = {
    ...data,
    ...model.value,
    campaigns,
  };

  if (+data.amount <= 0)
    return setErrors({ amount: t("home.must_be_greater_than_zero") });
  handle(
    payload,
    async (res) => {
      $toast.success(t("home.menu_customized_successfully"));
      const { id } = res.data.data;
      router.push({ name: "sponsored-item-page", params: { id } });
      cart.value = [];
    },
    (error) => {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        $toast.error("error");
      }
    }
  );
};
</script>

<style scoped>
.v-icon {
  font-size: inherit !important;
}
</style>
