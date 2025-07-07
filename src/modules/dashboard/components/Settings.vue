<template>
  <Form :initial-values="defaultValues" @submit="submit" v-slot="{ values }">
    <h3 class="font-bold opacity-60 mb-2 text-sm">
      {{ $t("global_dashboard.logo") }}
    </h3>
    <div class="flex flex-col gap-6">
      <!-- images -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardSettingsFormImage
          class="md:col-start-2"
          name="logo"
          :title="$t('global_dashboard.settings_form.logo')"
        />
        <DashboardSettingsFormImage
          name="icon"
          :title="$t('global_dashboard.settings_form.icon')"
        />
      </div>

      <!-- data -->

      <section class="gap-2 flex flex-col">
        <div>
          <h3 class="font-bold opacity-60 mb-2 text-sm">
            {{ $t("global.phone") }}
          </h3>
          <InputsPhone
            rules="required"
            :placeholder="$t('global.phone')"
            name="phone"
          />
        </div>

        <div>
          <h3 class="font-bold opacity-60 mb-2 text-sm">
            {{ $t("global.email") }}
          </h3>

          <InputsEmail
            rules="required|email"
            :placeholder="$t('global.email')"
            name="email"
          />
        </div>

        <div>
          <h3 class="font-bold opacity-60 mb-2 text-sm">
            {{ $t("global_dashboard.settings_form.keywords") }}
          </h3>

          <InputsText
            rules="required"
            :placeholder="$t('global_dashboard.settings_form.keywords')"
            name="keywords"
            icon="mdi-star-outline"
          />
        </div>
      </section>

      <div>
        <h3 class="font-bold opacity-60 mb-2 text-sm">
          {{ $t("global_dashboard.settings_form.site_name.title") }}
        </h3>

        <div class="flex gap-4 max-md:flex-col">
          <div v-for="lang in localeCodes" :key="lang" class="flex-1">
            <InputsText
              rules="required"
              :name="`${lang}.site_name`"
              :placeholder="
                $t(`global_dashboard.settings_form.site_name.${lang}`)
              "
            />
          </div>
        </div>
      </div>
      <!-- icon="mdi-star-outline" -->

      <div>
        <h3 class="font-bold my-3 text-gray-500">
          {{ $t("global_dashboard.settings_form.description.title") }}
        </h3>

        <div class="flex gap-4 max-md:flex-col">
          <InputsTextarea
            v-for="lang in localeCodes"
            :key="lang"
            :name="`${lang}.description`"
            :placeholder="
              $t(`global_dashboard.settings_form.description.${lang}`)
            "
            class="flex-1"
            rules="required"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardSettingsFormColor
          name="header_background_color"
          :title="$t('global_dashboard.settings_form.header_background_color')"
        />
        <DashboardSettingsFormColor
          name="header_text_color"
          :title="$t('global_dashboard.settings_form.header_text_color')"
        />
        <DashboardSettingsFormColor
          name="footer_background_color"
          :title="$t('global_dashboard.settings_form.footer_background_color')"
        />
        <DashboardSettingsFormColor
          name="footer_text_color"
          :title="$t('global_dashboard.settings_form.footer_text_color')"
        />
      </div>
      <DashboardSettingsFormCheck
        class="mt-3"
        name="maintenance_mode"
        :title="$t('global_dashboard.settings_form.maintenance_mode')"
      />
      <InputsSubmit :isLoading="isLoading" />
    </div>
  </Form>
</template>

<script setup>
import { Form } from "vee-validate";

const { localeCodes } = useI18n();

const props = defineProps(["data", "isLoading"]);

const defaultValues = computed(() => {
  const obj = props.data ? { ...props.data } : {};
  JSON.parse(JSON.stringify(obj.translations)).forEach((i) => {
    obj[i.locale] = i;
  });

  return obj;
});

const emit = defineEmits(["submit"]);
const submit = (a, b) => emit("submit", a, b);
</script>
