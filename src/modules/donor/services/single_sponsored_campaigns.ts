import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

export const useSingleSponsoredCampaigns = () => {
  const { locale } = useI18n();
  const { backendUrl } = useTenant();

  const route = useRoute();
  const recurring_donation_id = computed(() => route.params.id);

  const { data, error, refresh, status, clear } = useAsyncData(
    "sponsored-list-campaigns",
    () =>
      api
        .get(`${backendUrl}/get/recurring/donation/campaigns/details`, {
          params: {
            ...route.query,
            recurring_donation_id: recurring_donation_id.value,
          },
        })
        .then((response: any) => response.data.result),
    { watch: [locale, recurring_donation_id] }
  );

  return {
    data,
    error,
    refresh,
    status,
    clear,
  };
};
