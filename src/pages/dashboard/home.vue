<template>
  <div>
    <DashboardPageTitle :title="$t('dashboard.pages_title.home')" />
    
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>{{ $t('dashboard.dashboard') }}</v-card-title>
            <v-card-text>
              <p>{{ $t('dashboard.welcome') }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'require-auth'
});

useHead({
  title: 'Dashboard - Home'
});
</script>