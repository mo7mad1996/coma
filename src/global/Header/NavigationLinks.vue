<template>
  <ul
    class="flex flex-col md:flex-row md:items-center text-lg font-semibold gap-4 p-4 md:p-0"
  >
    <template v-for="link in links" :key="link.to">
      <li v-if="link.show == true">
        <NuxtLink
          :to="link.to"
          class="one-line text-inherit text-lg hover:text-blue-500 font-semibold"
          :title="$t(link.title)"
        >
          {{ $t(link.title) }}
        </NuxtLink>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
// import { useTenant } from "~/helpers/tenant";
import { useAuth } from "~/modules/auth/services/auth";

import { useTenant } from "~/helpers/tenant";
const { user } = useAuth();

const tenant = reactive(useTenant());
// const tenant = useTenant();
const currentTenant = ref(false);
watch(
  tenant,
  (myTenant: any) => {
    if (myTenant) {
      currentTenant.value = myTenant?.tenant_name == "";
    }
  },
  { immediate: true }
);

const links = computed(() => [
  { to: "/", title: "global.home", show: true },
  { to: "/campaigns", title: "global.campaigns", show: true },
  { to: "/about", title: "global.about_us", show: false },
  { to: "/contact", title: "global.contact_us", show: true },
  // { to: "/blogs", title: "global.blogs", show: true },
  // { to: "/stories", title: "global.stories", show: true },
  {
    to: "/signup",
    title: "global.register_as_a_volunteer",
    show: currentTenant.value && !user.value && false,
  },
]);
</script>

<style scoped>
.router-link-exact-active {
  @apply text-blue-500;
}
</style>
