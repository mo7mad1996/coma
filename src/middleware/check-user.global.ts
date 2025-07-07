import { useAuth } from "~/modules/auth/services/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { user }: any = useAuth();
  if (
    user.value &&
    // import.meta.client &&
    user.value?.tenant_status == "pending" &&
    to.path != "/create/website"
  ) {
    return navigateTo("/create/website");
  }
});
