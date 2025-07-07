<template>
  <section
    aria-lable="checking email  page"
    class="checking_email bg-[#F7F7F7] pt-lg pb-lg"
  >
    <GlobalContainer class="flex justify-center items-center">
      <div class="card bg-white rounded-xl w-[494px] p-sm">
        <v-window v-model="window">
          <v-window-item :value="1">
            <h2
              class="text-black mb-2 text-center font-bold lg:text-4xl md:text-4xl text-3xl rtl:text-2xl"
            >
              {{ $t("auth.verrify_email") }}
            </h2>

            <p class="text-sm text-[#12121299] text-center">
              {{ $t("auth.six_digits") }}
            </p>

            <Form @submit="onSubmit">
              <div style="direction: ltr">
                <Field name="otp-input" rules="required" v-slot="{ field }">
                  <v-otp-input
                    v-bind="field"
                    length="6"
                    v-model="verification_code"
                  ></v-otp-input>
                </Field>
              </div>
              <ErrorMessage
                name="otp-input"
                class="text-sm w-full text-red-500 text-center"
              />

              <p class="text-sm w-full text-red-500 text-center">
                {{ error?.response.data?.message }}
              </p>

              <!-- timer for resend code  -->
              <div class="text-center">
                <span>{{ formattedTime }}</span>
              </div>

              <v-btn
                :disabled="isLoading"
                :loading="isLoading"
                type="submit"
                class="text-capitalize rounded-lg w-100 mt-5"
                :ripple="false"
                variant="flat"
                size="large"
                color="primary"
                >{{ $t("auth.verrify_email") }}</v-btn
              >
            </Form>
            <!-- 
            <div>
              <button
                @click="window = 2"
                class="mt-sm cursor-pointer hover:no-underline underline p-2 text-sky-800"
              >
                {{ $t("auth.edit-email") }}
              </button>
            </div> -->
            <!-- Resend code -->
            <div
              v-if="timeLeft == 0"
              class="mx-auto inline-flex gap-2 items-center justify-center mt-sm cursor-pointer hover:shadow p-2"
            >
              <img
                loading="lazy"
                src="~/assets/images/auth/resent.svg"
                width="22px"
                alt="orphans society image"
              />
              <button :disabled="timeLeft != 0" @click="resendCode">
                <span
                  :class="{
                    'text-[#ddd]': timeLeft != 0,
                    'text-primary': timeLeft == 0,
                  }"
                  class="text-sm"
                >
                  {{ $t("auth.resend") }}
                </span>
              </button>
            </div>
          </v-window-item>
          <v-window-item :value="2">
            <h2
              class="text-black mb-2 text-center font-bold lg:text-4xl md:text-4xl text-3xl rtl:text-2xl"
            >
              {{ $t("auth.new-email") }}
            </h2>

            <Form @submit="editEmail">
              <div class="my-6">
                <div class="relative">
                  <div
                    class="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3 text-lg"
                  >
                    <v-icon
                      size="small"
                      icon="mdi-email-outline"
                      class="text-blue-500"
                    />
                  </div>

                  <Field
                    type="text"
                    name="email"
                    :validateOnInput="true"
                    v-model="email"
                    rules="required|email"
                    id="email"
                    :placeholder="$t('auth.email')"
                    class="block w-full ltr:pl-10 rtl:pr-10 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
                  />
                </div>

                <ErrorMessage
                  class="text-red-500 text-sm"
                  name="email"
                  as="p"
                />
              </div>

              <p class="text-sm w-full text-red-500 text-center">
                {{ error?.response.data?.message }}
              </p>

              <v-btn
                :disabled="isLoading"
                :loading="isLoading"
                type="submit"
                class="text-capitalize rounded-lg w-100 mt-5"
                :ripple="false"
                variant="flat"
                size="large"
                color="primary"
                >{{ $t("donor.save") }}</v-btn
              >
            </Form>
          </v-window-item>
        </v-window>
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup lang="ts">
// @ts-ignore
import { ErrorMessage, Field, Form } from "vee-validate";
import { useGlobalVar } from "~/helpers/global-var";
import { useAuth } from "../services/auth";
import { useResetPassword } from "../typescript/reset";
const { locale } = useI18n();
const verification_code = ref<number | string>("");
const { resendCode, formattedTime, timeLeft } = useResetPassword();

const { verifyEmail, error, isLoading, editEmail } = useAuth();
const window = ref(1);
const email = ref("");

const onSubmit = () => {
  verifyEmail(verification_code.value);
};

const { siteName } = useGlobalVar();
siteName("auth.page_title_verify_email");
</script>
