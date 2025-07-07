import { api } from "~/helpers/axios";

export const useCompletedCampaigns = () => {
  const { locale } = useI18n();

  const {
    data: completedCampaigns,
    error,
    status,
  } = useAsyncData(
    "booked-campaigns",
    () =>
      api.get("/booked/campaigns").then((response) => {
        return response?.data?.result || null;
      }),

    { watch: [locale] }
  );

  return {
    completedCampaigns,
    error,
    status,
  };
};
