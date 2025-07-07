<template>
  <div class="relative flex items-center" v-if="'search' != $route.name">
    <!-- Input Field -->
    <input
      type="text"
      v-model="searchQuery"
      :placeholder="$t('global.search')"
      inputmode="search"
      class="view-search transition-all duration-300 w-32 focus:w-60 ease-in-out text-lg text-gray-900 bg-transparent rounded-xl pl-10 py-2 pr-5 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
      @input="
        $router.push({
          name: 'campaigns',
          query: { ...$route.query, orphan_name: searchQuery },
        })
      "
    />
    <!-- view-transition-name="search" -->
    <!-- Magnifying Glass Icon -->
    <span class="absolute left-3 text-purple-500">
      <v-icon icon="mdi-magnify" class="h-6 w-6 font-bold" />
    </span>
  </div>
</template>

<script setup lang="ts">
const searchQuery = useState("search", () => "");
</script>
