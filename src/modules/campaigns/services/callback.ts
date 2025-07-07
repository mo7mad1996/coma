import { storeToRefs } from "pinia";
import Swal from "sweetalert2";
import successIcon from "~/assets/images/success-icon.gif";
import { api } from "~/helpers/axios";
import { useCurrencyStore } from "../store/currancy";

export const useCallback = () => {
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const route = useRoute();
  const router = useRouter();
  const { t } = useI18n();
  const currencyStore = useCurrencyStore();
  const donation_id_cookie = useCookie("donation_id");

  const { isPaymentSuccess } = storeToRefs(currencyStore);
  const cart_cookie = useCookie("cart");
  const donation_ids = useCookie("donation_ids");
  const cart = useState("cart", () => cart_cookie.value || []);

  const callBack_recurring_donation = async (id: string) => {
    try {
      error.value = "";
      isLoading.value = true;

      const response = await api.post(
        `/callback`,
        {},
        {
          params: {
            ...route.query,
            // , razorpay_payment_link_id: id
          },
        }
      );

      await navigateTo({
        name: route.name,
        query: {},
        params: { id: route.params.id },
      });
      if (response.data.status) {
        if (response.data.result.payment_status == "paid") {
          isPaymentSuccess.value = true;
          currencyStore.setPaymentStatus(isPaymentSuccess.value);
          Swal.fire({
            title: t("campaigns.success_msg"),
            imageUrl: successIcon,
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: t("campaigns.ok"),
            confirmButtonColor: "#9333ea",
            customClass: {
              confirmButton: "my-custom-btn",
            },
            draggable: true,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: response.data.message || t("campaigns.faild_msg"),
            confirmButtonText: t("campaigns.ok"),
            confirmButtonColor: "#9333ea",
            customClass: {
              confirmButton: "my-custom-btn",
            },
          });
        }

        // if (cb) cb();
        //
      }
    } catch (err: any) {
      await navigateTo({
        name: route.name,
        query: {},
        params: { id: route.params.id },
      });
      error.value = err;
      Swal.fire({
        icon: "error",
        title: t("campaigns.faild_msg"),
        confirmButtonText: t("campaigns.ok"),
        confirmButtonColor: "#9333ea",
        customClass: {
          confirmButton: "my-custom-btn",
        },
      });
    } finally {
      isLoading.value = false;
    }
  };
  const callBack = async () => {
    try {
      error.value = "";
      isLoading.value = true;
      let endpoint = `/donations/callback`;
      if (donation_ids.value && donation_ids.value.length > 0) {
        endpoint = `/cart/campaigns/donation/callback`;
      }

      const response = await api.post(endpoint, {}, { params: route.query });

      const campaign_id = response.data?.result?.id;
      const donation_id = donation_id_cookie.value;

      if (response.data.status) {
        var url =
          response!.data!.result!.id != null
            ? `/campaigns/donate/${campaign_id}?donation_id=${donation_id}`
            : `/`;

        if (response!.data!.result.recurring_donation_id) {
          url = `/dashboard/donor/sponsored/${response.data.result.recurring_donation_id}`;
        }

        navigateTo(url);

        if (response.data.result.payment_status == "paid") {
          isPaymentSuccess.value = true;

          if (donation_ids.value && donation_ids.value.length > 0) {
            cart_cookie.value = null; // Clear cart cookie after donation
            donation_ids.value = null; // Clear donation_ids cookie
            cart.value = []; // Clear cart state
          }

          currencyStore.setPaymentStatus(isPaymentSuccess.value);
          Swal.fire({
            title: t("campaigns.success_msg"),

            // image
            imageUrl: successIcon,
            imageWidth: 200,
            imageHeight: 200,

            // buttons
            // confirm
            confirmButtonText: t("auth.c_y_o_s"),
            confirmButtonColor: "#9333ea",
            preConfirm: () => {
              // redirect to create website with individual tenant type
              navigateTo("/create/website?tenant_type=individual");
            },

            // cancel
            showCancelButton: true,
            cancelButtonText: t("campaigns.ok"),
            cancelButtonColor: "#ddc4f5",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: response.data.message || t("campaigns.faild_msg"),
            confirmButtonText: t("campaigns.ok"),
            confirmButtonColor: "#9333ea",
            customClass: {
              confirmButton: "my-custom-btn",
            },
          });
        }
        //
      }
    } catch (err: any) {
      error.value = err;
      navigateTo("/");
      console.error(err);
      Swal.fire({
        icon: "error",
        title: t("campaigns.faild_msg"),
        confirmButtonText: t("campaigns.ok"),
        confirmButtonColor: "#9333ea",
        customClass: {
          confirmButton: "my-custom-btn",
        },
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    callBack,
    callBack_recurring_donation,
    isLoading,
    error,
  };
};
