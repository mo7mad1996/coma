<template>
  <div class="flex gap-2 items-center">
    <nuxt-link to="/dashboard/home" class="flex gap-6" v-if="user">
      <div class="flex gap-2 items-center justify-center">
        <img
          :alt="user?.full_name"
          :src="user.photo || '/img/placeholderImage.jpg'"
          class="w-7 md:!w-10 aspect-square object-cover rounded-full shadow text-center text-xs"
        />
        <span v-if="user?.first_name" class="max-md:text-sm"
          >{{ user?.first_name }}.{{ user?.last_name[0] }}</span
        >
        <span v-else class="max-md:text-sm one-line">{{ user?.email }}</span>
      </div>
    </nuxt-link>

    <nuxt-link
      v-else-if="!tenant?.tenant_name || tenant?.tenant_data?.is_agent"
      to="/login"
      class="one-line group flex items-center justify-center text-sm px-4 rounded-lg hover:opacity-70 bg-violet-500 py-2"
    >
      <!-- <v-icon
        icon="mdi-account-circle-outline"
        class="h-7 text-indigo-700 group-hover:text-white"
      /> -->

      <span class="text-white max-md:text-sm">{{ $t("auth.login") }}</span>
    </nuxt-link>
  </div>
</template>
<script lang="ts" setup>
import { useTenant } from "~/helpers/tenant";
import { useAuth } from "~/modules/auth/services/auth";

const { user, logout }: any = useAuth();

const route = useRoute();
const router = useRouter();
const tenant: any = reactive(useTenant());
const { t } = useI18n();
const currentTenant = ref(false);

watch(
  tenant,
  (myTenant: any) => {
    if (myTenant) {
      currentTenant.value = myTenant?.tenant_name !== "";
    }
  },
  { immediate: true }
);

const tenant_types = [
  // { name: "auth.beneficiary", value: "beneficiary" },
  { name: "auth.individual", value: "individual" },
  { name: "auth.influencer", value: "influencer" },
  { name: "auth.family", value: "family" },
  { name: "auth.company_website", value: "company" },
  { name: "auth.student_union", value: "student_union" },
  { name: "auth.mosque", value: "mosque" },
  { name: "auth.supporter", value: "supporter" },
  { name: "auth.other", value: "other" },
];

const checkIsInPage = () => {
  if ("create-tenant" == route.name)
    router.replace({
      path: route.fullPath,
      query: { ...route.query, reload: Date.now() },
    });
};
</script>

<style scoped>
.v-list-item__overlay {
  opacity: 0 !important;
}
</style>
