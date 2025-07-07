import { api } from "~/helpers/axios";

export const useCurrencies = () => {
  const page = ref(1);
  const { locale } = useI18n();

  const currencies = useAsyncData(
    "currencies",
    () =>
      api
        .get(`/currencies`, { params: { page: page.value } })
        .then((response: any) => response.data.result),
    { watch: [locale, page] }
  );

  return {
    ...currencies,
    page,
  };
};
