<template>
  <div class="flex flex-col justify-start items-start space-y-5 w-full h-full px-10 py-20">

    <p class="text-3xl font-extrabold">Welcome the Social Media Dashboard!</p>
    <nuxt-link to="/dashboard"
               class="flex justify-center items-center h-12 w-48 overflow-hidden rounded-2xl bg-blue-500 text-lg font-bold text-white">
      Go to dashboard
    </nuxt-link>
  </div>
</template>
<script setup>
import {useDashboardStore} from "~/stores/dashboard.js";

const dashboardStore = useDashboardStore();
</script>