import { api } from "~/helpers/axios";

export const useSearch = () => {
  const { locale } = useI18n();
  const route = useRoute();

  const search = async (filters: any) => {
    try {
      const res = await api.get("/campaigns", { params: filters });

      data.value = res.data.result.data;
    } catch (err) {
      console.error(err);
    }
  };

  const { data } = useAsyncData(
    "campaigns",
    () =>
      api
        .get("/campaigns", { params: { orphan_name: route.query.q } })
        .then((response) => response.data.result.data),
    { watch: [locale] }
  );

  return { data, search };
};
