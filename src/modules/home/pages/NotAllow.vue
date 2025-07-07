<script setup lang="ts">
const showElements = ref(false);

onMounted(() => {
  setTimeout(() => {
    showElements.value = true;
  }, 100);
});

definePageMeta({
  layout: "empty",
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 text-center"
  >
    <div
      class="max-w-lg w-full bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:!p-12 shadow-xl transform transition-all duration-500"
      :class="
        showElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      "
    >
      <div
        class="text-5xl font-bold text-red-500 mb-4 transform transition-all duration-500 delay-100"
        :class="
          showElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        "
      >
        303
      </div>

      <h1
        class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-500 delay-200"
        :class="
          showElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        "
      >
        Access Denied
      </h1>

      <div
        class="w-24 h-24 mx-auto mb-8 transform transition-all duration-500 delay-300"
        :class="showElements ? 'opacity-100 scale-100' : 'opacity-0 scale-90'"
      >
        <div class="relative w-20 h-20 mx-auto">
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-12 bg-indigo-500 rounded-lg"
          ></div>
          <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 border-8 border-indigo-500 rounded-t-xl border-b-0"
          ></div>
        </div>
      </div>

      <p
        class="text-lg text-gray-600 mb-8 transform transition-all duration-500 delay-400"
        :class="
          showElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        "
      >
        You don't have permission to access this resource. Please contact your
        administrator if you believe this is an error.
      </p>
      <dev-only>
        <nuxt-link to="/">home</nuxt-link>
      </dev-only>
    </div>
  </div>
</template>
