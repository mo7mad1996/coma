<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ $t('global.site_name') }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Add header content here -->
  </v-app-bar>
</template>

<script setup>
const emit = defineEmits(['toggle-drawer']);

const toggleDrawer = () => {
  emit('toggle-drawer');
};
</script>