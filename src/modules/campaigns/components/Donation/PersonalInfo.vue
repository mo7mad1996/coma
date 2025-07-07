<script setup>
import { ErrorMessage, Field } from "vee-validate";
// @ts-ignore
// import { VueTelInput } from "vue-tel-input";
import * as pkg from "vue-tel-input";
const { VueTelInput } = pkg;

const props = defineProps(["donationData", "setFieldValue"]);
const isHidden = ref("no");

watch(isHidden, (v) => props.setFieldValue("hide_name", v));
</script>
<template>
  <!-- personal info -->
  <div class="personal-info">
    <!-- <div class="flex gap-x-2 items-center">
      <img 
        loading="lazy"
        src="~/assets/images/campaign/personal-info.svg"
        width="14"
        alt="orphanssociety image"
      />
      <h1 class="font-semibold text-md">
      {{$t('global.name')
        }}
      </h1>
    </div> -->
    <!-- name -->

    <!-- 
    <h1 class="font-semibold text-md -mb-2 mt-4 text-start">
      {{ $t("global.name") }}
    </h1> -->
    <InputsText
      class="my-3"
      icon="mdi-account-outline"
      name="name"
      rules="required"
      v-model="donationData.name"
      :placeholder="$t('global.name')"
    />

    <!-- name hidden checkbox -->
    <!-- <v-checkbox
      v-model="isHidden"
      class="checkbox"
      color="primary"
      id="checkbox-16"
      :ripple="false"
      true-value="yes"
      false-value="no"
    >
      <template v-slot:label>
        <label for="checkbox-16" class="text-sm text-zinc-500">
          {{ $t("global.name_hidden") }}
        </label>
      </template>
    </v-checkbox> -->

    <!-- email -->
    <!-- <h1 class="font-semibold text-md -mb-4 mt-4 text-start">
      {{ $t("global.email") }}
    </h1> -->
    <InputsEmail
      class="my-3"
      name="email"
      rules="required|email"
      v-model="donationData.email"
      :placeholder="$t('global.email')"
    />

    <!-- phone -->
    <InputsPhone
      name="mobile"
      class="my-3"
      v-model="donationData.mobile"
      rules="required_phone"
      :placeholder="$t('global.phone')"
    />

    <div class="mt-3">
      <!-- <h1 class="font-semibold text-md mb-3 text-start">
        {{ $t("global.comment") }}
      </h1> -->
      <div class="relative">
        <Field name="comment" role="required">
          <textarea
            id="comment"
            :placeholder="$t('global.comment')"
            class="block w-full py-3 px-5 outline-none text-gray-700 border border-gray-300 rounded-2xl shadow-sm sm:text-sm"
            @change="setFieldValue('comment', donationData.comment)"
            v-model="donationData.comment"
            rows="3"
          ></textarea>
        </Field>
      </div>

      <ErrorMessage name="comment" class="text-sm text-red-500 mt-2" />
    </div>
  </div>
</template>
