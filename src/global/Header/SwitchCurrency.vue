<template>
  <InputsSelect
    customClass="!my-0 !shadow-none !rounded hover:!bg-[#84a3f624]  header-style "
    menuClass=" header-style "
    :map="((i: any) => ({ value: i.id, title: i.currency_symbol }))"
    :fetch="useCurrencies"
    v-model="store.selectedCurrency"
  >
    >
    <template #icon>
      <img alt="currency" src="~/assets/images/currency.svg" />
    </template>
  </InputsSelect>
</template>

<script setup lang="ts">
import { useCurrencies } from "~/modules/campaigns/services/curunces";
import { useCurrencyStore } from "~/modules/campaigns/store/currancy";

import { useSettings } from "~/modules/home/services/settings";

// init
const store = useCurrencyStore();
const { data: settings } = useSettings();
const settings_state: any = useState("settings", () => ({}));

// computed
const color = computed(
  () =>
    settings_state.value?.header_text_color ||
    settings.value?.header_text_color ||
    "black"
);
const bgcolor = computed(
  () =>
    settings_state.value?.header_background_color ||
    settings.value?.header_background_color ||
    "white"
);
</script>

<style lang="scss">
.header-style {
  color: v-bind(color) !important;
  background-color: v-bind(bgcolor) !important;

  & li div:hover {
    background-color: #84a3f624 !important;
  }
}
</style>
