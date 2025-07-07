import { api } from "~/helpers/axios";

export const useBeneficiaryCampaigns = () => {
  const { locale } = useI18n();
  const page = ref(1);

  const campaigns = useAsyncData(
    () => `beneficiary-campaigns-${locale.value}-${page.value}`,
    async () => {
      return api
        .get("/beneficiary/campaigns", { params: { page: page.value } })
        .then((res: any) => res.data.result || {});
    },
    { watch: [locale, page] }
  );

  return {
    ...campaigns,
    page,
  };
};

export const useCRUD = () => {
  const isLoading = ref(false);
  const { $toast } = useNuxtApp();
  const router = useRouter();
  const route = useRoute();
  const { id } = route.params;
  // create new campaign
  const create = async (payload: any, { setErrors }: any) => {
    try {
      isLoading.value = true;
      const res = await api.post(
        "/beneficiary/campaigns",
        // objectToFormData(payload, new FormData(), ["image", "video"]), // no need to use form data
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      $toast.success(res?.data?.message);
      const { id } = res?.data?.result;
      if (id)
        router.push({
          name: "campaigns-show",
          params: { id },
        });
    } catch (err: any) {
      console.error(err);
      $toast.error(err.response?.data?.message || err.message);
      setErrors(err.response?.data?.errors);
    } finally {
      isLoading.value = false;
    }
  };
  // edit campaign
  const edit = async (payload: any, { setErrors }: any) => {
    try {
      isLoading.value = true;
      const res = await api.post(`/campaigns/${payload.id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      $toast.success(res?.data?.message);
      const { id } = res?.data?.result;
      if (id)
        router.push({
          name: "campaigns-show",
          params: { id },
        });
    } catch (err: any) {
      console.error(err);
      $toast.error(err.response?.data?.message || err.message);
      setErrors(err.response?.data?.errors);
    } finally {
      isLoading.value = false;
    }
  };
  // show single campaign
  const show = () => {
    const campaign = useAsyncData(
      "orphan-shaw",
      () =>
        api.get(`/beneficiary/campaigns/${id}`).then((res) => res.data.result),
      { watch: [() => id] }
    );

    return { ...campaign };
  };
  // delete campaign
  const remove = (id: String) =>
    api.delete(`/beneficiary/campaigns/${id}`).then((res) => res.data);

  return { isLoading, create, show, edit, remove };
};
