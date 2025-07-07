<template>
  <!-- country and city -->
  <div class="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-3 mt-4">
    <!-- country id -->
    <div>
      <div class="relative">
        <Field
          name="country_id"
          v-slot="{ field, errors }"
          rules="required"
          v-model="userData.country_id"
          :validateOnInput="true"
          id="country_id"
          :placeholder="$t('auth.country')"
        >
          <v-menu :close-on-content-click="true">
            <template #activator="{ props }">
              <v-list-item
                v-bind="{ ...props, ...field }"
                :error-messages="errors"
                class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
              >
                <template v-slot:title>
                  <div class="flex gap-1 items-center">
                    <img
                      v-if="
                        selectedCountry?.iso &&
                        selectedCountry?.iso.toLocaleLowerCase() != 'il'
                      "
                      width="20"
                      :src="`https://flagcdn.com/${selectedCountry.iso.toLocaleLowerCase()}.svg`"
                      :alt="selectedCountry.name"
                    />
                    <span>
                      {{ selectedCountry?.name }}
                    </span>
                  </div>
                </template>
              </v-list-item>
            </template>
            <v-list>
              <v-list-item
                v-for="(country, index) in [
                  {
                    name: $t('auth.country'),
                    value: '',
                    iso: '',
                    id: '',
                  },
                  ...countries,
                ]"
                @click="userData.country_id = country.id"
                :key="index"
              >
                <template v-slot:title>
                  <div class="flex gap-1 items-center">
                    <img
                      v-if="
                        country?.iso && country?.iso.toLocaleLowerCase() != 'il'
                      "
                      width="20"
                      :src="`https://flagcdn.com/${country.iso.toLocaleLowerCase()}.svg`"
                      :alt="country.name"
                    />
                    <span>
                      {{ country.name }}
                    </span>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-menu>
        </Field>
      </div>

      <ErrorMessage class="error" name="country_id" />
      <p
        class="error"
        v-for="(err, n) in apiErrors.country_id"
        :key="n"
        v-html="err"
      />
    </div>

    <!-- city id -->
    <!-- <div>
            <div class="relative">
              <Field
                as="select"
                name="city_id"
                rules="required"
                :disabled="!values.country_id"
                :validateOnInput="true"
                id="city_id"
                :placeholder="$t('auth.country')"
                class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
              >
                <option selected disabled value="">
                  {{ $t("auth.city") }}
                </option>
                <option
                  v-for="(city, index) in cities"
                  :key="index"
                  :value="city.id"
                >
                  {{ city.name }}
                </option>
              </Field>
            </div>

            <ErrorMessage class="error" name="city_id" />
            <p
              class="error"
              v-for="(err, n) in apiErrors.city_id"
              :key="n"
              v-html="err"
            />
          </div> -->
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from "vee-validate";

import { useAuth } from "~/modules/auth/services/auth";
const props = defineProps([
  "apiErrors",
  "selectedCountry",
  "countries",
  "userData",
]);
</script>
