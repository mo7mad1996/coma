<template>
  <div class="profile-settings bg-white md:rounded-3xl md:!p-2xl p-4">
    <h3 class="text-xl font-bold py-4">{{ $t("donor.edit-profile") }}</h3>

    <div class="update-form my-5">
      <Form
        @submit="onSubmit"
        v-slot="{ validate, values, setFieldValue }"
        :initial-values="defaultValues"
      >
        <DonorProfilePhoto :apiErrors="apiErrors" />
        <DonorProfileName :apiErrors="apiErrors" />
        <DonorProfileEmail
          :apiErrors="apiErrors"
          :register_by="defaultValues.register_by"
        />
        <DonorProfilePhone
          :apiErrors="apiErrors"
          :setFieldValue="setFieldValue"
          :defaultCountry="defaultValues.country_code"
        />
        <!-- <DonorProfileCountry
          :apiErrors="apiErrors"
          :selectedCountry="selectedCountry"
          :countries="countries"
          :userData="userData"
        /> -->

        <DonorProfileSponsored :apiErrors="apiErrors" :values="values" />

        <!-- submit Btns -->
        <div class="buttons mt-4 flex gap-4">
          <v-spacer />
          <v-btn
            :ripple="false"
            type="submit"
            class="text-capitalize rounded-lg mt-2"
            variant="flat"
            size="large"
            color="primary"
            :loading="personalForm.loading"
            @click="validate"
          >
            {{ $t("donor.update_account") }}
          </v-btn>

          <!--
           <v-btn
            :ripple="false"
            class="text-capitalize rounded-lg mt-2"
            variant="text"
            size="large"
            color="primary"
          >
            {{ $t("donor.discard_changes") }}
          </v-btn>
           -->
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";

import { Form } from "vee-validate";
import { useAuth } from "~/modules/auth/services/auth";
import { useCountries } from "~/modules/auth/services/countries";
import { useProfile } from "~/modules/auth/services/profile";

const { t } = useI18n();

// data
const { user, setUser } = useAuth();
const { update } = useProfile();
const {
  data: { data: countries },
} = useCountries();
const personalForm = reactive({ loading: false });

const apiErrors = ref({});

const defaultValues = computed(() => {
  const payload = {
    ...user.value,
    country_id: user.value?.country?.id,
    // city_id: user.value.city?.id,

    // donate_flow: user.value?.donate_flow || "equal",
    // status: user.value?.status || "active",
    recurring_donation_status:
      user.value?.recurring_donation_status || "active",
  };

  delete payload.photo;

  return payload;
});

const userData = ref({ country_id: user.value?.country?.id });

// const cities = ref([]);
const cities = computed(() => {
  if (userData.value?.country_id)
    return countries.value?.find((i) => i.id == userData.value?.country_id)
      .cities;
  else return [];
});
const selectedCountry = computed(() => {
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
    .find((i) => i?.id == userData.value?.country_id);
});

// methods
const onSubmit = async (payload) => {
  try {
    personalForm.loading = true;

    const res = await update(payload, []);

    setUser(res.data.result.user);

    Swal.fire({
      icon: "success",
      title: t("dashboard.save"),
      confirmButtonText: t("home.ok"),
    });
  } catch (err) {
    apiErrors.value = err.response?.data?.result?.errors;
    console.error(err);
    Swal.fire({
      title: err.response?.data?.message || err.message,
      html: Object.values(err.response?.data?.result?.errors)
        .flat()
        .map((e) => `<li class="text-start">${e}</li>`)
        .join(" "),
      icon: "error",
      confirmButtonText: t("home.ok"),
    });
  } finally {
    personalForm.loading = false;
  }
};
</script>

<style scoped>
[role="alert"] {
  @apply text-sm text-red-500;
}
</style>
