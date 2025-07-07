<template>
  <NuxtLoadingIndicator color="#975efe" errorColor="#ff3131" />
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <NuxtPage :key="$route.fullPath" />
  </NuxtLayout>
</template>
