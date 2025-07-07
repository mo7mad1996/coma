import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

export const useGoogleCallback = () => {
  const tenant_cookie: any = useCookie("tenant_cookie");
  const { tenant_name, baseURl, backendUrl }: any = useTenant();

  const { locale } = useI18n();
  const provider = "google";

  const route = useRoute();

  const { data, error, status } = useAsyncData(
    "GoogleCallback",
    () => {
      if (tenant_cookie.value && tenant_cookie.value != tenant_name)
        // go to tenant page
        return Promise.resolve(
          navigateTo(
            `https://${tenant_cookie.value}.${baseURl}${route.fullPath}`,
            {
              external: true,
            }
          )
        );
      else
        return api
          .get(`${backendUrl}/auth/${provider}/callback`, {
            params: route.query,
          })
          .then((response) => {
            return response.data.result;
          })
          .catch((err) => {
            console.error(err.response);
            return Promise.reject(err);
          });
    },
    { watch: [locale, backendUrl] }
  );

  return {
    data,
    error,
    status,
  };
};
