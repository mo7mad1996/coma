<template>
  <v-menu location="bottom center">
    <template v-slot:activator="{ props }">
      <div
        :class="cart.length ? 'scale-100' : 'scale-0'"
        class="transition-all"
      >
        <ClientOnly>
          <v-badge :content="cart.length" color="error">
            <v-btn
              color="#9333ea"
              v-bind="props"
              icon="mdi-human-handsup"
              size="small"
            />
            <v-tooltip activator="parent" location="bottom">
              {{ $t("global.sponsored_list") }}
            </v-tooltip>
          </v-badge>
        </ClientOnly>
      </div>
    </template>

    <div v-if="cart.length" class="bg-white shadow-lg border p-2 mt-4 rounded">
      <h3 class="text-sm px-2 text-gray-500 py-1">
        <v-icon color="#9333ea" icon="mdi-account-child" />
        {{ $t("global.sponsored_list") }}
      </h3>
      <hr class="my-2" />
      <ul class="max-h-28 overflow-auto">
        <li
          v-for="(item, index) in cart"
          :key="index"
          :value="index"
          class="flex text-sm items-center gap-4 rounded hover:bg-slate-100 cursor-pointer p-2"
        >
          <NuxtLink
            :to="{ name: 'view-campaign', params: { id: item.id } }"
            class="flex-1 block overflow-hidden w-44 text-ellipsis whitespace-nowrap"
            >{{ item.name }}</NuxtLink
          >
          <button @click.stop="cart.splice(index, 1)">
            <v-icon size="small" class="text-red-400" icon="mdi-close" />
          </button>
        </li>
      </ul>

      <hr class="my-2" />
      <nuxt-link
        :to="{ name: 'sponsorship' }"
        class="bg-sky-500 text-white px-4 overflow-hidden my-4 rounded text-sm font-semibold hover:opacity-80"
      >
        {{ $t("global.completion_of_sponsorship") }}
      </nuxt-link>
    </div>
  </v-menu>
</template>

<script setup>
const cookieValue = useCookie("cart");
const cart = useState("cart", () =>
  cookieValue.value ? cookieValue.value : []
);

watch(
  cart,
  (v) => {
    cookieValue.value = v.map((i) => ({
      id: i.id,
    }));
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
#cart_parent {
  > * {
    animation: scaleX 0.3s ease forwards;
  }
}

@keyframes scaleX {
  0% {
    transform: scale(0, 0);
  }
}
</style>
