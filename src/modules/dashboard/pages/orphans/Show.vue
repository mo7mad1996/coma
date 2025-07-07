<template>
  <LazyDashboardLayoutContent :fetch="orphan">
    <template #header="data">
      <DashboardPageTitle
        :title="data.name"
        :subTitle="$t('global_dashboard.pages_title.orphans-show')"
        :buttons="buttons(data)"
      />
    </template>
    <template v-slot="data">
      <div
        class="rounded-3xl overflow-hidden bg-gradient-to-bb from-neutral-50 to-gray-300 shadow"
      >
        <div class="py-6 grid place-content-center bg-white">
          <img
            src="~/assets/images/logo.png"
            alt="orphans"
            class="h-24 object-contain"
          />
        </div>

        <div class="p-6 flex flex-col gap-6 bg-gray-50 shadow">
          <section
            class="flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl p-6"
          >
            <div class="relative">
              <img
                class="w-24 h-24 rounded-full object-cover shadow ring-2 ring-indigo-100"
                :src="data.image"
                :alt="data.name"
              />
            </div>

            <div class="text-center md:text-start">
              <h1 class="text-2xl font-bold text-gray-800">{{ data.name }}</h1>
              <p class="text-gray-500 text-sm mt-1">
                {{ $t("global_dashboard.orphan.age") }}: {{ data.age }}
              </p>
              <p class="text-xs text-gray-400 mt-1">
                <NuxtTime
                  :locale="locale"
                  :datetime="data.birth_date"
                  month="long"
                  day="2-digit"
                  year="numeric"
                />
              </p>
            </div>
          </section>

          <section class="grid md:grid-cols-2 gap-4">
            <div class="bg-white rounded-2xl p-5">
              <h4 class="text-sm font-semibold text-gray-400 mb-3">
                {{ $t("global_dashboard.pages_title.orphans-show") }}
              </h4>
              <div class="">
                <span
                  class="flex w-fit items-center gap-4 px-3 py-2 rounded-full text-sm my-3 font-medium"
                  :class="
                    data.gender === 'male'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-pink-50 text-pink-600'
                  "
                >
                  <span class="w-2 h-2 bg-pink-500 rounded-full"></span>
                  {{ $t(`global_dashboard.orphan.gender.${data.gender}`) }}
                </span>

                <span
                  class="flex w-fit items-center gap-4 px-3 py-2 rounded-full text-sm my-3 font-medium"
                  :class="
                    data.home_status === 'yes'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-600'
                  "
                >
                  <v-icon icon="mdi-home" class="w-3.5 h-3.5" />
                  {{
                    $t(
                      data.home_status === "yes"
                        ? "global_dashboard.orphan.home_status.has_home"
                        : "global_dashboard.orphan.home_status.no_home"
                    )
                  }}
                </span>

                <span
                  :class="[
                    'flex w-fit items-center gap-4 px-3 py-2 rounded-full text-sm my-3 font-medium',
                    data.refugee === 'yes'
                      ? 'bg-gray-50 text-gray-500'
                      : 'bg-sky-50 text-sky-600',
                  ]"
                >
                  <v-icon icon="mdi-account" class="w-3.5 h-3.5" />
                  {{
                    $t(
                      data.refugee === "yes"
                        ? "global_dashboard.orphan.refugee.is_refugee"
                        : "global_dashboard.orphan.refugee.not_refugee"
                    )
                  }}
                </span>
              </div>
            </div>

            <div class="bg-white rounded-2xl p-5">
              <h4 class="text-sm font-semibold text-gray-400 mb-3">
                {{ $t("global_dashboard.form.video") }}
              </h4>

              <LazyYoutube v-if="data.video_url" :src="data.video_url" />

              <div
                v-else
                class="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl py-10 px-6 text-center"
              >
                <div class="bg-gray-100 text-indigo-400 p-4 rounded-full">
                  <svg
                    class="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25M8.25 9V5.25m-2.25 12A2.25 2.25 0 004.5 15V9a2.25 2.25 0 012.25-2.25h10.5A2.25 2.25 0 0119.5 9v6a2.25 2.25 0 01-2.25 2.25H6z"
                    />
                  </svg>
                </div>
                <h3 class="text-base font-semibold text-gray-600 mt-4">
                  {{ $t("global_dashboard.form.no_video_available") }}
                </h3>
              </div>
            </div>
          </section>
        </div>
      </div>
    </template>
  </LazyDashboardLayoutContent>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { $alertDeleteQuestion }: any = useNuxtApp();

import { useGlobalVar } from "~/helpers/global-var";

import { useCRUD } from "~/modules/dashboard/services/orphans/beneficiary";

const router = useRouter();
const { locale } = useI18n();
const { siteName } = useGlobalVar();
const { show, remove } = useCRUD();
const orphan = show();

siteName("global_dashboard.pages_title.orphans-show");

const buttons: (data: any) => any[] = (data) => [
  {
    to: {
      name: "orphans-edit",
      params: { id: data.id },
    },
    icon: "mdi-note-edit-outline",
    text: t("global_dashboard.pages_title.orphans-edit"),
  },
  {
    text: t("global_dashboard.pages_title.orphans-delete"),
    icon: "mdi-file-document-remove-outline",
    async action() {
      await $alertDeleteQuestion({
        imageUrl: data.image,
        title: [t("donor.remove"), data.name].join(" "),
        preConfirm: () =>
          remove(data.id).then(() => {
            router.push({ name: "orphans" });
          }),
      });
    },
  },
];
</script>
