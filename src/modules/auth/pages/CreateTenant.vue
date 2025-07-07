<template>
  <section aria-label="login page" class="py-sm bg-neutral-100 min-h-[50dvh]">
    <GlobalContainer>
      <div class="flex justify-center">
        <div class="bg-white rounded-xl max-w-[730px] w-[80dvw]">
          <!-- <AuthTenantForm
            :countries="countries"
            :countries_error="countries_error"
            :countries_status="countries_status"
          /> -->

          <AuthPageHeader
            :title="$t('auth.register_title')"
            :description="$t('auth.register_description')"
          />

          <div class="p-2 md:!p-8">
            <AuthNoSteps />

            <AuthMoreAuth />

            <!-- do not have account option -->
            <p class="text-sm pt-sm text-center">
              {{ $t("auth.have_account") }}
              <nuxt-link
                to="/login"
                class="text-blue-400 underline cursor-pointer"
              >
                {{ $t("auth.login") }}
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";
import { useTenant } from "~/helpers/tenant";
import { useAuth } from "~/modules/auth/services/auth";

definePageMeta({
  middleware: [
    // "guest",
    async () => {
      const { user } = useAuth();
      const { tenant_name, tenant_data } = useTenant();

      if (user.value?.website_url) return await navigateTo("/");

      if (tenant_name && tenant_data?.is_agent != true)
        return await navigateTo("/");
    },
  ],
});

const { siteName } = useGlobalVar();
siteName("auth.signup_tenant");
</script>
