<template>
  <Form
    @submit="onSubmit"
    class="space-y-6"
    v-slot="{ values, setFieldValue, errors }"
  >
    <div class="flex flex-col gap-6">
      <!-- Campaign Name -->
      <section class="my-6">
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.form.name.title") }}
        </h3>

        <div class="flex gap-4 max-md:flex-col">
          <InputsText
            class="flex-1"
            v-for="key in $i18n.availableLocales"
            :key="key"
            :name="`name:${key}`"
            v-model="data.name[key]"
            :placeholder="$t(`global_dashboard.form.name.${key}`)"
            rules="required"
            icon="mdi-help-network-outline"
          />
        </div>
      </section>

      <!-- Campaign short_desc -->
      <section class="my-6">
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.form.short_desc.title") }}
        </h3>

        <div class="flex gap-4 max-md:flex-col">
          <InputsTextarea
            class="flex-1"
            v-for="key in $i18n.availableLocales"
            :key="key"
            :name="`short_desc:${key}`"
            rules="required"
            v-model="data.short_desc[key]"
            :placeholder="$t(`global_dashboard.form.short_desc.${key}`)"
          />
        </div>
      </section>

      <!-- CampaignCampaign Content  -->
      <section class="my-6">
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.form.content.title") }}
        </h3>

        <client-only>
          <template #fallback>
            <v-skeleton-loader></v-skeleton-loader>
          </template>

          <v-tabs v-model="tab" class="mb-4" grow>
            <v-tab v-for="key in $i18n.availableLocales" :key="key">
              {{ errors[`content:${key}`] }}
              <v-badge
                color="red-accent-4"
                :model-value="!!errors[`content:${key}`]"
                floating
                dot
              >
                {{ $t(`global_dashboard.form.content.${key}`) }}
              </v-badge>
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item v-for="key in $i18n.availableLocales" :key="key">
              <InputsContentEditor
                :name="`content:${key}`"
                v-model="data.content[key]"
                rules="required"
                :placeholder="$t(`global_dashboard.form.content.${key}`)"
                :title="$t(`global_dashboard.form.content.${key}`)"
              />
            </v-window-item>
          </v-window>
        </client-only>
      </section>

      <!-- date -->
      <section class="my-6">
        <h2 class="text-xl font-semibold mb-4">
          {{ $t("global_dashboard.form.date.title") }}
        </h2>

        <div class="grid grid-cols-3 gap-4">
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.date.start_at") }}
            </h3>
            <InputsDate
              rules="required"
              name="start_at"
              format="yyyy-MM-dd HH:mm:ss"
              custom-class="w-fit"
              v-model="data.start_at"
            />
          </div>
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.date.end_at") }}
            </h3>
            <InputsDate
              rules="required"
              name="end_at"
              custom-class="w-fit"
              format="yyyy-MM-dd HH:mm:ss"
              v-model="data.end_at"
            />
          </div>

          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.date.total_days") }}
            </h3>

            <div class="text-lg px-2 py-2 text-slate-700">
              {{ getTotalDay(values.start_at, values.end_at, setFieldValue) }}
            </div>
          </div>
        </div>
      </section>

      <hr />

      <section class="my-6">
        <div class="grid md:grid-cols-2 gap-4">
          <!-- status -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.status.title") }}
            </h3>
            <InputsSelect
              name="status"
              custom-class="border !border-gray-200 shadow-none !rounded-2xl !p-2 !px-4 !my-0 text-xl"
              v-model="data.status"
              rules="required"
              :items="
                statuses.map((status) => ({
                  title: $t(`global_dashboard.form.status.${status}`),
                  value: status,
                }))
              "
            />
          </div>

          <!-- price_target -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.price_target") }}
            </h3>
            <InputsText
              v-model="data.price_target"
              name="price_target"
              :placeholder="$t('global_dashboard.form.price_target')"
              rules="required|englishNumbersOnly|min_value:1"
              inputmode="numeric"
            />
          </div>

          <!-- countries -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.country") }}
            </h3>
            <InputsSelect
              name="country_id"
              custom-class="border !border-gray-200 shadow-none !rounded-2xl !p-2 !px-4 !my-0 test-xl"
              rules="required"
              :fetch="useCountries"
              v-model="data.country_id"
              :map="
                (i) => ({
                  title: i.name,
                  value: i.id,
                })
              "
              :placeholder="$t('global_dashboard.form.country')"
            />
          </div>

          <!-- is_public -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.is_public") }}
            </h3>
            <InputsCheckbox
              name="is_public"
              :title="$t('global_dashboard.form.is_public')"
              v-model="data.is_public"
              rules="required"
            />
          </div>

          <!-- orphan_id -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.orphan") }}
            </h3>
            <InputsSelect
              name="orphan_id"
              custom-class="border !border-gray-200 shadow-none !rounded-2xl !p-2 !px-4 !my-0 text-xl"
              :fetch="useOrphans"
              v-model="data.orphan_id"
              :map="
                (i) => ({
                  value: i.id,
                  title: i.name,
                })
              "
              rules="required"
              :placeholder="$t('global_dashboard.form.orphan')"
            />
          </div>

          <!-- sort -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.status.sort") }}
            </h3>
            <InputsText
              name="sort"
              type="number"
              v-model="data.sort"
              rules="required|englishNumbersOnly"
              inputmode="numeric"
              placeholder="230"
            />
          </div>

          <!-- category_id -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.category") }}
            </h3>
            <InputsSelect
              name="category_id"
              custom-class="border !border-gray-200 shadow-none !rounded-2xl !p-2 !px-4 !my-0 text-xl"
              :fetch="useCategories"
              v-model="data.category_id"
              :map="
                (i) => ({
                  title: i.name,
                  value: i.id,
                })
              "
              rules="required"
              :placeholder="$t('global_dashboard.form.category')"
            />
          </div>

          <!-- video_url -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.video_url") }}
            </h3>
            <InputsText
              name="video_url"
              inputmode="url"
              v-model="data.video_url"
              type="url"
              rules="url"
              :placeholder="$t('global_dashboard.form.video_url')"
            />
          </div>

          <!-- image -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.image") }}
            </h3>
            <InputsFile
              name="image"
              rules=""
              accept="image/*"
              title="global_dashboard.form.image"
              v-model="data.image"
            />
          </div>

          <!-- video -->
          <div>
            <h3 class="font-bold opacity-60 mb-2 text-sm">
              {{ $t("global_dashboard.form.video") }}
            </h3>
            <InputsFile
              name="video"
              accept="video/*"
              v-model="data.video"
              title="global_dashboard.form.video"
            />
          </div>
        </div>
      </section>
      <!-- Submit Button -->
      <InputsSubmit :isLoading="isLoading" />
    </div>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";

import { useCountries } from "~/modules/auth/services/countries";
import { useOrphans } from "~/modules/dashboard/services/orphans/beneficiary";
import { useCategories } from "~/modules/dashboard/services/categories";

const props = defineProps({
  isLoading: { type: Boolean, default: false },
  defaultValues: { type: null, default: {} },
});

const tab = ref(null);
const data = reactive({
  name: {
    ar: "",
    en: "",
    ms: "",
  },
  short_desc: {
    ar: "",
    en: "",
    ms: "",
  },
  content: {
    ar: "<p></p>",
    en: "<p></p>",
    ms: "<p></p>",
  },

  start_at: "",
  end_at: "",
  total_days: 0,
  status: "",
  price_target: "",
  country_id: null,
  is_public: "no",
  orphan_id: null,
  sort: "",
  category_id: null,
  video_url: "",
  image: null,
  video: null,

  ...props.defaultValues,
});

const statuses = [
  "pending",
  "published",
  "paused",
  "ended",
  "completed",
  "cancelled",
  "rejected",
];

const emit = defineEmits(["submit"]);

function getTotalDay(startDate, endDate, setFieldValue) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    !(!startDate || !endDate) &&
    !isNaN(start.getTime()) &&
    !isNaN(end.getTime())
  ) {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    setFieldValue("total_days", diffDays);
    data.total_days = diffDays;
    return diffDays;
  } else {
    data.total_days = 0;
    setFieldValue("total_days", 0);
    return 0;
  }
}
const onSubmit = (a, b) => {
  emit("submit", a, b);
};
</script>
