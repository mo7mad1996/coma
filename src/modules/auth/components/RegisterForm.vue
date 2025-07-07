<template>
  <div class="register_form max-w-[420px] w-[90vw]">
    <h2
      class="text-black font-bold text-center py-4 lg:text-4xl md:text-4xl text-3xl"
    >
      {{ $t("auth.signup") }}
    </h2>

    <Form @submit="onSubmit">
      <!-- photo -->
      <div>
        <label
          for="photo"
          class="relative flex cursor-pointer justify-center w-fit mx-auto group"
        >
          <img
            :src="previewUrl || placeholderImage"
            alt=""
            class="aspect-square rounded-full w-24 shadow object-cover"
          />

          <v-icon
            icon="mdi-pencil-box-outline"
            size="small"
            style="position: absolute"
            class="top-[70%] left-[70%] bg-white group-hover:flex hidden"
          />
        </label>

        <div class="hidden">
          <Field
            type="file"
            v-model="newUser.photo"
            @change="previewImage"
            name="photo"
            id="photo"
          />
        </div>
      </div>
      <p
        class="error text-center"
        v-for="(err, n) in apiErrors?.photo"
        :key="n"
        v-html="err"
      />
      <!-- first name and last name -->
      <div class="flex gap-2 py-2 items-center">
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
              id="first_name"
              :validateOnInput="true"
              class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
              :placeholder="$t('auth.first_name')"
              v-model="newUser.first_name"
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
              v-model="newUser.last_name"
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
            :validateOnInput="true"
            v-model="newUser.email"
            id="email"
            :placeholder="$t('auth.email')"
            class="block w-full ltr:pl-10 rtl:pr-10 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
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
      <!-- phone number -->
      <ClientOnly>
        <div class="mt-4">
          <Field
            v-slot="{ field }"
            name="mobile"
            rules="required"
            :validateOnInput="true"
            v-model="newUser.mobile"
          >
            <VueTelInput
              v-bind="field"
              @countryChanged="update_country_code"
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
      </ClientOnly>

      <!-- country and city -->
      <!-- <div class="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-3 mt-4"> -->
      <!-- country id -->
      <!-- 
      <div>
        <div class="relative">
          <Field
            name="country_id"
            v-slot="{ field, errors }"
            rules="required"
            v-model="newUser.country_id"
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
                          selectedCountry.iso &&
                          selectedCountry.iso.toLocaleLowerCase() != 'il'
                        "
                        width="20"
                        :src="`https://flagcdn.com/${selectedCountry.iso.toLocaleLowerCase()}.svg`"
                        :alt="selectedCountry.name"
                      />
                      <span>
                        {{ selectedCountry.name }}
                      </span>
                    </div>
                  </template>
                </v-list-item>
              </template>
              <v-list>
                <v-list-item
                  v-for="(country, index) in [
                    { name: $t('auth.country'), value: '', iso: '', id: '' },
                    ...countries,
                  ]"
                  @click="newUser.country_id = country.id"
                  :key="index"
                >
                  <template v-slot:title>
                    <div class="flex gap-1 items-center">
                      <img 
                        v-if="
                          country.iso && country.iso.toLocaleLowerCase() != 'il'
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
      -->

      <!-- city id -->
      <!-- <div>
          <div class="relative">
            <Field
              as="select"
              name="city_id"
              rules="required"
              v-model="newUser.city_id"
              :disabled="!newUser.country_id"
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
      <!-- </div> -->

      <!-- password input -->
      <div>
        <div class="relative mt-4">
          <div
            class="absolute ltr:right-0 rtl:left-0 inset-y-0 flex items-center ltr:pr-3 rtl:pl-3 cursor-pointer"
            @click="show1 = !show1"
          >
            <v-icon
              v-if="show1"
              size="small"
              class="text-indigo-500"
              icon="mdi-eye-outline"
            />
            <v-icon
              v-else
              size="small"
              class="text-indigo-500"
              icon="mdi-eye-off-outline"
            />
          </div>

          <!-- rules="required|min:6|password" -->
          <Field
            :type="show1 ? 'text' : 'password'"
            name="password"
            rules="required"
            :validateOnInput="true"
            v-model="newUser.password"
            id="password"
            :placeholder="$t('auth.password')"
            autocomplete="new-password"
            class="block w-full px-4 py-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
            required
          />
        </div>

        <ErrorMessage class="error" name="register-password" />
        <p
          class="error"
          v-for="(err, n) in apiErrors.password"
          :key="n"
          v-html="err"
        />
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
            <v-icon
              v-if="show2"
              size="small"
              class="text-indigo-500"
              icon="mdi-eye-outline"
            />
            <v-icon
              v-else
              size="small"
              class="text-indigo-500"
              icon="mdi-eye-off-outline"
            />
          </div>

          <Field
            :type="show2 ? 'text' : 'password'"
            name="password_confirmation"
            rules="required|confirmed:@password"
            :validateOnInput="true"
            v-model="newUser.password_confirmation"
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

      <!-- terms and conditions -->
      <v-checkbox
        v-model="isRemember"
        class="checkbox"
        color="#596de7"
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

      <!-- error message from backend -->
      <!-- <p class="error-msg text-sm text-red-500 text-center mb-2">{{ error }}</p> -->

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
        >{{ $t("auth.signup") }}</v-btn
      >

      <!-- do not have account option -->
      <p class="text-sm pt-sm text-center">
        {{ $t("auth.have_account") }}
        <nuxt-link to="/login" class="text-blue-400 underline cursor-pointer">
          {{ $t("auth.login") }}
        </nuxt-link>
      </p>
    </Form>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ErrorMessage, Field, Form, defineRule } from "vee-validate";
// @ts-ignore
// import { VueTelInput } from "vue-tel-input";
import * as pkg from "vue-tel-input";
const { VueTelInput } = pkg;
// @ts-ignore
import placeholderImage from "~/assets/images/auth/placeholderImage.jpg";

import { type NewUser } from "~/helpers/interfaces";
import { useAuth } from "../services/auth";
import { useCountries } from "../services/countries";
// import { useCities } from "../services/cities";

const { t } = useI18n();

const show1 = ref<boolean>(false);
const show2 = ref<boolean>(false);
const isRemember = ref<boolean>(true);
const apiErrors = ref<any>({});

const { register, isLoading } = useAuth();
const {
  data: { data: countries },
  status,
}: any = useCountries();
// const { getCites } = useCities();

const newUser = ref<NewUser>({
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
  password: "",
  password_confirmation: "",
  // country_id: "",
  // city_id: "",
  user_type: "donor",
  photo: null,
  country_code: "",
});

const previewUrl = ref<string | null>(null);

const update_country_code = (v: any) => {
  newUser.value.country_code = `+${v.dialCode}`;
};

const previewImage = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    previewUrl.value = URL.createObjectURL(file);
  }
};

// const cities = ref([]);
const cities = computed(() => {
  if (newUser.value?.country_id)
    return countries.value.find((i: any) => i.id == newUser.value?.country_id)
      .cities;
  else return [];
});

// watch(
//   () => newUser.value?.country_id,
//   async (v: string) => {
//     cities.value = [];
//     const { data } = await getCites(v);
//     cities.value = data.result.data;
//   }
// );

const selectedCountry: any = computed(() => {
  return [
    {
      name: t("auth.country"),
      value: "",
      iso: "",
      id: "",
    },
    countries.value,
  ]
    .flat()
    .find((i: any) => i?.id == newUser.value?.country_id);
});

const onSubmit = () => {
  apiErrors.value = {};
  register(
    newUser.value,
    (err: any) => (apiErrors.value = err.response.data.errors)
  );
};
</script>

<style scoped>
.error {
  @apply text-sm text-red-500;
}
</style>
