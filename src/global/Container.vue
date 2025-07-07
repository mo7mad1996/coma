<template>
  <v-container :class="containerClass">
    <slot />
  </v-container>
</template>

<script setup>
interface Props {
  fluid?: boolean;
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fluid: false,
  maxWidth: 'lg'
});

const containerClass = computed(() => ({
  'container-fluid': props.fluid,
  [`max-width-${props.maxWidth}`]: !props.fluid
}));
</script>