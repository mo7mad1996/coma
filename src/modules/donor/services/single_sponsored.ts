import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

export const useSingleSponsored = () => {
  const { locale } = useI18n();
  const { backendUrl }: any = useTenant();

  const route = useRoute();
  const recurring_donation_id = computed(() => route.params.id);
  const page = ref(1);
  const per_page = ref(10);

  const { data, error, refresh, status, clear } = useAsyncData(
    "single-sponsored",
    () =>
      api
        .get(
          `${backendUrl}/recurring/donations/${recurring_donation_id.value}`,
          {
            params: { page: page.value, per_page: 1000 },
          }
        )
        .then((response: any) => response.data.result),
    { watch: [locale, recurring_donation_id] }
  );

  return {
    data,
    error,
    refresh,
    status,
    clear,
    page,
    per_page,
  };
};
