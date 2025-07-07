import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

export const useNgoSettings = () => {
  const { backendUrl } = useTenant();
  const fetch = () =>
    useAsyncData("ngo-setting", () =>
      api.get(`${backendUrl}/ngo/settings`).then((res: any) => res.data?.result)
    );

  return { fetch };
};

export const useCRUD = () => {
  const { backendUrl } = useTenant();
  const { $toast } = useNuxtApp();
  const { t } = useI18n();
  const settings = useState("settings", () => ({}));
  const isLoading = ref(false);

  // CLS
  onUnmounted(() => {
    settings.value = {};
  });

  // methods
  const update = async (values: any, { setErrors }: any) => {
    try {
      isLoading.value = true;
      const res = await api.post(
        `${backendUrl}/ngo/update/settings`,
        // objectToFormData(values, new FormData(), ["logo", "icon"]),
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      settings.value = {};
      $toast?.success(t("global_dashboard.settings_form.saved"));
    } catch (err: any) {
      $toast?.error(
        t(err?.response?.data?.message || err.message || "An error occurred")
      );
      setErrors(err.response?.data?.errors || {});
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, update };
};
