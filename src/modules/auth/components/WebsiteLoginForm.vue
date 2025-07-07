<template>
  <div class="login_form">
    <Form @submit="onSubmit" v-slot="{ validate }">
      <!--email Input -->
      <InputsEmail
        name="name"
        class="my-6"
        rules="required"
        type="text"
        :placeholder="$t('auth.enter_your_email')"
        v-model="credentials.email"
      />

      <!-- Password Input -->
      <InputsPassword
        name="password"
        rules="required"
        :placeholder="$t('auth.enter_your_password')"
        v-model="credentials.password"
      />

      <div class="flex justify-between items-center">
        <!-- Remember me -->
        <InputsCheckbox
          v-model="credentials.remember_me"
          name="remember_me"
          :title="$t('auth.remember_me')"
        />

        <!-- Forgot Password -->
        <nuxt-link
          to="/forgetpassword"
          class="block text-sm text-neutral-900 opacity-60 underline text-right mt-2"
        >
          {{ $t("auth.forget_password") }}
        </nuxt-link>
      </div>

      <!-- error message from backend -->
      <p class="error-msg text-sm text-red-500 text-center mb-2">
        {{ apiError }}
      </p>

      <!-- Submit Button -->
      <v-btn
        :disabled="isLoading"
        :loading="isLoading"
        :ripple="false"
        type="submit"
        class="text-capitalize w-full !rounded-2xl mt-2"
        variant="flat"
        size="large"
        color="#596DE7"
        @click="validate"
      >
        {{ $t("auth.login") }}
      </v-btn>
    </Form>
  </div>

  <AuthMoreAuth />

  <!-- Signup Link -->
  <p class="text-sm text-center mt-4">
    <!-- {{ $t("auth.do_not_have_website") }} -->
    {{ $t("auth.do_not_have_account") }}

    <nuxt-link to="/create/website" class="text-blue-400 underline px-2">
      <!-- {{ $t("auth.create_one") }}. -->
      {{ $t("auth.signup") }}.
    </nuxt-link>
  </p>
</template>

<script setup lang="ts">
// @ts-ignore
import { Form } from "vee-validate";
import { type User } from "~/helpers/interfaces";
import { useAuth } from "../services/auth";

const { login, isLoading } = useAuth();
const apiError = ref(null);

const credentials = ref<User>({
  email: "",
  password: "",
  remember_me: "yes",
});

const onSubmit = () => {
  // loginTenant(
  login(
    { ...credentials.value, account: credentials.value.email },
    (err: any) => (apiError.value = err.response?.data?.message || err.message)
  );
};
</script>

<style scoped>
.v-icon {
  font-size: inherit !important;
}
</style>
