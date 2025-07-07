<template>
  <div class="flex gap-2 items-center mt-6 font-bold">
    <span>{{ $t("global.settings_of_the_sponsored") }}</span>
  </div>

  <div class="flex gap-4">
    <!-- donate_flow input -->
    <!-- <div class="flex-1">
      <label for="donate_flow" class="text-sm text-slate-400 my-3 block">
        {{ $t("global.select_donate_flow") }}
      </label>

      <div class="relative">
        <Field name="donate_flow" v-slot="{ field }">
          <GlobalRadioInputs
            v-model="values.donate_flow"
            v-bind="field"
            name="donate_flow"
            :data="[
              { title: $t('global.equal'), value: 'equal' },
              { title: $t('global.by_admin'), value: 'by_admin' },
            ]"
          />
        </Field>
      </div>

      <ErrorMessage class="text-red-500 text-sm" name="donate_flow" as="span" />
    </div> -->

    <!-- Status input -->
    <div class="flex-1">
      <label for="status" class="text-sm text-slate-400 my-3 block">
        {{ $t("global.status") }}
      </label>
      <div class="relative">
        <Field name="recurring_donation_status" v-slot="{ field }">
          <GlobalRadioInputs
            v-model="values.recurring_donation_status"
            v-bind="field"
            :data="[
              { title: $t('global.active'), value: 'active' },
              { title: $t('global.inactive'), value: 'inactive' },
            ]"
          />
        </Field>
      </div>

      <ErrorMessage class="text-red-500 text-sm" name="status" as="span" />
    </div>

    <div class="flex-1"></div>
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from "vee-validate";

const props = defineProps(["apiErrors", "values"]);
</script>
