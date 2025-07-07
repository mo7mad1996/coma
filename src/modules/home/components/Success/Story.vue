<template>
  <div
    class="flex md:flex-row flex-col rounded-3xl overflow-hidden items-center shadow-lg h-full"
  >
    <nuxt-link
      class="block flex-1 md:h-full"
      :to="{ name: 'story', params: { id: data.id } }"
      :aria-label="data.title"
    >
      <img
        loading="lazy"
        :alt="data.title"
        :src="data.image"
        class="md:w-[30vw] max-w-[360px] block h-56 md:h-72 object-cover"
      />
    </nuxt-link>

    <div class="px-4 md:text-start">
      <div class="text-gray-700 my-2">{{ formatDate }}</div>

      <h2 class="md:text-3xl text-xl my-2">{{ data.title }}</h2>

      <div v-html="data.content" class="line-clamp-3"></div>

      <nuxt-link
        class="p-6 group inline-flex gap-3 items-center text-md"
        :to="{ name: 'story', params: { id: data.id } }"
        :aria-label="data.title"
      >
        <span class="group-hover:underline text-md text-blue-500">
          {{ $t("global.see_more") }}
        </span>
        <v-icon
          v-if="locale == 'ar'"
          style="font-size: inherit"
          icon="mdi-arrow-left"
        />
        <v-icon
          v-if="locale == 'en'"
          style="font-size: inherit"
          icon="mdi-arrow-right"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["data"]);

// methods
const { locale } = useI18n();

const formatDate = computed(() => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (!props.data?.createdAt) return null;
  return props.data?.createdAt
    ? new Date(props.data.createdAt).toLocaleDateString(
        locale.value + "-EG",
        options
      )
    : "";
});
</script>
