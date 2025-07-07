import { api } from "~/helpers/axios";

export const useCountries = () => {
  const { locale } = useI18n();
  const page = ref(1);

  const fetch = useAsyncData(
    "countries",
    () =>
      api
        .get("/countries", { params: { page: page.value } })
        .then((response) => response.data.result),
    { watch: [locale, page] }
  );

  return {
    ...fetch,
    page,
  };
};
