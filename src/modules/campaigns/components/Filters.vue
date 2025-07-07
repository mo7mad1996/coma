<template>
  <ClientOnly>
    <div class="grid grid-cols-9 items-end gap-8">
      <!-- class="flex-1 p-5 gap-5 grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1" -->
      <div
        class="col-span-6 gap-3 flex-row md:flex max-md:fixed max-md:inset-0 max-md:bg-white relative max-md: max-md:z-50 max-md:!p-4"
        :class="{
          hidden: !($vuetify.display.mdAndDown && open),
        }"
      >
        <div class="hidden max-md:flex">
          <div class="flex-1"></div>
          <v-btn icon="mdi-close" elevation="0" @click="open = false" />
        </div>
        <div class="flex-1">
          <h3 class="text-neutral-800">{{ $t("home.filter.gender") }}</h3>
          <InputsSelect
            :items="[
              { title: $t('home.filter.both'), value: '' },
              { title: $t('home.filter.male'), value: 'male' },
              { title: $t('home.filter.female'), value: 'female' },
            ]"
            v-model="filter.gender"
            customClass="shadow-[0_4px_44px_10px_#00000012]"
          />
        </div>

        <div class="flex-1">
          <h3 class="text-neutral-800">{{ $t("home.filter.home_status") }}</h3>

          <InputsSelect
            :items="[
              { title: $t('home.filter.not_required'), value: '' },
              { title: $t('auth.yes'), value: 'yes' },
              { title: $t('auth.no'), value: 'no' },
            ]"
            v-model="filter.home_status"
            customClass="shadow-[0_4px_44px_10px_#00000012]"
          />
        </div>

        <div class="flex-1">
          <h3 class="text-neutral-800">{{ $t("home.filter.refugee") }}</h3>

          <InputsSelect
            :items="[
              { title: $t('home.filter.not_required'), value: '' },
              { title: $t('auth.yes'), value: 'yes' },
              { title: $t('auth.no'), value: 'no' },
            ]"
            v-model="filter.refugee"
            customClass="shadow-[0_4px_44px_10px_#00000012]"
          />
        </div>

        <div class="flex-1">
          <h3 class="text-neutral-800">
            {{ $t("home.filter.has_breadwinner") }}
          </h3>

          <InputsSelect
            :items="[
              { title: $t('home.filter.not_required'), value: '' },
              { title: $t('auth.yes'), value: 'yes' },
              { title: $t('auth.no'), value: 'no' },
            ]"
            v-model="filter.has_breadwinner"
            customClass="shadow-[0_4px_44px_10px_#00000012]"
          />
        </div>

        <div class="flex-1">
          <h3 class="text-neutral-800">{{ $t("home.filter.age") }}</h3>

          <InputsSelect
            :items="[
              { title: $t('home.filter.not_required'), value: '' },
              { title: '0-5', value: '0-5' },
              { title: '5-10', value: '5-10' },
              { title: '10-15', value: '10-15' },
              { title: '15-20', value: '15-20' },
            ]"
            v-model="filter.age"
            customClass="shadow-[0_4px_44px_10px_#00000012]"
          />
        </div>
      </div>

      <div
        class="max-md:w-full col-span-9 max-md:flex max-md:gap-4 md:col-span-3 max-md:items-center"
      >
        <div
          class="flex-1 w-full flex shadow-[0_4px_44px_10px_#00000012] rounded-[14px] px-4 py-2 items-center my-4 bg-white"
        >
          <div class="flex-1 w-auto block">
            <input
              type="text"
              v-model.lazy="searchQuery"
              class="w-full min-w-0"
              :placeholder="$t('global.search')"
              inputmode="search"
            />
          </div>

          <v-icon icon="mdi-magnify" color="#7B7B7B" />
        </div>

        <button
          class="md:hidden shadow-[0_4px_44px_10px_#00000012] bg-white py-2 px-2 rounded-[10px]"
          @click="open = true"
        >
          <v-icon icon="mdi-filter-outline" color="#7B7B7B" />
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const props = defineProps(["submit", "filter"]);

const searchQuery = useState("search", () => route.query.orphan_name || "");
const open = ref(false);

watch(
  () => props.filter,
  () => (open.value = false),
  { deep: true }
);
</script>
