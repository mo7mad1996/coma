// import { useTenant } from "~/helpers/tenant";

import { api } from "~/helpers/axios";

export const useOrphans = () => {
  const page = ref(1);
  const { locale } = useI18n();
  const key = computed(() => `orphans-${locale.value}-${page.value}`);

  const fetch = useAsyncData(
    key,
    () =>
      api
        .get(`/orphans`, { params: { page: page.value } })
        .then((res: any) => res.data?.result || {}),
    { watch: [locale, page] }
  );

  return {
    ...fetch,
    page,
  };
};

export const useCRUD = () => {
  const isLoading = ref(false);
  const { $toast } = useNuxtApp();
  const router = useRouter();
  const route = useRoute();
  const { locale } = useI18n();
  const { id } = route.params;

  // create new
  const create = async (payload: any, { setErrors }: any) => {
    try {
      isLoading.value = true;
      const res = await api.post("/orphans", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      $toast.success(res?.data?.message);
      const { id } = res?.data?.result;
      if (id)
        router.push({
          name: "orphans-show",
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

  const edit = async (payload: any, { setErrors }: any) => {
    try {
      isLoading.value = true;
      const res = await api.post(`/orphans/${payload.id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      $toast.success(res?.data?.message);
      const { id } = res?.data?.result;
      if (id)
        router.push({
          name: "orphans-show",
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

  const remove = (id: String) => api.delete(`/orphans/${id}`);

  const show = () => {
    const orphan = useAsyncData(
      "orphan-shaw",
      () => api.get(`/orphans/${id}`).then((res) => res.data.result),
      { watch: [locale, () => id] }
    );

    return { ...orphan };
  };

  return {
    isLoading,
    create,
    edit,
    remove,
    show,
  };
};
