<template>
  <!-- Name input -->
  <InputsText
    class="my-6"
    icon="mdi-account-outline"
    :disabled="user?.name"
    name="name"
    rules="required"
    :placeholder="$t('global.name')"
  />
  <p class="error" v-for="(err, n) in apiErrors.name" :key="n" v-html="err" />

  <!-- email input -->
  <InputsEmail
    class="my-3"
    :disabled="user?.email"
    name="email"
    rules="required|email"
    :placeholder="$t('auth.enter_your_email')"
    custom-class="!mt-0 my-6"
  />
  <p class="error" v-for="(err, n) in apiErrors.email" :key="n" v-html="err" />

  <!-- phone number -->
  <div class="my-6">
    <InputsPhone
      name="mobile"
      rules="required"
      :disabled="user?.mobile"
      :placeholder="$t('global.phone')"
    />
  </div>

  <p class="error" v-for="(err, n) in apiErrors.mobile" :key="n" v-html="err" />
  <p
    class="error"
    v-for="(err, n) in apiErrors.country_code"
    :key="n"
    v-html="err"
  />

  <!-- password input -->
  <InputsPassword
    name="password"
    rules="required"
    :placeholder="$t('auth.create_your_password')"
  />
  <p
    class="error"
    v-for="(err, n) in apiErrors.password"
    :key="n"
    v-html="err"
  />

  <!-- confirm login -->
  <v-btn
    v-if="showBTN"
    :disabled="isLoading"
    :loading="isLoading"
    :ripple="false"
    type="submit"
    class="text-capitalize rounded-lg w-100 mt-8 mb-11"
    variant="flat"
    size="large"
    @click="validate"
    color="primary"
  >
    {{ $t("auth.continue") }}
  </v-btn>
</template>
<script setup lang="ts">
// @ts-ignore
import * as pkg from "vue-tel-input";
import { useAuth } from "../../services/auth";
const { VueTelInput } = pkg;

const props = defineProps([
  "validate",
  "isLoading",
  "apiErrors",
  "countries",
  "countries_status",
  "setFieldValue",
  "values",
  "showBTN",
]);
const show = defineModel();
const iso = ref("");

const { user } = useAuth();

const mobile = ref(user.value?.mobile);
</script>

<style scoped>
.vue-tel-input {
  @apply py-1 outline-none text-gray-700 border border-gray-300 rounded-lg !shadow-sm sm:text-sm;
}
</style>
