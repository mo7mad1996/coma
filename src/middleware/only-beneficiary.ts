import { useAuth } from "~/modules/auth/services/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuth();

  if (!(user.value && user.value.user_type == "beneficiary")) {
    await navigateTo("/");
  }
});
