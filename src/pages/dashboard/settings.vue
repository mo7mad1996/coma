<template>
  <div>
    <DashboardPageTitle :title="$t('dashboard.pages_title.settings')" />
    
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>{{ $t('dashboard.settings') }}</v-card-title>
            <v-card-text>
              <p>Settings page content will go here</p>
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
  title: 'Dashboard - Settings'
});
</script>