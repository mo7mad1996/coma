import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

export const useSponsored = () => {
  const currentPage = ref(1);
  const { locale } = useI18n();
  const { backendUrl }: any = useTenant();

  const data: any = ref(null);
  const error: any = ref(null);
  const status: any = ref("idle");

  const refresh = async () => {
    try {
      status.value = "pending";
      const response = await api.get(`${backendUrl}/recurring/donations`, {
        params: {
          page: currentPage.value,
        },
      });
      data.value = response.data.result;
      status.value = "success";
    } catch (err) {
      status.value = "error";
      error.value = err;
    }
  };

  refresh();
  watch([locale, currentPage], refresh);

  const sponsoredList = computed(() => data.value?.data || []);
  const sponsoredMeta = computed(() => data.value?.meta || {});

  return {
    sponsoredMeta,
    sponsoredList,
    error,
    refresh,
    status,
    currentPage,
  };
};
