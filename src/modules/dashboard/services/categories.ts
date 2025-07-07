import { api } from "~/helpers/axios";

export const useCategories = () => {
  const { locale } = useI18n();
  const page = ref(1);

  const data = useAsyncData(
    "categories",
    () =>
      api
        .get(`/categories`, { params: { page: page.value } })
        .then((res) => res.data?.result || []),
    { watch: [locale, page] }
  );

  return {
    ...data,
    page,
  };
};
