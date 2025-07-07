<template>
  <v-menu update:modelValue>
    <template v-slot:activator="{ props }">
      <div
        v-bind="props"
        class="flex text-sm gap-2 items-center hover:bg-[#84a3f624] p-2 justify-center rounded"
      >
        <img alt="currency" src="~/assets/images/currency.svg" />
        <span v-if="status == 'pending'"> - - - </span>
        <span v-else>{{ selectedCurrencyName }}</span>

        <v-icon>mdi-chevron-down</v-icon>
      </div>
    </template>
    <v-list>
      <v-list-item
        class="py-0 min-h-0"
        v-for="(currency, index) in currenciesData"
        :key="index"
        @click="updateCurrency(currency.id)"
      >
        <span>
          {{ currency.currency_name }}
        </span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
// @ts-ignore
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "~/modules/campaigns/store/currancy";

// @ts-ignore
const props = defineProps(["currenciesData", "refresh", "status"]);

const currenciesData = ref(props.currenciesData);
const refresh = props.refresh;

const currencyStore = useCurrencyStore();

const { selectedCurrency, selectedCurrencyLabel, selectedCurrencyName } =
  storeToRefs(currencyStore);

function updateCurrency(newValue: string) {
  if (newValue) {
    localStorage.setItem("selectedCurrency", newValue);
    const storedCurrencies = currenciesData.value;

    if (storedCurrencies && storedCurrencies?.length > 0) {
      const selectedCurrencyData = storedCurrencies.find(
        (currency: any) => currency.id == newValue
      );

      if (selectedCurrencyData) {
        selectedCurrencyLabel.value = selectedCurrencyData.currency_symbol;
        selectedCurrencyName.value = selectedCurrencyData.currency_name;
      }
    }

    currencyStore.setCurrency(newValue);
  }
}

onMounted(() => {
  const storedCurrencies = localStorage.getItem("currenciesData");
  const storedCurrency = localStorage.getItem("selectedCurrency");

  if (storedCurrencies) {
    currenciesData.value = JSON.parse(storedCurrencies);
  } else {
    refresh()
      .then(() => {
        if (currenciesData.value && currenciesData.value.length > 0) {
          // localStorage.setItem("currenciesData", JSON.stringify(g.value));
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  const checkCurrencies = setInterval(() => {
    if (currenciesData.value && currenciesData.value.length > 0) {
      clearInterval(checkCurrencies);

      if (!storedCurrency) {
        const defaultObj = currenciesData.value.find(
          (i: any) => i.is_default === "yes"
        );
        selectedCurrency.value = defaultObj ? defaultObj.id : "";
        updateCurrency(selectedCurrency.value);
      } else {
        updateCurrency(storedCurrency);
      }

      const selectedCurrencyData = currenciesData.value.find(
        (currency: any) => currency.id === storedCurrency
      );
      if (selectedCurrencyData) {
        selectedCurrencyLabel.value = selectedCurrencyData.currency_symbol;
        selectedCurrencyName.value = selectedCurrencyData.currency_name;
      }
    }
  }, 100);
});
</script>
