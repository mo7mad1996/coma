import { api } from "~/helpers/axios";

export const useFooter = () => {
  const { locale } = useI18n();
  const {
    data: footer,
    error: footer_error,
    refresh,
  } = useFetch(() => `/socials`, {
    baseURL: api.defaults.baseURL,
    transform: (response: any) => response.result.data,
    watch: [locale],
    onRequest({ request, options }) {
      options.headers.set("lang", locale.value);
    },
  });
  return {
    footer,
    footer_error,
    refresh,
  };
};
