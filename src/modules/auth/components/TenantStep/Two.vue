<template>
  <!-- Domain input -->
  <div v-if="'individual' != values.tenant_type">
    <h3 class="flex gap-2 items-center">
      <!-- <v-icon icon="mdi-web-plus" class="text-[#1c441e]" /> -->
      <span>
        {{ $t("auth.domain_name") }}
      </span>
    </h3>
    <div class="text-xs text-gray-400 mb-4">
      {{ $t("auth.validation.only_letters_numbers") }}
    </div>

    <!-- Domain Field -->
    <div class="flex sm:text-sm gap-2 md:gap-4" style="direction: ltr">
      <div
        class="bg-white px-4 grid place-content-center text-slate-600 border rounded-2xl !border-gray-200"
      >
        https://
      </div>

      <div
        class="bg-white flex gap-2 md:gap-4 text-slate-600 border rounded-2xl !border-gray-200 flex-1"
      >
        <Field
          name="domain"
          :validateOnInput="true"
          rules="required|domain"
          id="domain"
          :placeholder="$t('auth.domain_name')"
          @input="check_is_domain_valid(values.domain, validate)"
          autocomplete="no"
          class="flex-1 w-auto px-4 py-2 outline-none text-gray-700"
        />
        <div class="flex-1 px-4 grid place-content-center text-slate-600">
          <span class="bg-zinc-50 px-1"> .orphanssociety.com </span>
        </div>
      </div>
    </div>
    <div v-if="domain_status.loading" class="loader"></div>
    <div
      v-else-if="domain_status.text"
      class="text-sm flex gap-2 items-center p-2"
      :class="{
        'text-red-700': domain_status.exists,
        'text-green-700': !domain_status.exists,
      }"
    >
      <v-icon icon="mdi-cancel" v-if="domain_status.exists" />
      <v-icon icon="mdi-check-decagram" v-if="!domain_status.exists" />
      {{ domain_status.text }}
    </div>

    <ErrorMessage class="error" name="domain" />
    <p
      class="error"
      v-for="(err, n) in apiErrors.domain"
      :key="n"
      v-html="err"
    />
  </div>
  <AuthIndividualDomain
    v-else
    @update="(v: string) => setFieldValue('domain', v)"
  />
  <div class="text-xs text-gray-400 mb-4">
    {{ $t("auth.validation.domain_format") }}
  </div>

  <!-- campaigns -->
  <!-- <template v-if="values.tenant_type != 'beneficiary'">
    <FieldArray name="campaign_ids" rules="required" />
    <div>
      <h3 class="flex gap-2 items-center mb-4 font-bold my-3">
        {{ $t("global.campaigns") }}
      </h3>

      <div class="flex gap-2 items-center my-4 border rounded-lg px-2">
        <input
          type="text"
          v-model="name"
          class="flex-1 py-2 outline-none"
          :placeholder="$t('global.search')"
        />
        <v-icon icon="mdi-magnify" class="text-gray-400" />
      </div>

      <div class="loader" v-if="loading"></div>

      <ul class="max-h-[300px] overflow-y-auto px-2 my-3" v-else>
        <li v-for="campaign in campaigns" :key="campaign.id">
          <label
            class="flex gap-2 items-center mb-2 cursor-pointer bg-neutral-50 px-2 rounded-md has-[:checked]:bg-indigo-50"
          >
            <img  class="rounded h-12" :src="campaign.image"  alt="im"/>
            <div class="flex-1">{{ campaign.campaign_name }}</div>

            <input
              @change="setFieldValue('campaign_ids', campaign_ids)"
              v-model="campaign_ids"
              type="checkbox"
              :value="campaign.id"
              class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </label>
        </li>
      </ul>
      <ErrorMessage class="error" name="campaign_ids" />
    </div>
  </template> -->

  <div v-html="registerText" class="my-4 text-sm"></div>

  <!-- confirm login -->
  <template v-if="showBTN">
    <client-only>
      <template #fallback>
        <v-btn
          :disabled="true"
          class="text-capitalize rounded-lg w-100 mt-2"
          variant="flat"
          size="large"
          color="primary"
          type="submit"
        >
          {{ $t("home.next") }}
        </v-btn>
      </template>
      <!-- values?.tenant_type != 'beneficiary'
      ? !values.campaign_ids?.length
      : isLoading -->
      <v-btn
        :disabled="!values.domain"
        :loading="isLoading"
        :ripple="false"
        type="submit"
        class="text-capitalize rounded-lg w-100 mt-2"
        variant="flat"
        size="large"
        color="primary"
        @click="validate"
      >
        {{ $t("auth.create") }}
        <!--     
    {{ $t("auth.continue") }}
      {{ $t("home.next") }} -->
      </v-btn>
    </client-only>
  </template>
</template>

<script setup lang="ts">
import { ErrorMessage, Field, FieldArray } from "vee-validate";
import { api } from "~/helpers/axios";
import { useTenant } from "~/helpers/tenant";

const props = defineProps([
  "values",
  "validate",
  "isLoading",
  "setFieldValue",
  "apiErrors",
  "showBTN",
]);
const { locale, t } = useI18n();

// data
const loading = ref(false);
const name = ref("");
const { backendUrl } = useTenant();

const campaign_ids = ref([]);
const campaigns: any = ref([]);
const domain_status = reactive({
  text: "",
  exists: true,
  loading: false,
});
let controller: AbortController | null = null;

// methods
const getCampaigns = async () => {
  try {
    loading.value = true;
    const { data } = await api.get("/get/campaigns/for/individuals", {
      params: { name: name.value },
    });

    campaigns.value = data.result.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const registerText = computed(() =>
  t("auth.register_agreement")
    .replace(
      "<terms>",
      '<a href="https://orphanssociety.com/page/01975eec-6efa-71ba-8999-5c294df85bcf" target="_blank" rel="noopener" class="text-blue-500 underline hover:text-blue-700 mx-1">'
    )
    .replace("</terms>", "</a>")
    .replace(
      "<privacy>",
      '<a href="https://orphanssociety.com/page/01975eed-df41-70d3-affe-2d4e019e0b35" target="_blank" rel="noopener" class="text-blue-500 underline hover:text-blue-700 mx-1">'
    )
    .replace("</privacy>", "</a>")
);

const check_is_domain_valid = async (domain: string, validate: any) => {
  // const { valid } = await validate();

  // cancel the last request
  if (controller) controller.abort();

  if (domain) {
    domain_status.loading = true;
    controller = new AbortController();
    delete props.apiErrors.domain;

    // request
    api
      .post(
        `${backendUrl}/check-domain`,
        { domain },
        { signal: controller.signal }
      )
      .then((res: any) => {
        const { exists } = res.data?.result;
        domain_status.text = res.data?.message;
        domain_status.exists = exists;
      })
      .catch((err: any) => "canceled" != err.message && console.error(err))
      .finally(() => {
        domain_status.loading = false;
      });
  } else {
    // reset
    domain_status.text = "";
    domain_status.exists = true;
    domain_status.loading = false;
  }
};

watch(
  () => props.values.tenant_type,
  () => props.setFieldValue("domain", "")
);
watch([name, locale], getCampaigns);

onMounted(() => {
  // getCampaigns();
});
</script>
