<template>
  <div class="card-gradient p-6 rounded-xl border-0 shadow bg-neutral-50">
    <div class="flex items-start gap-4 mb-4">
      <div class="relative">
        <img
          :src="orphan.image || '/R.jpg'"
          :alt="orphan.name"
          class="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300 bg-white"
        />
        <div
          class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"
        ></div>
      </div>

      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900 mb-1">
          {{ orphan.name }}
        </h3>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <v-icon icon="mdi-calendar" class="w-4 h-4" />
          <span>
            <NuxtTime
              :datetime="orphan.birth_date"
              day="2-digit"
              month="2-digit"
              year="numeric"
              :locale="locale"
            />
          </span>
        </div>
      </div>

      <button
        @click.prevent.stop="
          alertDeleteQuestion({
            theme: 'bulma',
            imageUrl: orphan.image,
            title: [$t('donor.remove'), orphan.name].join(' '),
            text: $t('donor.delete_question'),
            imageHeight: '120px',
            showCancelButton: true,
            cancelButtonText: $t('donor.cancel'),
            confirmButtonText: $t('donor.remove'),

            customClass: {
              confirmButton:
                'text-red-400 !bg-red-50 hover:!bg-red-100 border !border-transparent ',
              cancelButton:
                '!bg-transparent hover:border hover:!bg-neutral-100 ',
              backdrop: 'bg-[#1113]',
              popup: 'bg-neutral-100 pb-3 p-3',
              actions: 'bg-white flex gap-2 w-full py-2 rounded-lg',
            },

            preConfirm: async () => {
              Swal.showLoading();
              emit('remove');
              Swal.hideLoading();
            },
          })
        "
      >
        <v-icon
          icon="mdi-close"
          class="w-6 h-6 text-red-400 hover:bg-rose-100 p-4 rounded-full transition-colors duration-300"
        />
      </button>
      <nuxt-link
        :to="{
          name: 'orphans-edit',
          params: { id: orphan.id },
        }"
      >
        <v-icon
          icon="mdi-lead-pencil"
          class="w-6 h-6 text-slate-400 hover:bg-slate-100 p-4 rounded-full transition-colors duration-300"
        />
      </nuxt-link>
    </div>

    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        <span
          :class="[
            'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
            orphan.home_status === 'yes'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800',
          ]"
        >
          <v-icon icon="md-home-alert-outline" class="w-3 h-3" />
          {{
            orphan.home_status === "yes"
              ? $t("global_dashboard.orphan.home_status.has_home")
              : $t("global_dashboard.orphan.home_status.no_home")
          }}
        </span>

        <span
          :class="[
            'inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
            orphan.refugee === 'yes'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800',
          ]"
        >
          <v-icon icon="mdi-accounts" class="w-3 h-3" />
          {{
            orphan.refugee === "yes"
              ? $t("global_dashboard.orphan.refugee.is_refugee")
              : $t("global_dashboard.orphan.refugee.not_refugee")
          }}
        </span>

        <span
          class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
        >
          <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
          {{
            orphan.gender === "male"
              ? $t("global_dashboard.orphan.gender.male")
              : $t("global_dashboard.orphan.gender.female")
          }}
        </span>
      </div>

      <div
        class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm">
            <span class="font-medium text-gray-600"
              >{{ $t("global_dashboard.orphan.birth_date") }}:</span
            >
            <div class="text-gray-800 mt-1">
              <NuxtTime
                :datetime="orphan.birth_date"
                day="numeric"
                month="long"
                year="numeric"
                :locale="locale"
              />
            </div>
          </div>
          <div
            class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {{ calculatedAge }}
            {{ $t("global_dashboard.orphan.years") }}
          </div>
        </div>
      </div>

      <div class="flex gap-2">
        <nuxt-link
          :to="{
            name: 'orphans-show',
            params: { id: orphan.id },
          }"
          class="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:!bg-purple-100 transition-all duration-300 text-sm font-medium"
        >
          {{ $t("global_dashboard.orphan.view_profile") }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
import Swal from "sweetalert2";

const props = defineProps({
  orphan: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["remove"]);

const alertDeleteQuestion = (options: any = {}) => {
  Swal.fire({
    ...options,
  }).then(options.cb);
};

const calculatedAge = computed(() => {
  const today = new Date();
  const birth = new Date(props.orphan.birth_date);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return Math.max(0, age);
});
</script>
