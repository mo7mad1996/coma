<template>
  <div class="open-btn" v-if="!drawer && cart.length && !user">
    <v-badge color="primary" :content="cart.length">
      <v-btn @click="isOpen = true" icon text>
        <v-icon icon="mdi-chevron-left"></v-icon>
      </v-btn>
    </v-badge>
  </div>
  <client-only>
    <v-navigation-drawer
      v-model="drawer"
      :width="$vuetify.display.mdAndUp ? 410 : 560"
      class="cart-drawer bg-transparent border-none"
      :permanent="$vuetify.display.mdAndUp"
      :temporary="!$vuetify.display.mdAndUp"
    >
      <div
        class="py-1 ps-1 h-dvh max-md:bg-neutral-100 max-md:!py-0 max-md:!px-0 overflow-hidden"
      >
        <div
          class="w-full h-full block md:border bg-neutral-100 rounded-lg overflow-hidden relative md:bg-white blockScrollX"
          ref="container"
        >
          <div class="px-6 py-2">
            <div class="max-md:bg-white rounded-xl">
              <div
                class="flex justify-between text-lg md:text-xl items-center my-4 max-md:pt-4"
              >
                <div class="font-bold">
                  {{ $t("global.supported_list") }} ({{ cart.length }})
                </div>

                <button
                  v-if="drawer"
                  @click="isOpen = false"
                  class="bg-stone-50 aspect-square w-8 h-8 scale-85 grid place-content-center text-sm text-neutral-400 rounded-full p-2 hover:bg-stone-100"
                >
                  <v-icon>mdi-close</v-icon>
                </button>
              </div>

              <div class="max-md:bg-white rounded-xl max-md:px-2">
                <LayoutCartList :cart="cart" :data="data" />
                <LayoutCartForm :cart="cart" :data="data" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
  </client-only>
</template>

<script setup>
import { useCurrencyStore } from "~/modules/campaigns/store/currancy";
import { storeToRefs } from "pinia";
import { useAuth } from "~/modules/auth/services/auth";

const currencyStore = useCurrencyStore();
const { user } = useAuth();
const { selectedCurrencyName } = storeToRefs(currencyStore);

const { $initPerfectScrollbar } = useNuxtApp();

const cookieValue = useCookie("cart");
const cart = useState("cart", () => cookieValue.value || []);
const isOpen = ref(true);
const container = ref(null);

const drawer = computed(() => {
  return cart.value.length > 0 && isOpen.value && !user.value;
});

const data = reactive({
  name: "",
  email: "",
  amount: "",
  frequency: "one_time",
  love_donation: "no",
  ongoing_charity: "no",
  currency_id: "",
  gateway: "stripe",
  campaigns: cart.value.map((i) => i.id),
});

// watch(cookieValue, (v) => {
//   cart.value = v || [];
// });

onMounted(() => {});

watch(container, (v) => {
  if (container.value) {
    $initPerfectScrollbar(container.value);
  }
});

const times = computed(() => {
  switch (data.frequency) {
    case "yearly":
      return 12;

    default:
      return 1;
  }
});

watch(
  cart,
  (v) => {
    cookieValue.value = v.map((i) => ({
      id: i.id,
    }));

    data.campaigns = v.map((i) => i.id);
  },
  { deep: true }
);
</script>

<style>
.open-btn {
  position: fixed;
  top: 50%;
  z-index: 100;
  right: 10px;
  transform: translateY(-50%);
}
</style>
