<template>
  <div>
    <v-menu :content-class="menuClass" attach>
      <template v-slot:activator="{ props, isActive }">
        <div
          v-bind="props"
          class="bg-white py-2 px-3 rounded-[14px] gap-2 items-center shadow flex my-4 relative"
          :class="customClass"
        >
          <slot name="icon" />
          <v-icon :icon="icon" v-if="icon" />
          <span class="flex-1">
            <span v-if="selected">
              {{ mappedList.find((i) => i.value == selected)?.title }}
            </span>
            <span v-else class="text-gray-400">
              {{ placeholder || $t("dashboard.select") }}
            </span>
          </span>
          <v-icon icon="mdi-chevron-down" :class="{ '-scale-100': isActive }" />
        </div>
      </template>

      <ul
        v-if="list.length"
        class="bg-white p-1 rounded-sm shadow max-h-80 h-80vh overflow-hidden relative blockScrollX"
        :class="menuClass"
        ref="container"
      >
        <li
          v-for="(i, n) in mappedList"
          :key="i.value"
          @click="
            selected = i.value;
            emit('update', list[n]);
          "
          class="cursor-pointer group pt-px"
        >
          <div
            class="group-hover:bg-violet-50 rounded-sm px-4 py-2"
            :class="{ '!bg-violet-100': i.value == selected }"
          >
            {{ i.title }}
          </div>
        </li>

        <li v-if="page <= meta.lastPage" v-observe-visibility="handelScroll">
          <div class="loader" v-if="status == 'pending'" />
        </li>
      </ul>

      <button
        v-else-if="error"
        class="flex gap-2 items-center rounded-md bg-rose-50 hover:bg-rose-100 shadow px-4 py-2 mx-auto my-4 text-gray-500 text-sm"
        @click.prevent.stop="refresh"
      >
        <v-icon icon="mdi-reload" />
        <span>
          {{ $t("global.reload") }}
        </span>
      </button>

      <GlobalNoData :status="status" :data="mappedList" />
    </v-menu>

    <ErrorMessage :name="name" />
  </div>
</template>

<script setup>
import { ErrorMessage, useField } from "vee-validate";

// props && emit
const emit = defineEmits(["update"]);
const props = defineProps({
  customClass: { type: String, default: "" },
  menuClass: { type: String, default: "" },
  items: { type: Array, default: [] },
  defaultValue: { type: null, default: undefined },
  name: { type: String, default: "" },
  rules: { type: String, default: "" },
  icon: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  fetch: {
    type: Function,
    required: false,
    default: () => {
      return {
        page: 1,
        ...useAsyncData("no-data", () => Promise.resole([])),
      };
    },
  },
  map: { type: Function, default: (i) => i },
});

// init
const { $initPerfectScrollbar } = useNuxtApp();

const { data, status, refresh, error, page } = props.fetch();

const select = useField(props.name, props.rules);
const container = ref(null);

// data
const meta = ref({ lastPage: 2 });
const storedItems = ref([]);
const list = computed(() => [...props.items, ...storedItems.value]);
const mappedList = computed(() => list.value.map(props.map));
const selected = defineModel();
if ("undefined" != typeof props.defaultValue)
  selected.value = props.defaultValue;

// methods
const handelScroll = (e) => {
  if (!e) return;
  if (!page.value) return;
  if (page.value >= meta.value.lastPage) return;
  if (status.value == "pending") return;

  page.value += 1;
};

// watch
watch(
  data,
  (v) => {
    const hasMeta = Object(v).hasOwnProperty("meta");
    if (hasMeta) {
      meta.value == v.meta;

      if (Array.isArray(v.data))
        storedItems.value = [...storedItems.value, ...v.data];
    } else {
      meta.value.lastPage = 1;
      if (Array.isArray(v)) storedItems.value = [...storedItems.value, ...v];
    }
  },
  { immediate: true, deep: true }
);

watch(
  selected,
  (v, oldValue) => {
    if (oldValue != v)
      if (typeof oldValue == typeof v || v) select.setValue(v, true);
  },
  { immediate: true }
);

watch(
  container,
  (v) => {
    if (v) {
      $initPerfectScrollbar(v);
    }
  },
  { immediate: true }
);
</script>
