<template>
  <div class="flex justify-center items-center space-x-2 mt-4">
    <button
      class="pagination-btn"
      :disabled="currentPage === 1"
      @click="$emit('page-change', currentPage - 1)"
    >
      <v-icon icon="mdi-chevron-left" class="h-6 w-6 font-bold" />
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      class="pagination-btn"
      :class="{ active: page === currentPage }"
      @click="$emit('page-change', page)"
    ></button>

    <button
      class="pagination-btn text-sky-500"
      :disabled="currentPage === totalPages"
      @click="$emit('page-change', currentPage + 1)"
    >
      <v-icon
        icon="mdi-chevron-right"
        class="w-6 h-6 text-blue-500 font-extrabold"
      />
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  totalPages: Number,
  currentPage: Number,
});
</script>

<style scoped>
.pagination-btn {
  background: #f3f4f6;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.pagination-btn:hover {
  background: #007bff;
  color: white;
}

.pagination-btn:disabled {
  background: #e0e0e0;
  cursor: not-allowed;
}

.active {
  background: #007bff;
  color: white;
  font-weight: bold;
}
</style>
