<template>
  <div>
    <h3 class="mb-2 text-md" :class="customClass">
      {{ $t("home.gateway") }}
    </h3>
    <Field as="div" name="gateway" id="gateway" class="flex gap-2 flex-col">
      <label
        v-for="g in gateways"
        :key="g.value"
        :for="g.value + id"
        :title="g.value"
        class="flex gap-2 border px-4 py-2 rounded-2xl cursor-pointer items-center has-[:checked]:!border-indigo-500 has-[:checked]:bg-violet-50"
      >
        <input
          type="radio"
          name="gateway"
          v-model="model"
          :value="g.value"
          :id="g.value + id"
          class="checkbox max-md:hidden"
        />

        <img :src="g.img" :alt="g.value" class="max-h-10 max-w-full" />
      </label>
    </Field>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
const { t } = useI18n();
import { api } from "~/helpers/axios";

const loading = ref(false);
const error = ref(null);

// assets
import imgStrip from "~/assets/images/donate/imgStrip.png";

// const gateways = ref([]);
const gateways = ref([
  // { img: imgCurlec, value: "curlec" },
  // { img: img2c2p, value: "2c2p" },
  { img: imgStrip, value: "stripe" },
  // {
  //   img: "https://www.paypalobjects.com/marketing/web/logos/paypal-mark-color_new.svg",
  //   value: "paypal",
  // },
]);

const model = defineModel();
const props = defineProps({
  id: { type: String, required: false },
  customClass: { type: String, required: false },
});

const getGateways = async () => {
  try {
    loading.value = true;

    const res = await api.get("/tenant/gateways");

    // // update local data
    // gateways.value = (res.data.result.data || []).map((i) => ({
    //   value: i.name,
    //   img: i.icon,
    // }));
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getGateways();
});

defineExpose({ loading, error, gateways });
</script>
