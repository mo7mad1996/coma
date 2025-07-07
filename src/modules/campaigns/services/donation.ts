import { api } from "~/helpers/axios";
import Swal from "sweetalert2";

export const useDonation = () => {
  const error = ref<string | null>(null);
  const isLoading = ref(false);

  const donation_id = useCookie("donation_id");
  const donation_ids_cookie = useCookie("donation_ids");

  const { t } = useI18n();

  const makeDonation = async (donationData: any) => {
    try {
      error.value = "";
      isLoading.value = true;
      const res: any = await api.post("/donations", donationData);

      if (res.response?.data?.errors) {
        Swal.fire({
          title: res.response?.data?.message || res.message,
          html: Object.values(res.response?.data?.errors)
            .flat()
            .map((e) => `<li class="text-start">${e}</li>`)
            .join(" "),
          icon: "error",
          confirmButtonText: t("home.ok"),
        });
      }
      const { gateway_url, id } = res.data.result;
      donation_id.value = id;

      if (gateway_url) {
        window.location.href = gateway_url;
      }
    } catch (err: any) {
      Swal.fire({
        title: err.response?.data?.message || err.message,
        html: Object.values(err.response?.data?.errors)
          .flat()
          .map((e) => `<li class="text-start">${e}</li>`)
          .join(" "),
        icon: "error",
        confirmButtonText: t("home.ok"),
      });
    } finally {
      isLoading.value = false;
    }
  };

  const cartDonation = async (donationData: any) => {
    try {
      error.value = "";
      isLoading.value = true;
      const res: any = await api.post("/cart/campaigns/donation", donationData);

      if (res.response?.data?.errors) {
        Swal.fire({
          title: res.response?.data?.message || res.message,
          html: Object.values(res.response?.data?.errors)
            .flat()
            .map((e) => `<li class="text-start">${e}</li>`)
            .join(" "),
          icon: "error",
          confirmButtonText: t("home.ok"),
        });
      }
      const { gateway_url, donation_ids } = res.data.result;
      donation_ids_cookie.value = donation_ids;

      if (gateway_url) {
        window.location.href = gateway_url;
      }
    } catch (err: any) {
      Swal.fire({
        title: err.response?.data?.message || err.message,
        html: Object.values(err.response?.data?.errors)
          .flat()
          .map((e) => `<li class="text-start">${e}</li>`)
          .join(" "),
        icon: "error",
        confirmButtonText: t("home.ok"),
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    makeDonation,
    cartDonation,
    isLoading,
    error,
  };
};
