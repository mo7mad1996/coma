<script setup>
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "../../store/currancy";

const currencyStore = useCurrencyStore();
const props = defineProps(["donationData"]);

const { selectedCurrencyLabel } = storeToRefs(currencyStore);
</script>
<template>
  <!-- confirm donation -->
  <table class="w-full text-sm text-gray-700 border-t">
    <tbody>
      <!-- <tr>
        <td class="px-6 py-4 text-start">
          {{ $t("global.donation_amount") }}
        </td>
        <td class="px-6 py-4 text-end">
          {{ selectedCurrencyLabel }}
          {{ (+donationData.amount).toFixed(2) }}
        </td>
      </tr>
      <tr v-if="donationData.love_name?.length">
        <td class="px-6 py-4 text-start flex items-center">
          {{ $t("global.you_love") }}
          ( {{ donationData.love_name?.length }} <v-icon icon="mdi-account" /> )
        </td>
        <td class="px-6 py-4 text-end">
          {{ selectedCurrencyLabel }}
          {{
            donationData.love_custom_amount
              .reduce((a, b) => a + b, 0)
              .toFixed(2)
          }}
        </td>
      </tr>
      <tr v-if="donationData.frequency == 'yearly'">
        <td class="px-6 py-4 text-start flex items-center">
          {{ $t("global.yearly") }}
        </td>
        <td class="px-6 py-4 text-end">(* 12) {{ $t("global.month") }}</td>
      </tr>
      <tr class="border-b">
        <td class="px-6 py-4 text-start">
          {{ $t("campaigns.orphan_services") }}
        </td>
        <td class="px-6 py-4 text-end">
          {{ selectedCurrencyLabel }}
          {{ donationData.charity_amount }}
        </td>
      </tr> -->
      <tr>
        <td class="px-6 py-4 text-start">
          {{ $t("campaigns.total") }}
        </td>
        <td class="px-6 py-4 text-end">
          {{ selectedCurrencyLabel }}
          {{
            (
              +donationData.charity_amount +
              (+donationData.amount +
                donationData.love_custom_amount.reduce((a, b) => a + b, 0)) *
                (donationData.frequency === "yearly" ? 12 : 1)
            ).toFixed(2)
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
