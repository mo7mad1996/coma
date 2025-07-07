import { api } from "~/helpers/axios";
export const usePublicCampaigns = () => {
  const route = useRoute();
  const { locale } = useI18n();
  const activeFilters = ref(route.query);

  const {
    data: publicCampaigns,
    error: publicCampaigns_error,
    refresh: originalRefresh,
    status,
    clear,
  } = useAsyncData(
    "public-campaigns",
    () =>
      api
        .get("/public-campaigns", {
          params: activeFilters.value,
        })
        .then((response) => response.data.result),
    { watch: [locale, activeFilters] }
  );

  const refresh = (newFilters?: any) => {
    if (newFilters) {
      activeFilters.value = newFilters;
    }
    originalRefresh();
  };

  return {
    publicCampaigns,
    publicCampaigns_error,
    refresh,
    status,
    clear,
  };
};
