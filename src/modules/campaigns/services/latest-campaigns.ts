import { api } from "~/helpers/axios";
export const useLatestCampaigns = () => {
  const route = useRoute();
  const { locale } = useI18n();
  const activeFilters = ref(route.query);

  const {
    data: latestCampaigns,
    error: campaigns_error,
    refresh: originalRefresh,
    status,
    clear,
  } = useAsyncData(
    "latest-campaigns",
    () =>
      api
        .get("/latest-campaigns", {
          params: activeFilters.value,
        })
        .then((response) => {
          return response.data.result;
        }),
    { watch: [locale, activeFilters] }
  );

  const refresh = (newFilters?: any) => {
    if (newFilters) {
      activeFilters.value = newFilters;
    }
    originalRefresh();
  };

  const campaignsMeta = computed(() => campaignsData.value?.meta || {});

  return {
    latestCampaigns,
    campaignsMeta,
    campaigns_error,
    refresh,
    status,
    clear,
  };
};
