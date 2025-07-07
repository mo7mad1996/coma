<template>
  <!-- email input -->
  <div>
    <div class="relative mt-4">
      <div
        class="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3"
      >
        <v-icon icon="mdi-email-outline" class="text-indigo-500" />
      </div>

      <Field
        type="email"
        name="email"
        rules="required|email"
        :disabled="register_by == 'google'"
        :validateOnInput="true"
        id="email"
        :placeholder="$t('auth.email')"
        class="block w-full ltr:pl-10 rtl:pr-10 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
        :class="{
          disabled: register_by == 'google',
        }"
      />
    </div>

    <ErrorMessage class="error" name="email" />
    <p
      class="error"
      v-for="(err, n) in apiErrors.email"
      :key="n"
      v-html="err"
    />
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from "vee-validate";

const props = defineProps(["apiErrors", "register_by"]);
</script>

<style>
.disabled {
  @apply bg-gray-200 text-slate-400 cursor-not-allowed;
}
</style>
