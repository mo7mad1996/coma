<template>
  <section
    aria-label="account settings section"
    class="grid grid-cols-12 gap-10"
  >
    <div class="md:col-span-7 col-span-12">
      <DonorProfile />
    </div>

    <div class="md:col-span-5 col-span-12">
      <DonorPrivacy />
    </div>
  </section>
</template>

<script setup>
const onSubmit = () => {};
const tab = ref(null);
</script>
