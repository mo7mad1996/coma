<template>
  <div>
    <slot name="header" v-bind="data || {}" />
    <div class="bg-white rounded-sm md:!rounded-3xl p-2 md:p-5">
      <slot v-if="status == 'success'" v-bind="data" />
      <slot name="loader" v-bind="{ status }" />
      <div v-if="!$slots.loader && status == 'pending'" class="loader" />

      <GlobalNoData :status="status" :data="hasMeta ? data.data : data || []" />
      <GlobalError :status="status" :error="error" :refresh="refresh" />
    </div>
    <slot name="outside" v-bind="data || {}" />
  </div>
</template>

<script setup>
const props = defineProps(["fetch"]);

const { data, status, error, refresh } = props.fetch || {
  data: { value: "" },
  status: "success",
  error: null,
  refresh: () => {},
};

onBeforeMount(() => {
  if (status.value == "error") refresh();
});

// const status
const hasMeta = computed(() => {
  return data.value && typeof data.value === "object" && "meta" in data.value;
});
</script>
