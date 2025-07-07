<template>
  <v-locale-provider :rtl="locale == 'ar'">
    <v-app height="100">
      <LayoutHeader />

      <v-main>
        <LayoutCart />
        <slot />
      </v-main>

      <LayoutFooter />

      <LayoutButtons />
    </v-app>
  </v-locale-provider>
</template>

<script setup>
const { locale } = useI18n();
</script>
