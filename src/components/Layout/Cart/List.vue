<template>
  <!-- <ul
    class="overflow-auto transition-all bg-zinc-100 p-2"
    :class="checked ? 'opened' : 'closed'"
  >
    <li
      v-for="(item, index) in cart"
      :key="index"
      :value="index"
      class="text-sm relative"
    >
      <NuxtLink
        :to="{ name: 'view-campaign', params: { id: item.id } }"
        class="flex flex-col rounded-xl gap-2 group p-2 bg-white w-full items-center my-2"
      >
        <div class="aspect-video overflow-hidden rounded-[1.25em]">
          <img 
            :src="item.image"
            :alt="item.campaign_name"
            class="w-full h-full block group-hover:scale-105 transition-all object-cover bg-neutral-300"
          />
        </div>

        <span
          class="text-ellipsis whitespace-nowrap overflow-hidden text-center block"
        >
          {{ item.campaign_name }}
        </span>
        <span
          class="text-ellipsis whitespace-nowrap overflow-hidden text-center block font-bold"
        >
          {{ data?.amount * times }}
          {{ selectedCurrencyName }}
        </span>

        <button
          @click.prevent.stop="cart.splice(index, 1)"
          class="absolute top-2 left-2 text-red-400 hover:bg-red-100 rounded p-1"
        >
          <v-icon icon="mdi-close" />
        </button>
      </NuxtLink>
    </li> 
  </ul>

  <button
    @click="checked = !checked"
    :class="checked || 'down'"
    class="p-1 transition-all block w-full cursor-pointer"
  >
    <v-icon icon="mdi-chevron-up" />
  </button>
  -->

  <Carousel ref="myCarousel" v-bind="{ ...options, dir: 'rtl' }">
    <Slide v-for="(campaign, index) in campaigns" :key="index">
      <HomeCampaignSectionCampaignCard
        no_link
        no_btns
        class="hide-progress_bar"
        :campaign="{ ...campaign }"
      >
        <button
          @click.prevent.stop="cart.splice(index, 1)"
          class="text-red-400 bg-red-50 hover:bg-red-100 rounded-full p-1"
        >
          <v-icon icon="mdi-close" />
        </button>
      </HomeCampaignSectionCampaignCard>
    </Slide>

    <template #addons="{ maxSlide, currentSlide, minSlide }">
      <div class="relative inline-flex gap-4 items-center mt-2" v-if="maxSlide">
        <button
          @click="myCarousel?.prev"
          class="navigation-btn"
          :class="{ disabled: minSlide == currentSlide }"
        >
          <v-icon icon="mdi-chevron-right" />
        </button>
        <button
          @click="myCarousel?.next"
          class="navigation-btn"
          :class="{ disabled: maxSlide == currentSlide }"
        >
          <v-icon icon="mdi-chevron-left" />
        </button>
      </div>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import { useCurrencyStore } from "~/modules/campaigns/store/currancy";
import { storeToRefs } from "pinia";

// @ts-ignore
import { Carousel, Slide } from "vue3-carousel";
import { api } from "~/helpers/axios";

const { locale } = useI18n();

const currencyStore = useCurrencyStore();
const { selectedCurrency, selectedCurrencyName } = storeToRefs(currencyStore);

const props = defineProps(["cart", "data"]);

const checked = ref(false);
const campaigns: any = ref([]);

watch(
  selectedCurrency,
  (v) => {
    props.data.currency_id = v;
  },
  { immediate: true }
);

watch(
  props.cart,
  (v) => {
    campaigns.value = [];
    v.forEach((item: any) => {
      if (item.name) {
        campaigns.value.push(item);
      }
    });
  },
  { deep: true }
);

onMounted(() => {
  props.cart.forEach(({ id }: any, n: number) => {
    getItem(id, n);
  });
});

const getItem = async (id: string, index: number) => {
  try {
    const response = await api.get(`/campaigns/${id}`);
    props.cart[index] = response.data.result;
  } catch (err) {
    console.error(err);
  }
};

const times = computed(() => {
  switch (props.data?.frequency) {
    case "yearly":
      return 12;

    default:
      return 1;
  }
});

const myCarousel: any = ref(null);
const options = {
  snapAlign: "start",
  // autoplay: 4500, // 4.5s
  autoplay: 0,
  wrapAround: false,
  pauseAutoplayOnHover: true,
  gap: 8,

  breakpoints: {
    // this data from vuetify: https://vuetifyjs.com/en/features/display-and-platform/
    300: { itemsToShow: 1 },
  },
};
</script>

<style scoped>
.navigation-btn {
  @apply bg-stone-50 hover:bg-stone-100 px-0 py-0 grid place-content-center aspect-square w-5 rounded-full text-sm text-indigo-500;
}

.disabled {
  @apply !text-neutral-500 !cursor-not-allowed !bg-slate-50;
}
</style>
