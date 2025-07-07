<template>
  <!-- phone number -->
  <client-only>
    <div class="mt-4">
      <Field
        v-slot="{ field }"
        name="mobile"
        rules="required"
        :validateOnInput="true"
      >
        <VueTelInput
          class="block w-full outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm focus-within:shadow-sm"
          v-bind="field"
          v-model="field.value"
          :invalidMsg="$t('auth.validation.phone')"
          :ignoredCountries="['il']"
          :inputOptions="{
            required: true,
            tabindex: 0,
            placeholder: $t('global.phone'),
          }"
          @countryChanged="
            (v) => {
              setFieldValue('country_code', `+${v.dialCode}`);
            }
          "
          :dropdownOptions="{
            showDialCode: true,
            showFlags: true,
            showDialCodeInSelection: true, //
            showDialCodeInList: true,
            showSearchBox: true,
            searchBoxPlaceholder: `${$t('global.search')}...`,
            tabindex: 1,
            debounceSearch: 300,
          }"
          mode="international"
          :autoDefaultCountry="true"
          :defaultCountry="+defaultCountry.replace(/\+/g, '')"
        />
      </Field>

      <ErrorMessage class="error" name="mobile" />
      <p
        class="error"
        v-for="(err, n) in apiErrors.mobile"
        :key="n"
        v-html="err"
      />
      <p
        class="error"
        v-for="(err, n) in apiErrors.country_code"
        :key="n"
        v-html="err"
      />
    </div>
  </client-only>
</template>

<script setup>
// @ts-ignore
import * as pkg from "vue-tel-input";
const { VueTelInput } = pkg;

import { ErrorMessage, Field } from "vee-validate";

const props = defineProps(["apiErrors", "setFieldValue", "defaultCountry"]);
</script>
