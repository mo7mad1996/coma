<template>
  <div class="layout-buttons">
    <!-- Quick action buttons -->
    <v-btn
      fab
      fixed
      bottom
      right
      color="primary"
      class="mb-4 mr-4"
      @click="scrollToTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>