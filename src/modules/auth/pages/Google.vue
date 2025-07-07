<template></template>

<script setup lang="ts">
import { useAuth } from "~/modules/auth/services/auth";
const { loginWithGoogle } = useAuth();

loginWithGoogle();
</script>
