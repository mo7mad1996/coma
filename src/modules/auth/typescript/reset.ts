import { api } from "~/helpers/axios";
import { useAuth } from "../services/auth";
import { useTenant } from "~/helpers/tenant";

export const useResetPassword = () => {
  const { user } = useAuth();
  const show1 = ref<boolean>(false);
  const show2 = ref<boolean>(false);
  const timeLeft = ref<number>(60);
  const email = useCookie("email");
  const { backendUrl } = useTenant();

  const formattedTime = computed<string>(() => {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  });

  let timerInterval: any;
  const startTimer = (): void => {
    timeLeft.value = 60;
    timerInterval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  };

  onMounted(startTimer);
  onUnmounted(() => {
    if (timerInterval !== undefined) {
      clearInterval(timerInterval);
    }
  });

  const sendCode = (payload: any) => {
    email.value = payload.email;
    return api.get(`${backendUrl}/resent/code`);
  };

  const resetPassword = (payload: any) => {
    timeLeft.value = 60;
    startTimer();

    return api.post(`${backendUrl}/reset-password`, {
      email: user.value?.email || email.value,
      ...payload,
    });
  };

  const forgotPassword = async (payload: any) => {
    timeLeft.value = 60;
    startTimer();

    email.value = payload.email;

    return api.post(`${backendUrl}/forgot-password`, {
      email: user.value?.email || email.value,
      ...payload,
    });
  };

  const resendCode = async () => {
    await sendCode({ email: user.value?.email });
    timeLeft.value = 60;
    startTimer();
  };
  const showPassword = (): void => {
    show1.value = !show1.value;
  };

  const showConfPassword = (): void => {
    show2.value = !show2.value;
  };

  const forgotPasswordForTenant = (payload: any) => {
    return api.post(`${backendUrl}/tenant/send-reset`, payload);
  };

  const resetTenantPassword = (payload: any) => {
    return api.post(`${backendUrl}/tenant/update-password`, payload);
  };

  return {
    formattedTime,
    show1,
    forgotPassword,
    forgotPasswordForTenant,
    show2,
    email,
    showPassword,
    showConfPassword,
    sendCode,
    resetPassword,
    resendCode,
    timeLeft,
    resetTenantPassword,
  };
};
