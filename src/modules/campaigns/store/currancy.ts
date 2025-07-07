import { defineStore } from "pinia";

export const useCurrencyStore = defineStore("currency", () => {
  const { data: currencies } = useNuxtData("currencies"); // [items]

  currencies.value = currencies.value || [];
  const selectedCurrency = ref(""); // id
  const selectedItem = ref({}); // item
  const selectedCurrencyLabel = ref(""); // currency_symbol
  const selectedCurrencyName = ref(""); // currency_name
  const isPaymentSuccess = ref(false);

  // watch
  watch(selectedCurrency, (v) => localStorage.setItem("selectedCurrency", v));
  watch(selectedCurrency, (v) =>
    updataData(currencies.value.find((i: any) => i.id == v))
  );

  // actions
  function updataData(item: any) {
    if (!item) return;
    selectedItem.value = item;
    selectedCurrencyLabel.value = item.currency_symbol;
    selectedCurrencyName.value = item.currency_name;
  }
  function setCurrency(currencyId: any) {
    selectedCurrency.value = currencyId;
  }

  function setPaymentStatus(status: any) {
    isPaymentSuccess.value = status;
  }

  onMounted(() => {
    const savedData =
      localStorage.getItem("selectedCurrency") ||
      currencies.value.find((i: any) => i.is_default)?.id;

    selectedCurrency.value = savedData;
    updataData(currencies.value.find((i: any) => i.id == savedData));
  });

  return {
    selectedCurrency,
    currencies,
    selectedCurrencyLabel,
    selectedCurrencyName,
    setCurrency,
    isPaymentSuccess,
    setPaymentStatus,
  };
});
