<template>
  <div class="page-title-section">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
          <v-breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
interface Props {
  title: string;
  breadcrumbs?: Array<{
    title: string;
    to?: string;
    disabled?: boolean;
  }>;
}

defineProps<Props>();
</script>

<style scoped>
.page-title-section {
  background-color: #f5f5f5;
  padding: 2rem 0;
  margin-bottom: 2rem;
}
</style>