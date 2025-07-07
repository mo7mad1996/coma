import Swal from "sweetalert2";
import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

export const useRecurringDonation = () => {
  const { t } = useI18n();
  const loading = ref(false);
  const { backendUrl } = useTenant();

  const pay = async (payload: any, cb: any) => {
    try {
      loading.value = true;
      const res = await api.post(
        `${backendUrl}/create/donation/payment`,
        payload
      );
      const { gateway_url } = res.data.result;

      if (gateway_url) window.window.location.href = gateway_url;
      if (cb) cb();
    } catch (err: any) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: t("campaigns.faild_msg"),
        confirmButtonText: t("campaigns.ok"),
        html: Object.values(err.response?.data?.errors)
          .flat()
          .map((e) => `<li class="text-start">${e}</li>`)
          .join(" "),
        confirmButtonColor: "#9333ea",
        customClass: {
          confirmButton: "my-custom-btn",
        },
      });
    } finally {
      loading.value = false;
    }
  };

  return {pay, loading };
};
