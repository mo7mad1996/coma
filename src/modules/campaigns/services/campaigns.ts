import { api } from "~/helpers/axios";
export const useCampaigns = () => {
  const route = useRoute();
  const { locale } = useI18n();
  const activeFilters = ref(route.query);

  const {
    data: campaignsData,
    error: campaigns_error,
    refresh: originalRefresh,
    status,
    clear,
  } = useAsyncData(
    "campaigns",
    () =>
      api
        .get("/campaigns", {
          params: activeFilters.value,
        })
        .then((response) => {
          const { data, meta } = response.data.result;
          return { data, meta };
        }),
    { watch: [locale, activeFilters] }
  );

  const refresh = (newFilters?: any) => {
    if (newFilters) {
      activeFilters.value = newFilters;
    }
    originalRefresh();
  };

  const campaigns = computed(() => campaignsData.value?.data || []);
  const campaignsMeta = computed(() => campaignsData.value?.meta || {});

  return {
    campaigns,
    campaignsMeta,
    campaigns_error,
    refresh,
    status,
    clear,
  };
};
