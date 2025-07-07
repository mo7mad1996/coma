import { api } from "~/helpers/axios";

export const useStatistics = () => {
  const { locale } = useI18n();
  const {
    data: statistics,
    error: statistics_error,
    refresh,
    status,
    clear,
  } = useAsyncData(
    "statistics",
    () => api.get("/statistics").then((response) => response.data.result),
    { watch: [locale] }
  );

  return {
    statistics,
    statistics_error,
    refresh,
    status,
    clear,
  };
};
