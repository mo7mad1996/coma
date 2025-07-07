<template>
  <div v-if="currentTenant">
    <h3 class="font-semibold text-lg mb-4">
      {{ $t("home.subscribe_to_the_newsletter") }}
    </h3>
    <div class="relative flex items-center">
      <input
        type="email"
        :placeholder="$t('home.enter_your_email')"
        class="w-full p-2 px-4 pl-10 rounded-xl focus:outline-none ring-1 focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
      />
      <span class="absolute left-3 text-purple-600">
        <v-icon>mdi-email-outline</v-icon>
      </span>
    </div>
    <div class="text-right">
      <button
        class="mt-4 mx-auto block bg-purple-600 text-white py-2 px-12 rounded-xl hover:bg-purple-700 text-right"
      >
        {{ $t("home.follow") }}
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { useTenant } from '~/helpers/tenant';
const tenant = reactive(useTenant()); 
const currentTenant = ref(false);
watch(tenant, (mytenant) => {
  if (mytenant) {
    currentTenant.value = mytenant?.tenant_name === ""; 
  }
}, { immediate: true }); 
 
</script>
