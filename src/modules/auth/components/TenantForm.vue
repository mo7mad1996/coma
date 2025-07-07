<template>
  <div class="register_form max-w-[420px] w-[90vw] relative">
    <h2
      class="text-black font-bold text-center my-4 lg:text-4xl md:text-4xl text-3xl"
    >
      {{ $t("auth.signup_tenant") }}
    </h2>
    <div class="absolute top-0">
      <v-btn
        :icon="locale == 'ar' ? 'mdi-arrow-right' : 'mdi-arrow-left'"
        v-if="window"
        @click="window--"
        variant="plain"
      >
      </v-btn>
    </div>

    <Form
      @invalid-submit="noSubmit"
      @submit="onSubmit"
      v-slot="{ values, validate, setFieldValue, errors, setErrors }"
      :initial-values="{
        country_id: '',
        tenant_type: route.query.tenant_type || '',
      }"
    >
      <q
        class="text-lg text-gray-500 mb-6 text-center block"
        v-if="values.tenant_type"
      >
        {{
          $t(tenant_types.find((i: any) => i.value == values.tenant_type).name)
        }}
      </q>

      <v-window v-model="window">
        <!-- step 1  -->
        <v-window-item>
          <AuthTenantStepThree
            :validate="validate"
            :isLoading="isLoading"
            :apiErrors="apiErrors"
            :countries="countries"
            :countries_status="countries_status"
            :setFieldValue="setFieldValue"
            :values="values"
            v-model="show"
          />
        </v-window-item>

        <!-- step 2 -->
        <v-window-item>
          <AuthTenantStepOne
            :tenant_types="tenant_types"
            :values="values"
            :setFieldValue="setFieldValue"
            v-model="window"
          />
        </v-window-item>

        <!-- step 3 -->
        <v-window-item>
          <AuthTenantStepTwo
            :values="values"
            :validate="validate"
            :isLoading="isLoading"
            :setFieldValue="setFieldValue"
            :apiErrors="apiErrors"
          />
        </v-window-item>

        <!-- step 4 -->
        <v-window-item>
          <AuthTenantStepFour
            :dashboard_url="dashboard_url"
            :website_url="website_url"
            :status="status"
          />
        </v-window-item>
      </v-window>
    </Form>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { Form, defineRule } from "vee-validate";
import { useAuth } from "../services/auth";

const props = defineProps(["countries", "countries_error", "countries_status"]);

const { t, locale } = useI18n();
const { checkDomain, createTenant, isLoading } = useAuth();
const route = useRoute();
const { user } = useAuth();

// data
const show = ref<boolean>(false);
const apiErrors = ref<any>({});
const status = ref<string>("");
const website_url = ref<string>("");
const dashboard_url = ref<string>("");
const tenant_types: any = [
  { name: "auth.tenant_type", value: "", icon: "" },
  // { name: "auth.beneficiary", value: "beneficiary", icon: "mdi-charity" },
  { name: "auth.individual", value: "individual", icon: "mdi-account-tie" },
  { name: "auth.influencer", value: "influencer", icon: "mdi-crowd" },
  { name: "auth.family", value: "family", icon: "mdi-human-male-female-child" },
  {
    name: "auth.company_website",
    value: "company",
    icon: "mdi-office-building",
  },
  { name: "auth.student_union", value: "student_union", icon: "mdi-school" },
  { name: "auth.mosque", value: "mosque", icon: "mdi-mosque" },
  { name: "auth.supporter", value: "supporter", icon: "mdi-currency-usd" },
  { name: "auth.other", value: "other", icon: "mdi-help" },
];
const isValidTenantType = tenant_types.some(
  (t: any) => t.value === route.query.tenant_type
);
const window = ref(
  isValidTenantType && route.query.window ? Math.min(+route.query.window, 1) : 0
);

// methods
const onSubmit = (p: any) => {
  const payload = {
    ...p,
    user_id: user.value?.id,
    referral_id: route.query.referral_id || null,
  };

  apiErrors.value = {};

  if (window.value == 2)
    checkDomain(
      payload,
      (res: any) => {
        const { exists } = res.data.result;
        if (!exists)
          createTenant(
            payload,
            (res: any) => {
              if (res.data.status) window.value = 2;
              status.value = res.data.result.status;
              dashboard_url.value = res.data.result.dashboard_url;
              website_url.value = res.data.result.website_url;
              window.value = 3;
            },
            (err: any) => {
              const errors = err.response.data.errors;
              apiErrors.value = errors;
              const errors_keys = Object.keys(errors);
              if (errors_keys.length == 1 && errors_keys[0] == "domain")
                window.value = 2;
            }
          );
        else apiErrors.value.domain = [res.data.message];
      },
      (err: any) => {
        console.error(err);
      }
    );
  else
    createTenant(
      payload,
      (res: any) => {
        if (res.data.status) window.value = 1;
        status.value = res.data.result.status;
        dashboard_url.value = res.data.result.dashboard_url;
        website_url.value = res.data.result.website_url;
      },
      (err: any) => {
        const errors = err.response.data.errors;
        apiErrors.value = errors;

        const targetKeys = ["domain", "tenant_type"];
        const errors_keys = Object.keys(errors);
        if (
          errors_keys.length == 2 &&
          targetKeys.every((key) => errors_keys.includes(key))
        )
          window.value = 1;
        else if (payload.tenant_type) window.value = 1;
      }
    );
};

const noSubmit = ({ values }: any) => {
  onSubmit(values);
};
</script>

<style scoped lang="scss">
.item {
  @apply rounded-xl grid place-content-center px-12 py-8 text-black transition-all border border-blue-400 cursor-pointer;

  &:hover {
  }

  &:has(input:checked) {
    @apply bg-blue-400 shadow-md;
  }

  input {
    @apply hidden;
  }
}
</style>
