<template>
  <div class="loader my-4" v-if="'pending' == status"></div>
  <GlobalNoData :data="sponsoredList" :status="status" />
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";
import { useSponsored } from "../services/sponsored";

const router = useRouter();
const { sponsoredList, status } = useSponsored();

watch(
  sponsoredList,
  (c) => {
    if (c.length > 0) {
      const { id } = c[0];
      router.push({ name: "sponsored-item-page", params: { id } });
    }
  },
  {
    immediate: true,
  }
);

const { siteName } = useGlobalVar();
siteName("donor.page_title_dashboard");

definePageMeta({
  layout: "donor",
  middleware: "require-auth",
});
</script>
