import { api } from "~/helpers/axios";

export const useBooking = () => {
  const loading = ref(false);

  const book = async (campaign: any) => {
    try {
      loading.value = true;
      const res = await api.post("/store/tenant/campaigns", {
        campaign_ids: [campaign.id],
      });

      campaign.booked = true;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  const un_book = async (campaign: any, cb: any = null) => {
    try {
      loading.value = true;
      const res = await api.post("/remove/tenant/campaigns", {
        campaign_ids: [campaign.id],
      });

      campaign.booked = false;
      if (cb) return cb(res);
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return { book, un_book, loading };
};
