<template>
  <BreadCrumb v-if="!user">
    <template #first_page>
      <NuxtLink to="/">
        {{ $t("global.home") }}
      </NuxtLink>
    </template>
    <template #second_page> {{ $t("global.campaigns") }} </template>
  </BreadCrumb>

  <GlobalContainer class="all-campaigns">
    <h1 class="text-black font-bold lg:text-4xl md:text-4xl text-3xl">
      {{ $t("campaigns.all_campaigns") }}
    </h1>

    <CampaignsFilters
      v-if="status == 'success'"
      :filter="filter"
      :submit="submit"
    />

    <SkeletonLoader :loading="status" />

    <div
      v-if="status == 'success'"
      class="campaigns grid gap-6 pt-sm pb-sm grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2"
    >
      <HomeCampaignSectionCampaignCard
        v-for="(campaign, index) in campaigns"
        :key="index"
        :campaign="campaign"
      />
    </div>
    <GlobalNoData :status="status" :data="campaigns" />

    <GlobalPagination
      v-if="status == 'success'"
      v-model="currentPage"
      @pageChange="handlePageChange(currentPage)"
      @per_pageChange="update_perPage"
      :length="campaignsMeta.last_page"
      :per_page="campaignsMeta.per_page"
    />
  </GlobalContainer>
</template>

<script setup>
// components
import BreadCrumb from "~/global/BreadCrumb.vue";
import SkeletonLoader from "~/global/SkeletonLoader.vue";
import { useAuth } from "~/modules/auth/services/auth";

// utils
import { useGlobalVar } from "~/helpers/global-var";

import { useCampaigns } from "../services/campaigns";

// init
const { siteName } = useGlobalVar();
const { user } = useAuth();
const router = useRouter();
const route = useRoute();
const { campaigns, campaignsMeta, refresh, status } = useCampaigns();

// data
const currentPage = ref(+route.query.page || 1);
const isLoading = ref(true);
const filter = reactive({
  gender: route.query.gender || "",
  home_status: route.query.home_status || "",
  refugee: route.query.refugee || "",
  has_breadwinner: route.query.has_breadwinner || "",
  age: Array.isArray(route.query.age)
    ? route.query.age[0]
    : route.query.age || "",
});
const searchQuery = useState("search", () => route.query.orphan_name || "");

// methods
function getFilter() {
  const object = {
    ...filter,
    min_age:
      (Array.isArray(filter.age) ? filter.age[0] : filter.age)
        ?.split("-")
        .at(0) || "",
    max_age:
      (Array.isArray(filter.age) ? filter.age[0] : filter.age)
        ?.split("-")
        .at(-1) || "",
    orphan_name: searchQuery.value,
    page: currentPage.value,
  };

  for (const key in object) {
    if (!object[key] || object[key] == "") delete object[key]; // remove empty value
  }

  return object;
}

const handlePageChange = async (page) => {
  router.push({
    query: {
      ...route.query,
      page,
    },
  });
};
const update_perPage = (per_page) => {
  router.push({
    query: {
      ...route.query,
      per_page,
    },
  });
};

const submit = () => {
  const payload = getFilter();

  window?.scrollTo(0, 0);
  router.push({ query: payload });
};

// watch data
watch([currentPage, searchQuery], submit);
watch(filter, submit, { deep: true });

// SEO
siteName("campaigns.page_title_campaigns");

setTimeout(() => {
  isLoading.value = false;
}, 3000);
</script>
