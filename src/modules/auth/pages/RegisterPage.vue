<template>
  <section aria-label="page" class="page">
    <GlobalContainer>
      <div class="py-12 flex justify-center">
        <div class="mx-auto bg-white rounded-xl p-4">
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="">
              <h1
                class="text-xl flex gap-2 items-center justify-center font-bold"
              >
                {{ $t("auth.register_as") }}
              </h1>

              <div class="relative">
                <div class="p-8 rounded-xl flex gap-4">
                  <label
                    v-for="t in tabs"
                    :key="t.value"
                    class="item text-center"
                    :for="t.value"
                  >
                    <img
                      loading="lazy"
                      :src="t.img"
                      :alt="t.value"
                      class="mx-auto py-2"
                    />
                    <div>
                      {{ $t(t.title) }}
                    </div>
                    <input
                      v-model="active"
                      type="radio"
                      name="tab"
                      :value="t.value"
                      :id="t.value"
                    />
                  </label>
                </div>
                <!-- submit Btns -->
                <v-btn
                  :ripple="false"
                  :disabled="!active"
                  class="text-capitalize rounded-lg w-100 mt-2"
                  variant="flat"
                  size="large"
                  color="primary"
                  @click="tab = active"
                >
                  <span>
                    {{ $t("auth.continue") }}
                  </span>

                  <v-icon v-if="locale == 'ar'" icon="mdi-arrow-left-thin" />
                  <v-icon v-if="locale == 'en'" icon="mdi-arrow-right-thin" />
                </v-btn>
              </div>
            </v-tabs-window-item>
            <v-tabs-window-item value="volunteer">
              <AuthVolunteerForm />
            </v-tabs-window-item>
            <v-tabs-window-item value="marketer">
              <AuthMarketerForm />
            </v-tabs-window-item>
          </v-tabs-window>
        </div>
      </div>
    </GlobalContainer>
  </section>
</template>

<script setup>
import { useGlobalVar } from "~/helpers/global-var";

// assets
import marketer from "~/assets/images/auth/marketer.svg";
import volunteer from "~/assets/images/auth/volunteer.svg";

const { locale } = useI18n();

const active = ref(null);
const tab = ref("");
const tabs = [
  { value: "marketer", title: "auth.marketer", img: marketer },

  { value: "volunteer", title: "auth.volunteer", img: volunteer },
];

definePageMeta({
  middleware: "guest",
});

const { siteName } = useGlobalVar();
siteName("auth.page_title_register_donor");
</script>

<style lang="scss" scoped>
.page {
  background: #f6f7f8;
  min-height: 50dvh;
}

.item {
  @apply rounded-xl grid place-content-center px-12 py-6 text-black transition-all border border-blue-400 cursor-pointer;

  &:hover {
  }

  &:has(input:checked) {
    @apply bg-blue-400 shadow-md;
  }

  input {
    @apply hidden;
  }
}
</style>
