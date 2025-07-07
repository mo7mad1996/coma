<template>
  <!-- first name and last name -->
  <div class="flex gap-2 py-2 items-center">
    <v-icon icon="mdi-account-circle-outline" class="text-indigo-500" />
    <span>{{ $t("auth.name") }}</span>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-3">
    <!-- first name  -->
    <div>
      <div class="relative">
        <Field
          type="text"
          name="first_name"
          rules="required"
          id="first_name"
          :validateOnInput="true"
          class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
          :placeholder="$t('auth.first_name')"
        />
      </div>

      <ErrorMessage class="error" name="first_name" />
      <p
        class="error"
        v-for="(err, n) in apiErrors.first_name"
        :key="n"
        v-html="err"
      />
    </div>

    <!-- last name -->
    <div>
      <div class="relative">
        <Field
          type="text"
          name="last_name"
          rules="required"
          :validateOnInput="true"
          id="last_name"
          :placeholder="$t('auth.last_name')"
          class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
        />
      </div>

      <ErrorMessage class="error" name="last_name" />
      <p
        class="error"
        v-for="(err, n) in apiErrors.last_name"
        :key="n"
        v-html="err"
      />
    </div>
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from "vee-validate";

const props = defineProps(["apiErrors"]);
</script>
