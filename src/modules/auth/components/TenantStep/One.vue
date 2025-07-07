<template>
  <h1 class="my-3 text-start">
    {{ $t("auth.are_you") }}
  </h1>

  <div class="my-3">
    <div class="relative">
      <Field
        name="tenant_type"
        v-slot="{ field, errors }"
        rules="required"
        :validateOnInput="true"
        id="tenant_type"
        :placeholder="$t('auth.tenant_type')"
      >
        <div class="flex flex-wrap justify-center my-3">
          <div
            class="w-1/2 md:w-1/4 p-1"
            v-for="t in tenant_types.filter((i: any) => i.value !== '')"
            :key="t.value"
          >
            <label
              class="border !border-gray-200 flex items-center gap-3 py-3 px-2 md:!px-5 cursor-pointer rounded-xl transition-all border-transparent hover:bg-gray-100 has-[:checked]:bg-indigo-50 has-[:checked]:!border-indigo-500 has-[:checked]:cursor-not-allowed max-md:text-sm h-full"
            >
              <!-- <v-icon :icon="t.icon" class="text-gray-600" /> -->
              <input
                type="radio"
                :value="t.value"
                v-bind="field"
                @change="field.onChange(t.value)"
                class="checkbox"
              />
              <span class="text-center one-line max-md:text-sm">{{
                $t(t.name)
              }}</span>
            </label>
          </div>
        </div>
        <!-- 
        <v-menu :close-on-content-click="true">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :error-messages="errors"
              class="block w-full py-3 px-3 outline-none text-gray-700 border border-gray-300 rounded-lg shadow-sm sm:text-sm"
            >
              <template v-slot:title>
                <div class="flex gap-1 items-center">
                  <span>
                    {{
                      $t(
                        tenant_types.find(
                          (i: any) => values?.tenant_type == i.value
                        )?.name
                      )
                    }}
                  </span>
                </div>
              </template>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item
              v-for="(tenant, index) in tenant_types"
              :key="index"
              @click="setFieldValue('tenant_type', tenant.value, true)"
            >
              <template v-slot:title>
                <div class="flex gap-1 items-center">
                  <span>
                    {{ $t(tenant.name) }}
                  </span>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
         -->
      </Field>
    </div>
    <ErrorMessage name="tenant_type" />
  </div>

  <!-- submit Btns -->
  <v-btn
    v-if="showBTN"
    :ripple="false"
    :disabled="!values.tenant_type"
    class="text-capitalize rounded-lg w-100 mt-2"
    variant="flat"
    size="large"
    color="primary"
    @click="window = 2"
  >
    <span>
      {{ $t("auth.continue") }}
    </span>

    <v-icon v-if="locale == 'ar'" icon="mdi-arrow-left-thin" />
    <v-icon v-if="locale == 'en'" icon="mdi-arrow-right-thin" />
  </v-btn>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from "vee-validate";
import { useAuth } from "../../services/auth";

const { user } = useAuth();
const props = defineProps([
  "tenant_types",
  "values",
  "setFieldValue",
  "showBTN",
]);

const window = defineModel();
const { locale } = useI18n();
</script>
