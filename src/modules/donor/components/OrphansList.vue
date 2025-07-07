<template>
  <div class="xl:grid xl:grid-cols-1 gap-sm max-xl:flex max-xl:flex-col">
    <div class="md:col-span-1 col-span-3 bg-white md:rounded-3xl p-sm">
      <div class="flex justify-between items-start">
        <h1 class="mb-sm text-xl font-bold">
          {{ $t("donor.sponsored_individuals") }}
        </h1>
      </div>
      <div class="loader my-4" v-if="campaignStatus == 'pending'"></div>

      <template v-if="campaignStatus == 'success' && list.length">
        <ul class="p-0 h-fit flex flex-col gap-2">
          <DonorCampaignsItem
            v-for="(item, n) in list"
            :key="item.id"
            :item="item"
            :data="data"
            :campaigns="campaigns"
            @remove="remove"
          />
          <!-- @remove="campaigns.splice(n, 1)" -->
        </ul>

        <button
          class="bg-indigo-500 text-white py-3 px-2 lg:!px-3 rounded hover:bg-indigo-600 my-4 flex w-full justify-center"
          @click.prevent.stop="openDialog"
        >
          {{ $t("donor.pay") }}
          (
          {{ data.carts.data.reduce((a, b) => +b.amount + a, 0) }}
          {{ selectedCurrencyLabel }}
          )
        </button>
      </template>

      <div><GlobalNoData :data="list" :status="campaignStatus" /></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "campaignStatus",
  "campaigns",
  "data",
  "selectedCurrencyLabel",
  "openDialog",
]);

const list = ref(props.campaigns);

const emit = defineEmits(["remove"]);

const remove = (item) => {
  list.value = list.value.filter((i) => i.id != item.id);
};

watch(
  () => props.campaignStatus,
  () => {
    list.value = props.campaigns;
  }
);
</script>
