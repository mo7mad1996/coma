import { api } from "~/helpers/axios";
export const useSixCampaigns = () => {
  const route = useRoute();
  const { locale } = useI18n();

  const {
    data: sixCampaigns,
    error: sixCampaignsError,
    status,
  } = useAsyncData(
    "six-campaigns",
    () => api.get("/home-campaigns").then((response) => response.data.result),
    { watch: [locale] }
  );

  return { sixCampaigns, sixCampaignsError, status };
};
