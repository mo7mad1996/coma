import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";
import { useAuth } from "~/modules/auth/services/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { token, logout } = useAuth();
  const { backendUrl } = useTenant();

  const { $toast } = useNuxtApp();

  try {
    const res: any = await $fetch("/me", {
      baseURL: backendUrl,
      headers: { Authorization: `Bearer ${token.value}` },
    });
    if (res.errorCode == 301) return await navigateTo("/verify-email");
  } catch (err: any) {
    if (import.meta.client)
      $toast?.error(
        "You are not authorized to access this page. Please log in."
      );
    console?.error(err);
    return navigateTo("/login");
  }
});
