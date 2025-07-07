import { decryptData } from "./data-encryption";
import { useSettings } from "~/modules/home/services/settings";

export const useGlobalVar = () => {
  const site_name_ar = ref("مجتمع الايتام");
  const site_name_en = ref("orphansociety");
  const user_type = ref("donoer");

  const tenant = computed(() => {
    const value = useCookie("tenant").value;
    return value ? decryptData(value as string) : null;
  });

  const { locale, t } = useI18n();
  const { data: settings } = useSettings();

  function siteName(title: string | null, static_title: string = "") {
    const site_name = settings.value?.site_name || t("home.site_name");

    useSeoMeta({
      titleTemplate: (current_title) =>
        current_title ? `%s | ${site_name} ` : site_name,
      title: static_title ? static_title : title && t(title),
    });

    watch(locale, () => {
      useSeoMeta({
        title: static_title ? static_title : title && t(title),
      });
    });
  }

  return {
    siteName,
    tenant,
    site_name_ar,
    site_name_en,
    user_type,
  };
};
