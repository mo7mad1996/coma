<template>
  <section
    aria-lable="forget password page"
    class="forget_password bg-[#F7F7F7] pt-lg pb-lg"
  >
    <GlobalContainer class="flex justify-center items-center">
      <div class="card bg-white rounded-xl w-[494px] p-sm">
        <h2
          class="text-black mb-5 text-center font-bold lg:text-4xl md:text-4xl text-3xl"
        >
          {{ $t("auth.reset_password") }}
        </h2>

        <form @submit.prevent="submit">
          <!-- email input -->
          <div class="relative mt-4">
            <div
              class="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3"
            >
              <img
                loading="lazy"
                src="~/assets/images/contact/email.svg"
                alt="orphans society image"
              />
            </div>

            <input
              type="email"
              id="custom-input"
              v-model="data.email"
              :placeholder="$t('auth.email')"
              class="block w-full ltr:pl-10 rtl:pr-10 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
            />
          </div>
          <p
            class="error"
            v-for="(err, n) in apiErrors.email"
            :key="n"
            v-html="err"
          />

          <!-- confirm email -->
          <v-btn
            class="text-capitalize rounded-lg w-100 mt-4"
            :ripple="false"
            variant="flat"
            size="large"
            type="submit"
            color="primary"
            :loading="data.loading"
            :disabled="!data.email || data.loading"
            >{{ $t("auth.reset_password") }}</v-btn
          >
        </form>

        <!-- back to login -->
        <nuxt-link to="/login">
          <p class="text-sm underline text-center mt-sm cursor-pointer">
            {{ $t("auth.back_login") }}
          </p>
        </nuxt-link>
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup>
import { api } from "~/helpers/axios";
import { useGlobalVar } from "~/helpers/global-var";
import { useResetPassword } from "../typescript/reset";
const { sendCode, forgotPassword, email } = useResetPassword();

const router = useRouter();
const { $toast } = useNuxtApp();

const apiErrors = ref({});

const data = reactive({
  email: "",
  loading: false,
});

const { siteName } = useGlobalVar();

const submit = async () => {
  try {
    apiErrors.value = {};
    data.loading = true;

    const res = await forgotPassword(data);
    router.push("/checkemail");
  } catch (err) {
    console.error(err);
    $toast.error(err?.response?.data?.message);
    apiErrors.value = err?.response?.data?.errors;
  } finally {
    data.loading = false;
  }
};

siteName("auth.page_title_reset_password");
</script>

<style scoped>
.error {
  @apply text-sm text-red-500 text-start;
}
</style>
