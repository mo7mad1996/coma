<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
      >
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const menuItems = [
  {
    title: 'dashboard.dashboard',
    to: '/dashboard/home',
    icon: 'mdi-view-dashboard'
  },
  {
    title: 'campaigns.campaigns',
    to: '/dashboard/campaigns',
    icon: 'mdi-bullhorn'
  },
  {
    title: 'dashboard.settings',
    to: '/dashboard/settings',
    icon: 'mdi-cog'
  }
];
</script>