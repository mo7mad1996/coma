<template>
  <section class="gap-2 flex">
    <div
      v-if="!user"
      class="flex border rounded-lg flex-1 !outline-none bg-neutral-100 items-center overflow-hidden"
    >
      <div class="flex-1">
        <input
          placeholder="120.00"
          v-model="amount"
          class="bg-white py-2 px-1 !w-full h-full font-normal"
        />
      </div>
      <div class="text-neutral-400 px-1 md:!px-3">
        {{ selectedCurrencyLabel || "USD" }}
      </div>
    </div>

    <button
      class="flex-1 bg-indigo-500 text-white text-center max-md:text-sm py-2 rounded-lg transition hover:opacity-80"
      @click.stop="
        $router.push({
          name: 'campaign',
          params: { id },
          query: { ...$route.query, amount: +amount || undefined },
        })
      "
    >
      {{ $t("home.donate") }}
    </button>

    <button
      class="bg-white !text-indigo-500 border aspect-square !border-indigo-500 overflow-hidden py-2 px-2 flex items-center justify-center gap-2 rounded-lg hover:opacity-80"
      @click.stop="cart.push(campaign)"
      v-if="!user && !cart.find((i) => i.id == id)"
    >
      <v-icon>mdi-cart-outline</v-icon>
    </button>

    <template v-if="'beneficiary' != user?.user_type">
      <button
        class="!text-indigo-500 border !border-indigo-500 bg-white overflow-hidden py-2 rounded-lg hover:opacity-80 flex-1 text-center"
        @click.stop="book(campaign)"
        v-if="user && !campaign.booked"
      >
        <div class="loader my-0" v-if="loading"></div>
        <template v-else>
          <span>{{ $t("home.book") }}</span>
          <!-- <v-icon>mdi-bookmark</v-icon> -->
        </template>
      </button>
      <button
        class="!text-red-500 border !border-red-500 bg-white overflow-hidden py-2 rounded-lg hover:opacity-80 text flex-1 text-center"
        v-if="user && campaign.booked"
        @click.stop="un_book(campaign)"
      >
        <div class="loader my-0" v-if="loading"></div>
        <template v-else>
          <span>{{ $t("home.un_book") }}</span>
          <!-- <v-icon>mdi-bookmark-off</v-icon> -->
        </template>
      </button>
    </template>
  </section>
  <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
</template>

<script setup>
import { useAuth } from "~/modules/auth/services/auth";
import { useBooking } from "../../services/booking";

import { storeToRefs } from "pinia";
import { useCurrencyStore } from "~/modules/campaigns/store/currancy";

// const { data: currenciesData, refresh } = useCurrencies();

const currencyStore = useCurrencyStore();
const { selectedCurrency, selectedCurrencyLabel, selectedCurrencyName } =
  storeToRefs(currencyStore);

import { useField } from "vee-validate";

// @ts-ignore
defineProps(["id", "campaign"]);
const { book, un_book, loading } = useBooking();
const { setValue, errorMessage } = useField("a", "englishNumbersOnly");

const cookieValue = useCookie("cart");
const cart = useState("cart", () =>
  cookieValue.value ? cookieValue.value : []
);

const amount = ref("");
watch(amount, (v) => setValue(v, true));
const { user } = useAuth();

const { locale } = useI18n();
</script>

<style scoped>
.flex-group {
  display: flex;
  gap: 8px;
}
</style>
