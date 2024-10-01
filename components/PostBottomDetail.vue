<template>
  <div class="mt-3 sm:flex sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-40">
    <div class="text-sm text-gray-500">
      Page <span class="font-medium text-gray-700">1 of 1</span>
    </div>

    <div class="flex items-center gap-x-3">
      <button
          @click="clearResults"
          class="flex items-center justify-center w-full px-5 py-2 text-sm text-red-700 transition-colors duration-200 bg-red-200 border rounded-lg gap-x-2 sm:w-auto hover:bg-red-100">
        <i class="fa-solid fa-trash"></i>
        <span>Delete all results</span>
      </button>
    </div>
  </div>
</template>

<script setup>

import {useDashboardStore} from "~/stores/dashboard.js";

const dashboard = useDashboardStore();
const clearResults = () => {
  dashboard.deletePosts();
};

</script>