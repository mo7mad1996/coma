<template>
  <div class="bg-emerald-50">
    <GlobalBreadCrumb>
      <template #first_page>
        <NuxtLink to="/">
          {{ $t("global.home") }}
        </NuxtLink>
      </template>
      <template #second_page> {{ $t("global.search") }} </template>
    </GlobalBreadCrumb>

    <GlobalContainer>
      <h1
        class="text-gray-600 text-5xl font-bold px-8 border-s-8 border-gray-600"
      >
        {{ $t("global.search") }}
      </h1>

      <div
        class="px-8 py-3 mx-auto border-violet-900 border-2 text-3xl my-3 rounded-full w-fit max-w-[90dvw] flex items-center view-search"
      >
        <!-- view-transition-name="search" -->
        <input
          ref="inputRef"
          class="focus:outline-none bg-transparent"
          autofocus
          inputmode="search"
          v-model="searchQuery"
          :placeholder="$t('global.search')"
        />

        <v-icon icon="mdi-magnify" color="#714cab" />
      </div>
    </GlobalContainer>
  </div>

  <div class="bg-neutral-50">
    <GlobalContainer>
      <ClientOnly>
        <div class="p-5 grid grid-cols-4 bg-white rounded shadow">
          <div class="grid-col">
            <v-tabs
              v-model="filter.gender"
              align-tabs="center"
              color="deep-purple-accent-4"
            >
              <v-tab value="male"><v-icon icon="mdi-gender-male" /></v-tab>
              <v-tab value="female"><v-icon icon="mdi-gender-female" /></v-tab>
            </v-tabs>
          </div>
          <div class="grid-col">
            <v-switch
              :label="$t('home.filter.home_status')"
              v-model="filter.home_status"
              value="yes"
              false-value="no"
              color="red"
            />

            <q>{{ $t("auth." + filter.home_status) }}</q>
          </div>
          <div class="grid-col">
            <v-switch
              :label="$t('home.filter.refugee')"
              v-model="filter.refugee"
              value="yes"
              false-value="no"
              color="red"
            />
            <q>{{ $t("auth." + filter.refugee) }}</q>
          </div>
          <div class="grid-col">
            <div>
              <label for="birth_date" class="font-bold block">
                {{ $t("home.filter.birth_date") }}
              </label>
              <input type="date" v-model="filter.birth_date" id="birth_date" />
            </div>
          </div>
        </div>
      </ClientOnly>
    </GlobalContainer>

    <GlobalContainer>
      <ul>
        <li v-for="orphan in data" :key="orphan.id" class="my-3 bg-white">
          <nuxt-link
            :to="{ name: 'view-campaign', params: { id: orphan.id } }"
            class="flex p-2 gap-4 items-center hover:bg-slate-50 focus:bg-slate-50"
          >
            <img
              :src="orphan.image"
              :alt="orphan.name"
              class="flex aspect-square w-24 rounded-full object-cover shadow"
            />

            <div>
              <h3 class="font-bold text-neutral-800 font-medium leading-10">
                {{ orphan.name }}
              </h3>
              <span class="text-stone-500 text-sm">
                {{ $t("home.state." + orphan.status) }}</span
              >
            </div>

            <p>{{ orphan.short_desc }}</p>
          </nuxt-link>
        </li>
      </ul>
    </GlobalContainer>
  </div>
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";
import { useSearch } from "../services/search";

const inputRef = ref(null);
const router = useRouter();
const route = useRoute();

const { search, data } = useSearch();

const { siteName } = useGlobalVar();

const filter = reactive({
  gender: "male",
  home_status: "yes",
  refugee: "no",
  birth_date: "",
});

const searchQuery = computed({
  get() {
    return route.query.q || "";
  },
  set(q) {
    router.push({ query: { ...route.query, q } });
    siteName(null, searchQuery.value);
  },
});
siteName(null, searchQuery.value);

onMounted(() => {
  inputRef.value.focus();
});

const getFilters = function () {
  return { ...filter, orphan_name: searchQuery.value };
};

watch([filter, searchQuery], () => {
  search(getFilters());
});
</script>
