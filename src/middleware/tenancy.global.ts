import { useTenant } from "~/helpers/tenant";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const tenant = useTenant();
  const locale = useCookie("i18n_redirected");

  if (tenant.tenant_name !== "") {
    const checkFullURLTenant: string = `${tenant.url}/setting`;

    const { data, error }: any = await useAsyncData(
      "getData",
      () => $fetch(checkFullURLTenant),
      { watch: [locale] }
    );

    if (data.value?.result?.data && process.client) {
      const tenantData = data.value?.result?.data || {};
      tenant.setData(tenantData);
    }

    // Handle server error (e.g., 500)
    if (error.value && error.value.statusCode === 500) {
      return abortNavigation({ statusCode: 404 });
    }
  }
});
