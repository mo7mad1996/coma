<template>
  <section class="pt-sm pb-sm bg-neutral-100 min-h-[50dvh]">
    <GlobalContainer>
      <div v-if="data?.requires_mobile">
        <div class="flex justify-center">
          <div class="bg-white p-8 rounded-xl min-w-96">
            <div class="flex gap-4">
              <img
                class="w-16 h-16 rounded-md border p-2"
                :src="data.google_user.photo"
                :alt="data.google_user.first_name"
              />

              <div>
                <h1 class="text-lg font-bold">
                  {{ data.google_user.first_name }}
                  {{ data.google_user.last_name }}
                </h1>
                <p class="text-teal-700 text-sm">
                  {{ data.google_user.email }}
                </p>
              </div>
            </div>

            <div
              class="flex gap-4 before:bg-neutral-200 after:bg-neutral-200 before:flex-1 after:flex-1 before:h-[1px] after:h-[1px] before:content-[''] after:content-[''] items-center my-8 text-zinc-500"
            >
              <!-- {{ $t("auth.mobile_need") }} -->
              {{ $t("auth.some_data_needed") }}
            </div>

            <Form
              @submit="onSubmit"
              v-slot="{ validate, values, setFieldValue, errors }"
            >
              <div class="my-4">
                <AuthTenantStepOne
                  :tenant_types="tenant_types"
                  :values="values"
                  :setFieldValue="setFieldValue"
                />

                <p
                  class="error"
                  v-for="(err, n) in apiErrors.user_type"
                  :key="n"
                  v-html="err"
                />
              </div>
              <div class="my-4">
                <!-- 
                <AuthTenantStepTwo
                  v-if="values.tenant_type"
                  :values="values"
                  :validate="validate"
                  :isLoading="isLoading"
                  :setFieldValue="setFieldValue"
                  :apiErrors="apiErrors"
                  :showBTN="false"
                />

                <p
                  class="error"
                  v-for="(err, n) in apiErrors.user_type"
                  :key="n"
                  v-html="err"
                /> 
                -->
              </div>

              <!-- phone number -->
              <div class="my-4">
                <client-only>
                  <Field
                    id="mobile"
                    v-slot="{ field }"
                    name="mobile"
                    rules="required"
                    :validateOnInput="true"
                  >
                    <VueTelInput
                      v-bind="field"
                      :validCharactersOnly="true"
                      :ignoredCountries="['il']"
                      :invalidMsg="$t('auth.validation.phone')"
                      :inputOptions="{
                        required: true,
                        tabindex: 0,
                        placeholder: $t('global.phone'),
                      }"
                      :dropdownOptions="{
                        showDialCode: true,
                        showFlags: true,
                        showDialCodeInSelection: true,
                        // showDialCodeInList: true,
                        showSearchBox: true,
                        searchBoxPlaceholder: `${$t('global.search')}...`,
                        tabindex: 1,
                      }"
                      mode="international"
                      @countryChanged="
                        (v: any) => setFieldValue('country_code', `+${v.dialCode}`)
                      "
                    />
                  </Field>
                </client-only>
                <ErrorMessage class="error" name="mobile" />
                <p
                  class="error"
                  v-for="(err, n) in apiErrors.mobile"
                  :key="n"
                  v-html="err"
                />
              </div>

              <!-- password input -->
              <div>
                <div class="relative mt-4">
                  <div
                    class="absolute ltr:right-0 rtl:left-0 inset-y-0 flex items-center ltr:pr-3 rtl:pl-3 cursor-pointer"
                    @click="show1 = !show1"
                  >
                    <v-icon v-if="show1" size="small">mdi-eye-outline</v-icon>
                    <v-icon v-else size="small">mdi-eye-off-outline</v-icon>
                  </div>

                  <!-- rules="required|min:6|password" -->
                  <Field
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    rules="required"
                    :validateOnInput="true"
                    id="password"
                    :placeholder="$t('auth.password')"
                    autocomplete="new-password"
                    class="block w-full px-4 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
                    required
                  />
                </div>

                <ErrorMessage class="error" name="password" />
                <p
                  class="error"
                  v-for="(err, n) in apiErrors.password"
                  :key="n"
                  v-html="err"
                />
              </div>

              <!-- confirm password  -->
              <div>
                <div class="relative mt-4">
                  <div
                    class="absolute ltr:right-0 rtl:left-0 inset-y-0 flex items-center ltr:pr-3 rtl:pl-3 cursor-pointer"
                    @click="show2 = !show2"
                  >
                    <v-icon v-if="show2" size="small">mdi-eye-outline</v-icon>
                    <v-icon v-else size="small">mdi-eye-off-outline</v-icon>
                  </div>

                  <Field
                    :type="show2 ? 'text' : 'password'"
                    name="password_confirmation"
                    rules="required|confirmed:@password"
                    :validateOnInput="true"
                    id="password_confirmation"
                    :placeholder="$t('auth.confirm_password')"
                    autocomplete="confirm-password"
                    class="block w-full px-4 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
                    required
                  />
                </div>

                <ErrorMessage class="error" name="password_confirmation" />
                <p
                  class="error"
                  v-for="(err, n) in apiErrors.password_confirmation"
                  :key="n"
                  v-html="err"
                />
              </div>

              <!-- confirm mobile -->
              <v-btn
                :disabled="isLoading"
                :loading="isLoading"
                :ripple="false"
                type="submit"
                class="text-capitalize rounded-lg w-100 mt-2"
                variant="flat"
                size="large"
                @click="validate"
                color="primary"
                >{{ $t("donor.save") }}</v-btn
              >
            </Form>
          </div>
        </div>
      </div>

      <div v-if="data?.user">
        <div class="spinner flex justify-center pb-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            c
            height="100"
            viewBox="0 0 24 24"
          >
            <path
              fill="#9333ea"
              d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
            >
              <animateTransform
                attributeName="transform"
                dur="0.6s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center gap-4" v-if="error">
        <div class="bg-white p-8 rounded-xl">
          <img
            src="~/assets/images/auth/error.webp"
            alt="error"
            class="max-w-[480px] block mb-16"
          />

          <h1 class="text-3xl text-red-500 my-6 text-center">
            {{ $t("auth.error") }}
          </h1>
          <p class="my-3 text-center">Error: {{ error.message }}</p>

          <nuxt-link
            to="/login"
            class="mx-auto border px-6 py-3 my-3 w-fit block hover:bg-neutral-200 font-semibold text-neutral-700"
          >
            {{ $t("auth.login") }}
          </nuxt-link>
        </div>
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup lang="ts">
// @ts-ignore
import * as pkg from "vue-tel-input";
import { useGoogleCallback } from "~/modules/auth/services/google-callback";
import { ErrorMessage, Field, Form } from "vee-validate";
import { useAuth } from "../services/auth";
import { useGlobalVar } from "~/helpers/global-var";

const { VueTelInput } = pkg;
const { siteName } = useGlobalVar();
const {
  saveMobile,
  isLoading,
  error: apiErr,
  successLogin,
  createTenant,
} = useAuth();
const apiErrors: any = ref({});
const { data, error, status } = useGoogleCallback();

const show1 = ref(false);
const show2 = ref(false);
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

watch(
  data,
  async (v) => {
    if (v?.user) successLogin(data.value.user, data.value.token);
  },
  {
    immediate: true,
  }
);

const onSubmit = (formData: any) => {
  apiErrors.value = {};
  const { google_token } = data.value;
  const payload = {
    ...formData,
    user_type: formData.tenant_type,
    google_token,
  };

  saveMobile(
    payload,

    (response: any) => {
      const { token: tokenValue, user: userValue } = response.data.result;

      successLogin(userValue, tokenValue);
      // createTenant(
      //   { ...payload, user_id: userValue.id },
      //   (res: any) => {
      //   },
      //   (err: any) => {
      //     apiErrors.value = err.response?.data?.errors || err.message;
      //     console.error(err);
      //   }
      // );
    },
    (err: any) => {
      console.error(err);
      apiErrors.value = err.response?.data?.result?.errors || err.message;
    }
  );
};

siteName("auth.page_title_Google_callback");
</script>

<style scoped>
.error {
  @apply text-sm text-red-500;
}
</style>
