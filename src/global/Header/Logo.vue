<template>
  <ClientOnly>
    <nuxt-link to="/">
      <img
        :src="logo"
        alt="Logo"
        class="max-w-28 w-auto block max-h-16 object-contain"
      />
    </nuxt-link>
  </ClientOnly>
</template>
<script lang="ts" setup>
// @ts-ignore
import websiteLogo from "~/assets/images/logo.png";
import { useTenant } from "~/helpers/tenant";

const tenant = useTenant();

const localState: any = useState("settings", () => ({}));

const logo = computed(
  () => localState.value.logo || tenant.tenant_data.logo || websiteLogo
);
</script>
