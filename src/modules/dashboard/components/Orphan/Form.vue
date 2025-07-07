<template>
  <Form
    @submit="onSubmit"
    class="space-y-6"
    v-slot="{ values, setFieldValue, errors }"
  >
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Orphan Name -->
      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.orphan_form.name") }}
        </h3>

        <InputsText
          class="flex-1"
          name="name"
          v-model="data.name"
          :placeholder="$t(`global_dashboard.orphan_form.name`)"
          rules="required"
          icon="mdi-help-network-outline"
        />
      </div>

      <!--  gender -->
      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.orphan_form.gender") }}
        </h3>
        <InputsSelect
          name="gender"
          custom-class="border !border-gray-200 shadow-none !rounded-2xl !p-2 !px-4 !my-0 text-xl"
          v-model="data.gender"
          :items="
            ['male', 'female'].map((status) => ({
              title: $t(`home.filter.${status}`),
              value: status,
            }))
          "
          rules="required"
        />
      </div>

      <!-- home_status -->
      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.orphan_form.home_status") }}
        </h3>
        <InputsCheckbox
          name="home_status"
          :title="$t('global_dashboard.orphan_form.home_status')"
          v-model="data.home_status"
          rules=""
        />
      </div>

      <!-- refugee -->
      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.orphan_form.refugee") }}
        </h3>
        <InputsCheckbox
          name="refugee"
          :title="$t('global_dashboard.orphan_form.refugee')"
          v-model="data.refugee"
          rules=""
        />
      </div>

      <!-- countries -->
      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.orphan_form.country") }}
        </h3>
        <InputsSelect
          name="country_id"
          custom-class="border !border-gray-200 shadow-none !rounded-2xl !p-2 !px-4 !my-0 test-xl"
          rules=""
          v-model="data.country_id"
          :fetch="useCountries"
          :map="
            (i) => ({
              title: i.name,
              value: i.id,
            })
          "
          :placeholder="$t('global_dashboard.orphan_form.country')"
        />
      </div>

      <!-- video_url -->
      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.orphan_form.video_url") }}
        </h3>
        <InputsText
          name="video_url"
          inputmode="url"
          v-model="data.video_url"
          type="url"
          rules="url"
          :placeholder="$t('global_dashboard.orphan_form.video_url')"
        />
      </div>

      <!-- birth_date -->
      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.orphan_form.birth_date") }}
        </h3>
        <InputsDate
          rules="required"
          name="birth_date"
          custom-class="w-fit"
          v-model="data.birth_date"
          format="yyyy-MM-dd"
        />
      </div>

      <!-- image -->
      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.orphan_form.image") }}
        </h3>
        <InputsFile
          name="image"
          rules=""
          accept="image/*"
          title="global_dashboard.orphan_form.image"
          v-model="data.image"
        />
      </div>
    </div>

    <!-- Submit Button -->
    <InputsSubmit :isLoading="isLoading" />
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";

import { useCountries } from "~/modules/auth/services/countries";

const props = defineProps({
  isLoading: { type: Boolean, default: false },
  defaultValues: { type: null, default: {} },
});

const data = reactive({
  name: "",
  birth_date: "",
  gender: "",
  home_status: "no",
  refugee: "no",
  video_url: "",
  image: null,
  country_id: "",

  ...props.defaultValues,
});

const emit = defineEmits(["submit"]);

const onSubmit = (a, b) => {
  emit("submit", data, b);
};
</script>
