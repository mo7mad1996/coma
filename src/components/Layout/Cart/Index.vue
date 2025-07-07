<template>
  <v-navigation-drawer
    v-model="isOpen"
    temporary
    location="right"
    width="400"
  >
    <v-card>
      <v-card-title>
        {{ $t('cart') }}
      </v-card-title>
      <v-card-text>
        <!-- Cart content will go here -->
        <p>{{ $t('no_data') }}</p>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
const isOpen = ref(false);

// Cart logic
</script>