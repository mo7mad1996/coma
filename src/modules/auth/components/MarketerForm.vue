<template>
  <div class="max-w-[420px] w-[90vw]">
    <h1
      class="text-center text-2xl font-bold py-2 flex gap-2 justify-center items-center"
    >
      {{ $t("auth.register_as_a_marketer") }}
      <img loading="lazy" :src="marketer" alt="marketer" />
    </h1>

    <Form @submit="submit">
      <!-- first name and last name -->
      <div class="flex gap-2 py-2 items-center mt-4">
        <v-icon icon="mdi-account-circle-outline" class="text-indigo-500" />
        <span>{{ $t("auth.name") }}</span>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-3">
        <div>
          <div class="relative">
            <Field
              type="text"
              name="first_name"
              rules="required"
              v-model="user.first_name"
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
              v-model="user.last_name"
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

      <!-- country_id & city_id -->
      <div class="flex gap-2 py-2 items-center mt-4">
        <v-icon class="text-indigo-500" icon="mdi-map-legend" />
        <span>{{ $t("auth.nation") }}</span>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-3">
        <!-- country id -->
        <div>
          <div class="relative">
            <Field
              as="select"
              name="country_id"
              rules="required"
              :validateOnInput="true"
              v-model="user.country_id"
              id="country_id"
              :placeholder="$t('auth.country')"
              class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
            >
              <option selected disabled value="">
                {{ $t("auth.country") }}
              </option>
              <option
                v-for="(country, index) in countries"
                :key="index"
                :value="country.id"
              >
                {{ country.name }}
              </option>
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
              v-model="user.city_id"
              :disabled="!user.country_id"
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

      <!-- user information -->
      <div class="flex gap-2 py-2 items-center mt-4">
        <v-icon class="text-indigo-500" icon="mdi-account-outline" />
        <span>{{ $t("auth.personal_information") }}</span>
      </div>

      <!--email Input -->
      <div>
        <div class="relative">
          <div
            class="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3 text-lg"
          >
            <v-icon
              size="small"
              icon="mdi-email-outline"
              class="text-indigo-500"
            />
          </div>

          <Field
            type="text"
            name="email"
            :validateOnInput="true"
            v-model="user.email"
            rules="required"
            id="email"
            :placeholder="$t('auth.email')"
            class="block w-full ltr:pl-10 rtl:pr-10 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
          />
        </div>

        <ErrorMessage class="text-red-500 text-sm" name="email" as="span" />
        <p
          class="error"
          v-for="(err, n) in apiErrors.email"
          :key="n"
          v-html="err"
        />
      </div>

      <!-- phone number -->
      <div class="mt-4">
        <client-only>
          <div class="relative mt-4">
            <Field
              v-slot="{ field }"
              name="mobile"
              rules="required"
              :validateOnInput="true"
              class="block w-full ltr:pl-10 rtl:pr-10 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
            >
              <VueTelInput
                v-bind="field"
                v-model="user.mobile"
                :ignoredCountries="['il']"
                :validCharactersOnly="true"
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
              />
            </Field>
          </div>

          <ErrorMessage class="error" name="mobile" />
          <p
            class="error"
            v-for="(err, n) in apiErrors.mobile"
            :key="n"
            v-html="err"
          />
        </client-only>
      </div>

      <!-- password input -->
      <div>
        <div class="relative mt-4">
          <div
            class="absolute ltr:right-0 rtl:left-0 inset-y-0 flex items-center ltr:pr-3 rtl:pl-3 cursor-pointer text-indigo-500"
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
            v-model="user.password"
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
            class="text-indigo-500 absolute ltr:right-0 rtl:left-0 inset-y-0 flex items-center ltr:pr-3 rtl:pl-3 cursor-pointer"
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
            v-model="user.password_confirmation"
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

      <!-- company information -->
      <div class="flex gap-2 py-2 items-center mt-4">
        <v-icon class="text-indigo-500" icon="mdi-domain" />
        <span>{{ $t("auth.have_company") }}</span>
      </div>
      <v-radio-group v-model="user.have_company">
        <v-radio :label="$t('auth.company.yes')" value="yes"></v-radio>
        <v-radio :label="$t('auth.company.no')" value="no"></v-radio>
      </v-radio-group>

      <div v-if="user.have_company == 'yes'">
        <div class="mt-4">
          <div class="relative mt-4">
            <div
              class="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3"
            >
              <v-icon icon="mdi-pencil-box-outline" class="text-indigo-500" />
            </div>

            <Field
              name="company_name"
              :validateOnInput="true"
              rules="required"
              v-model="user.company_name"
              id="company_name"
              :placeholder="$t('auth.company.company_name')"
              class="block w-full ltr:pl-10 rtl:pr-10 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
            />

            <ErrorMessage class="error" name="company_name" />
            <p
              class="error"
              v-for="(err, n) in apiErrors.company_name"
              :key="n"
              v-html="err"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-3 py-3">
          <div>
            <div class="relative">
              <Field
                type="text"
                name="sector"
                rules="required"
                v-model="user.sector"
                id="sector"
                :validateOnInput="true"
                class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
                :placeholder="$t('auth.company.sector')"
              />
            </div>

            <ErrorMessage class="error" name="sector" />
            <p
              class="error"
              v-for="(err, n) in apiErrors.sector"
              :key="n"
              v-html="err"
            />
          </div>

          <div>
            <div class="relative">
              <Field
                name="total_employees"
                rules="required|integer"
                v-model.number="user.total_employees"
                :validateOnInput="true"
                id="total_employees"
                :placeholder="$t('auth.company.total_employees')"
                class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
              />
            </div>

            <ErrorMessage class="error" name="total_employees" />
            <p
              class="error"
              v-for="(err, n) in apiErrors.total_employees"
              :key="n"
              v-html="err"
            />
          </div>
          <div>
            <div class="relative">
              <Field
                name="number_of_hours"
                rules="required|integer"
                v-model.number="user.number_of_hours"
                :validateOnInput="true"
                id="number_of_hours"
                :placeholder="$t('auth.company.number_of_hours')"
                class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
              />
            </div>

            <ErrorMessage class="error" name="number_of_hours" />
            <p
              class="error"
              v-for="(err, n) in apiErrors.number_of_hours"
              :key="n"
              v-html="err"
            />
          </div>
        </div>
      </div>

      <!-- terms and conditions -->
      <v-checkbox
        v-model="isRemember"
        class="checkbox"
        color="#596de7"
        required
        id="checkbox-4"
        :ripple="false"
      >
        <template v-slot:label>
          <!-- <p class="text-sm">{{ $t("auth.terms") }}</p> -->
          <nuxt-link
            to="/terms-conditions"
            class="hover:underline"
            target="_blank"
          >
            {{ $t("auth.terms") }}
          </nuxt-link>
        </template>
      </v-checkbox>

      <!-- submit Btns -->
      <v-btn
        :disabled="isLoading || !isRemember"
        :loading="isLoading"
        :ripple="false"
        type="submit"
        class="text-capitalize rounded-lg w-100 mt-2"
        variant="flat"
        size="large"
        color="primary"
      >
        {{ $t("auth.signup") }}
      </v-btn>
    </Form>
  </div>
</template>

<script setup>
import { ErrorMessage, Field, Form, defineRule } from "vee-validate";
// @ts-ignore
import * as pkg from "vue-tel-input";
const { VueTelInput } = pkg;

import { useCountries } from "../services/countries";
// import { useCities } from "../services/cities";
import { useAuth } from "../services/auth";

// assets
import marketer from "~/assets/images/auth/marketer.svg";

const { register, isLoading } = useAuth();
const {
  data: { data: countries },
  status,
} = useCountries();
// const { getCites } = useCities();

const user = reactive({
  user_type: "marketer",
  first_name: "",
  last_name: "",
  country_id: "",
  // city_id: "",
  email: "",
  password: "",
  password_confirmation: "",
  have_company: "",
  company_name: "",
  sector: "",
  total_employees: "",
  number_of_hours: "",
});

const show1 = ref(false);
const show2 = ref(false);
const isRemember = ref(true);
const cities = computed(() => {
  if (user.country_id)
    return countries.value.find((i) => i.id == user.country_id)?.cities || [];
  else return [];
});

// watch(
//   () => user.country_id,
//   async (v) => {
//     cities.value = [];
//     const { data } = await getCites(v);
//     cities.value = data.result.data;
//   }
// );

const apiErrors = ref({});
const submit = (payload) => {
  apiErrors.value = {};
  register(user, (err) => (apiErrors.value = err.response.data.errors));
};
</script>

<style scoped>
.error {
  @apply text-sm text-red-500 text-start;
}
</style>
