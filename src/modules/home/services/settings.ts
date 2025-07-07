import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

export const useSettings = () => {
  const { locale } = useI18n();
  const tenant = useTenant();

  const data = useAsyncData(
    "setting",
    () =>
      api
        .get(`${tenant.url}/setting`)
        .then((res) => tenant.setData(res.data?.result)),
    { watch: [locale] }
  );

  return data;
};
