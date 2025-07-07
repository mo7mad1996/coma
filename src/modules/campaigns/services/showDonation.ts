import { api } from "~/helpers/axios";

export const useShowDonation = () => {
  const { locale } = useI18n();
  const route = useRoute();

  const { id } = route.params;

  if (!id) return {};

  const data = useAsyncData(
    `donation-${id}`, // Dynamic key to ensure caching by ID
    async () => {
      const response = await api.get(`/gift/donation/${id}`);

      return response.data.result;
    },
    { watch: [locale] }
  );

  return data;
};
