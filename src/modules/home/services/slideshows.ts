import { api } from "~/helpers/axios";

export const useSlideshows = () => {
  const { locale } = useI18n();

  const {
    data: slideshows,
    error: slideshows_error,
    status,
  } = useAsyncData(
    "slideshowsData",
    () => api.get("/slideshows").then((response) => response.data.result.data),
    { watch: [locale] }
  );

  return {
    slideshows,
    slideshows_error,
    status,
  };
};
