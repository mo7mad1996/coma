<template>
  <button
    class="ps-2 pe-1 py-2 bg-white rounded-s-xl flex items-center justify-center"
    @click="open = !open"
  >
    <v-icon icon="mdi-chevron-left" class="rtl:-scale-x-100" v-if="!open" />
    <v-icon icon="mdi-chevron-right" class="rtl:-scale-x-100" v-if="open" />
  </button>

  <div
    class="rounded-s-xl overflow-hidden transition-all max-w-[90vw] duration-300"
    :class="open ? 'w-[470px]' : 'w-0'"
  >
    <div class="bg-white relative max-w-[480px] w-[90vw] min-h-48 p-3">
      <h1 class="p-3 text-neutral-500 font-semibold text-2xl">
        {{ $t("global.sponsored_list") }}
      </h1>

      <ul class="overflow-auto rounded-md py-5">
        <li
          v-for="(item, index) in cart"
          :key="index"
          :value="index"
          class="flex text-sm items-center gap-4 rounded hover:bg-slate-100 cursor-pointer p-2"
        >
          <NuxtLink
            :to="{ name: 'view-campaign', params: { id: item.id } }"
            class="flex-1 block overflow-hidden w-44 text-ellipsis whitespace-nowrap"
            >{{ item.campaign_name }}</NuxtLink
          >

          <div class="bg-amber-200 text-amber-800 rounded px-2 py-1 text-xs">
            <span
              v-if="
                data.donate_flow == 'equal' && typeof data.amount == 'number'
              "
            >
              {{ data.amount.toFixed(2) }}
              <!-- {{ (data.amount / cart.length).toFixed(2) }} -->
            </span>
            <span v-else>***</span>
          </div>
          <button @click.stop="cart.splice(index, 1)" v-if="cart.length > 1">
            <v-icon size="small" class="text-red-400" icon="mdi-close" />
          </button>
        </li>

        <div v-if="status == 'error'">
          <h3 class="text-center my-4">
            {{ $t("auth.error") }}
          </h3>

          <p class="my-2">{{ error }}</p>
        </div>

        <div class="loader" v-if="status == 'pending'"></div>
        <li
          v-else
          v-for="(item, index) in list_table"
          :key="index"
          :value="index"
          class="flex text-sm items-center gap-4 rounded hover:bg-slate-100 cursor-pointer p-2"
        >
          <NuxtLink
            :to="{ name: 'view-campaign', params: { id: item.campaign_id } }"
            class="flex-1 block overflow-hidden w-44 text-ellipsis whitespace-nowrap"
          >
            {{ item.orphan.name }}
          </NuxtLink>

          <div class="bg-amber-200 text-amber-800 rounded px-2 py-1 text-xs">
            <span>
              {{ item.amount }}
            </span>
          </div>

          <button
            @click.stop="remove(item)"
            :disabled="loading == item.campaign_id"
          >
            <v-icon
              size="small"
              class="text-red-400 animate-spin"
              icon="mdi-loading"
              v-if="loading == item.campaign_id"
            />
            <v-icon size="small" class="text-red-400" icon="mdi-close" v-else />
          </button>
        </li>
      </ul>

      <h2
        class="text-2xl font-bold text-center text-gray-800 my-4"
        v-if="!cart.length"
      >
        {{ $t("global.no_data") }}
      </h2>
    </div>
  </div>
</template>

<script setup>
import { useTenant } from "~/helpers/tenant";
import { api } from "~/helpers/axios";

const props = defineProps([
  "data",
  "list",
  "status",
  "error",
  "recurring_donation_id",
]);

const { backendUrl } = useTenant();

const loading = ref(false);
const open = ref(false);
const cookieValue = useCookie("cart");
const cart = useState("cart", () =>
  cookieValue.value ? cookieValue.value : []
);

const list_table = ref(props.list);

const router = useRouter();

const remove = async (item) => {
  try {
    loading.value = item.campaign_id;

    const res = await api.delete(
      `${backendUrl}/recurring-donations/remove-orphan`,
      {
        params: {
          campaign_id: item.campaign_id,
          recurring_donation_id: props.recurring_donation_id,
        },
      }
    );

    list_table.value = list_table.value.filter(
      (i) => i.campaign_id != item.campaign_id
    );
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (window.innerWidth > 1080) open.value = true;
});

watch(
  () => props.status,
  () => {
    list_table.value = props.list;
  }
);

watch(
  cart,
  (v) => {
    if (v.length == 0) {
      // router.push({ name: "campaigns" });
    }
  },
  { deep: true }
);
</script>
