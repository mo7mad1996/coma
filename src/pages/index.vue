<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="text-h3 mb-4">{{ $t('home.hero_title') }}</h1>
          <p class="text-h6 mb-6">{{ $t('home.hero_description') }}</p>
          
          <v-btn
            color="primary"
            size="large"
            :to="'/campaigns'"
          >
            {{ $t('home.view_all_campaigns') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});

useHead({
  title: 'Home - Orphan Community'
});
</script>