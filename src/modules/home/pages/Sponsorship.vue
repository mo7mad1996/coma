<template>
  <section class="pt-sm pb-sm bg-neutral-100 min-h-[50dvh]">
    <div class="flex justify-center items-center relative">
      <HomeSponsorshipCampaignsList
        :data="data"
        :list="list"
        :status="status"
        :error="error"
        :recurring_donation_id="recurring_donation_id"
      />

      <div class="bg-white p-8 rounded-xl z-10">
        <HomeSponsorshipForm v-model="data" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuth } from "~/modules/auth/services/auth";
import { useSponsored } from "~/modules/donor/services/sponsored";

const { sponsoredList, status, error } = useSponsored();

const recurring_donation_id = computed(() => {
  if (!sponsoredList.value || sponsoredList.value?.length == 0) return null;
  return sponsoredList.value[0].id;
});
const list = computed(() => {
  if (!sponsoredList.value || sponsoredList.value?.length == 0) return [];
  return sponsoredList.value[0].carts.data;
});

const data = reactive({
  amount: 0,
  donate_flow: "equal",
});

definePageMeta({
  middleware: () => {
    const { user } = useAuth();

    if (!user.value) return navigateTo("/signup-donor");
  },
});
</script>
