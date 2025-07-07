<template>
  <section aria-label="login page" class="bg-neutral-100 min-h-[50dvh]">
    <GlobalContainer>
      <div class="flex justify-center py-sm">
        <div
          class="bg-white rounded-xl overflow-hidden max-w-[730px] w-[80dvw]"
        >
          <!-- 
          <v-tabs v-model="tab" fixed-tabs>
            <v-tab value="donor">{{ $t("auth.login_as_donor") }}</v-tab>
            <v-tab value="website">{{ $t("auth.login_as_website") }}</v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="donor">
              <AuthLoginForm />
            </v-tabs-window-item>
            <v-tabs-window-item value="website">
              <AuthWebsiteLoginForm />
            </v-tabs-window-item>
          </v-tabs-window> 
          -->

          <AuthPageHeader
            :title="$t('auth.login_title')"
            :description="$t('auth.login_description')"
          />

          <div class="p-4 md:!p-8">
            <AuthWebsiteLoginForm />
          </div>
        </div>
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";

const tab = ref("donor");

definePageMeta({
  middleware: "guest",
});

const { siteName } = useGlobalVar();
siteName("auth.page_title_login");
</script>
