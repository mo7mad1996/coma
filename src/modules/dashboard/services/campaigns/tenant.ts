import { api } from "~/helpers/axios";

export const useUserCampaigns = () => {
  const { locale } = useI18n();
  const page = ref(1);

  const {
    data: campaigns,
    status,
    refresh,
    error,
  } = useAsyncData(
    "userCampaigns",
    async () => {
      return api
        .get("/tenant/campaigns", { params: { page: page.value } })
        .then((res) => res.data.result || []);
    },
    {
      watch: [locale, page],
    }
  );

  const data = computed(() => campaigns.value?.data || []);
  const meta = computed(() => campaigns.value?.meta || {});

  return {
    data,
    status,
    error,
    page,
    meta,
    refresh,
    updatePage: (newPage: number) => (page.value = newPage),
  };
};
