<script setup>
const props = defineProps(["donationData", "donationType"]);
</script>

<template>
  <!-- Donation Type -->
  <div class="donation_type mt-8">
    <h5 class="font-semibold text-md">
      {{ $t("global.donation_type") }}
    </h5>

    <GlobalRadioInputs
      name="donationType"
      v-model="donationData.frequency"
      :data="[
        { value: 'yearly', title: $t('global.yearly') },
        { value: 'monthly', title: $t('global.monthly') },
        { value: 'weekly', title: $t('global.weekly') },
        { value: 'daily', title: $t('global.daily') },
        { value: 'one_time', title: $t('global.onetime') },
      ]"
    />

    <!-- 
    <v-tabs
      v-model="donationType"
      fixed-tabs
      color="#9333ea"
      align-tabs="start"
    >
      <v-tab value="monthly" disabled>{{ $t("global.monthly") }}</v-tab>
      <v-tab value="weekly" disabled>{{ $t("global.weekly") }}</v-tab>
      <v-tab value="dialy" disabled>{{ $t("global.dialy") }}</v-tab>
      <v-tab value="onetime">{{ $t("global.onetime") }}</v-tab>
    </v-tabs>

    <v-radio-group
      v-if="false"
      v-model="donationType"
      id="radio-group-9-messages"
      class="mt-2 checkbox"
      inline
    >
      <v-radio
        value="monthly"
        disabled
        id="input-12"
        name="radio-group-9"
        color="primary"
        class="me-[2rem]"
        :ripple="false"
      >
        <template v-slot:label>
          <label for="input-12">{{ $t("global.monthly") }}</label>
        </template>
      </v-radio>

      <v-radio
        value="weekly"
        disabled
        name="radio-group-10"
        id="input-13"
        color="primary"
        :ripple="false"
        class="me-[2rem]"
      >
        <template v-slot:label>
          <label for="input-13">{{ $t("global.weekly") }}</label>
        </template>
      </v-radio>

      <v-radio
        value="dialy"
        disabled
        name="radio-group-11"
        id="input-14"
        color="primary"
        :ripple="false"
        class="me-[2rem]"
      >
        <template v-slot:label>
          <label for="input-14">{{ $t("global.dialy") }}</label>
        </template>
      </v-radio>

      <v-radio
        value="onetime"
        color="primary"
        name="radio-group-12"
        id="input-15"
        :ripple="false"
      >
        <template v-slot:label>
          <label for="input-15">{{ $t("global.onetime") }}</label>
        </template>
      </v-radio>
    </v-radio-group> 
    -->
  </div>
</template>
