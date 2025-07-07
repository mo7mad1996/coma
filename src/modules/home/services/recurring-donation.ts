import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

export const useRecurringDonation = () => {
  const loading = ref(false);
  const { backendUrl } = useTenant();

  const handle = async (
    payload: any,
    cb: (a: any) => void,
    handelError: (a: any) => void
  ) => {
    try {
      loading.value = true;
      const res = await api.post(
        `${backendUrl}/recurring-donations/handle`,
        payload
      );
      if (cb) cb(res);
    } catch (err) {
      if (handelError) handelError(err);
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    handle,
    loading,
  };
};
