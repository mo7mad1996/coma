<template>
  <ClientOnly>
    <div
      class="my-6 bg-zinc-50 py-2 px-2 md:!px-5 max-md:text-sm rounded-xl flex justify-between items-center rtl:flex-row-reverse flex-wrap gap-2 overflow-hidden"
    >
      <!-- per page -->
      <div class="flex items-center gap-2 px-2">
        <span>
          {{ $t("global.view") }}
        </span>

        <v-menu>
          <template v-slot:activator="{ props, isActive }">
            <div
              v-bind="props"
              class="bg-violet-100 py-2 px-3 rounded-lg flex gap-2 items-center"
            >
              <v-icon
                icon="mdi-chevron-down"
                :class="{ '-scale-100': isActive }"
              />
              <span>{{ per_page_value }}</span>
            </div>
          </template>

          <ul class="bg-white p-1 rounded-sm shadow">
            <li
              v-for="i in 5"
              :key="i"
              @click="per_page_value = i * 3"
              class="rounded-sm px-2 py-1 cursor-pointer hover:bg-violet-50"
              :class="{ 'bg-violet-100': per_page_value == i * 3 }"
            >
              {{ i * 3 }}
            </li>
          </ul>
        </v-menu>
      </div>

      <!-- page -->
      <v-pagination
        :length="length"
        v-model="modelValue"
        :total-visible="
          $vuetify.display.mdAndUp ? totalVisible : Math.min(3, totalVisible)
        "
      />
    </div>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  totalVisible: {
    type: Number,
    default: 6,
  },
  length: {
    type: Number,
    default: 2,
  },
  per_page: {
    type: Number,
    default: 15,
  },
});

const emit = defineEmits(["pageChange", "per_pageChange"]);

const modelValue = defineModel();

const per_page_value = ref(props.per_page);

watch(modelValue, (v) => emit("pageChange", v));
watch(per_page_value, (v) => emit("per_pageChange", v));
</script>
